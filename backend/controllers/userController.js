const userService = require("../services/userService");
const s3Service = require("../aws/s3Service");

const getProfile = async (req, res) => {
  const { email } = req.user;
  const profileDetails = await userService.getProfile(email);
  if (profileDetails.error) {
    return res.status(404).json({ error: profileDetails.error });
  }
  res.status(200).json(profileDetails);
};


const retrievePutSignedURL = (req, res) => {
    const url = s3Service.retrievePutSignedURL(req.params.key, req.body.type)
    res.json({ url })
}



module.exports = { getProfile, retrievePutSignedURL };
