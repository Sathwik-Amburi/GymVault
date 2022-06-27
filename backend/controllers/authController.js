const authService = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser(email, password);

  if (result.error) {
    return res.status(403).send({ error: result.error });
  }

  res.status(200).json(result);
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

const verifyEmail = async (req, res) => {
  const { userId, uniqueString } = req.params;

  const checkVerifiedUser = await authService.verifyEmail(userId, uniqueString);

  if (checkVerifiedUser.error) {
    return res.status(403).json({ error: checkVerifiedUser.error });
  }

  res.redirect("http://localhost:3000/user/email-verified");
};

module.exports = { login, registerUser, verifyEmail };
