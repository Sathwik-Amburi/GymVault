const userModel = require("../database/models/user");
const userVerificationModel = require("../database/models/userVerification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const dev_url = "http://localhost:8000/api";

class authService {
  registerUser = async (firstName, lastName, phoneNumber, email, password) => {
    const checkExistingEmail = await userModel.findOne({ email });

    if (checkExistingEmail) {
      return {
        error: { type: "DUPLICATE_EMAIL", message: "Email already in use." },
      };
    }

    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);

    const user = new userModel({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      phoneNumber,
      role: "user",
    });

    const newUser = await user.save();

    // sendVerificationEmail(newUser._id, newUser.email);

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    return { token, user: newUser.firstName };
  };

  verifyEmail = async (user_id, uniqueString) => {
    const checkUserVerification = await userVerificationModel.findOne({
      userId: user_id,
    });

    if (checkUserVerification) {
      const { expiresOn } = checkUserVerification;
      const hashedUniqueString = checkUserVerification.unique_string;

      if (new Date(expiresOn) < new Date()) {
        await userVerificationModel
          .deleteOne({ userId: user_id })
          .then(await userModel.deleteOne({ _id: user_id }));
        return {
          error: {
            type: "LINK_EXPIRED",
            message: "The verification link has expired. Please try again.",
          },
        };
      } else {
        const validateUniqueString = bcrypt.compareSync(
          uniqueString,
          hashedUniqueString
        );

        if (validateUniqueString) {
          await userModel
            .findByIdAndUpdate({ _id: user_id }, { emailVerified: true })
            .then(await userVerificationModel.deleteOne({ userId: user_id }));
          return { verified: true };
        } else {
          return {
            error: {
              type: "WRONG_UNIQUE_STRING",
              message: "Invalid verification details passed. Check your inbox",
            },
          };
        }
      }
    } else {
      return {
        error: {
          type: "ALREADY_VERIFIED",
          message:
            "Record doesn't exist or has already been verified. please login or signup.",
        },
      };
    }
  };
}

const sendVerificationEmail = async (user_id, email) => {
  const uniqueString = uuidv4() + user_id;

  var sesMailOptions = {
    Source: "noreply@gymvault.com",
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: {
        Data: "GymVault- Please verify you email address",
      },
      Body: {
        Html: {
          Data: `<p>Please verify your email to confirm your signup to GymVault by clicking the following link
          </p><p><b>This link expires in 6 hours</b>.</p><p>
         <a href=${
           dev_url +
           "/authentication/verifyEmail/" +
           user_id +
           "/" +
           uniqueString
         }>${
            dev_url +
            "/authentication/verifyEmail/" +
            user_id +
            "/" +
            uniqueString
          }</a></p>`,
        },
      },
    },
  };
  const saltRounds = 10;
  const encryptedUniqueString = bcrypt.hashSync(uniqueString, saltRounds);
  await userVerificationModel
    .save({
      userId: user_id,
      uniqueString: encryptedUniqueString,
      expiresOn: moment(Date.now() + 21600000).format(),
    })
    .then
    //send the verification email
    ();
};

module.exports = new authService();