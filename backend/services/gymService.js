const gymvaultDb = require("../database/database");
const gymModel = require("../database/models/gym");

// TODO: Add remaining service functions
class GymService {
  getAllGyms = async () => {
    try {
      const gyms = await gymModel.find();
      return gyms;
    } catch (error) {
      console.log("Error while fetching all gyms in service", error.message);
    }
  };

  addGym = async (gym) => {
    try {
      await gym.save();
    } catch (error) {
      console.log("Error while adding gym service", error.message);
    }
  };
}

module.exports = new GymService();
