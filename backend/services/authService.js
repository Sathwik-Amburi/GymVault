const userModel = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    // sendVerificationEmail(newUser.rows[0].user_id, newUser.rows[0].email);

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
}

module.exports = new authService();
