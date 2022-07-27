const userModel = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const googleAuth = async (req, res) => {
    const google_token = req.body.token.access_token
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${google_token}`)

        const payload = response.data

        if (!payload) {
            return res.status(400).json({ error: "Unauthenticated" });
        }

        const match = await userModel.findOne({ email: payload.email });

        if (match) {
            const token = jwt.sign(
                {
                    id: match.id,
                    email: match.email,
                    name: match.firstName + match.lastName,
                    role: match.role,
                    profilePicture: match.profilePicture
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION }
            );
            res.status(200).json({ message: "Logged in", token });
        }

        else {
            const user = new userModel({
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                password: bcrypt.hashSync(google_token, 10),
                role: "user",
                emailVerified: true,
            });

            const newUser = await user.save();

            const token = jwt.sign(
                { id: newUser.id, email: newUser.email, name: newUser.firstName + newUser.lastName, role: newUser.role, profilePicture: newUser.profilePicture },
                process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION }
            );

            return res.status(200).json({ message: "Logged in", token });
        }


    } catch (error) {
        console.log(error)
    }

}

module.exports = {googleAuth}