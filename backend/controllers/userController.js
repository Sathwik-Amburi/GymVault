const userService = require("../services/userService");

const getProfile = async (req, res) => {
  const { email } = req.user;

  const profileDetails = await userService.getProfile(email);

  if (profileDetails.error) {
    return res.status(404).json({ error: profileDetails.error });
  }
  res.status(200).json(profileDetails);
};

module.exports = { getProfile };
