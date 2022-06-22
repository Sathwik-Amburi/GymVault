const userModel = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const match = await userModel.findOne({ email });
  if (match) {
    if (await bcrypt.compare(password, match.password)) {
      const token = jwt.sign(
        {
          id: match.id,
          email: match.email,
          name: match.name,
          role: match.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );
      res.status(200).json({ message: "Logged in", token });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } else {
    res.status(400).json({ error: "Account does not exist" });
  }
};

const registerUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  const user = await authService.registerUser(
    firstName,
    lastName,
    phoneNumber,
    email,
    password
  );

  if (user.error) {
    return res.status(403).json({ error: user.error });
  }
  res.status(201).json(user);
};

module.exports = { login, registerUser };
