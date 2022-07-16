const userModel = require("../database/models/user");

class UserService {
  getProfile = async (email) => {
    const user = await userModel.findOne({ email });
    if (!user) {
      return {
        error: {
          type: "PROFILE_NOT_FOUND",
          message: "There is no profile for this email",
        },
      };
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      payouts_enabled: user.payouts_enabled,
      profilePicture: user.profilePicture
    };
  };


  setProfile = async (user_id, key) => {
    await userModel.findByIdAndUpdate(user_id, {profilePicture: key})
  }
  
}



module.exports = new UserService();
