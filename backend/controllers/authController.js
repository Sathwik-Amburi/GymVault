const userModel = require("../database/models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { email, password } = req.body
    const match = await userModel.findOne({ email }) 
    if (match) {
        if (await bcrypt.compare(password, match.password)) {
            const token = jwt.sign({ id: match.id, email: match.email, name: match.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            res.status(200).json({ message:"Logged in", token });
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    }
    else {
        res.status(400).json({ error: "Account does not exist" });
    }
}

module.exports = {login};