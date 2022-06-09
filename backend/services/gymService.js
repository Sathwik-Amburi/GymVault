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

  getGym = async (gymId) => {
    try {
      const gym = await gymModel.findById(gymId);
      return gym;
    } catch (error) {
      console.log("Error while fetching gym", error.message);
    }
  };

  addGym = async (gym) => {
    try {
      await gym.save();
    } catch (error) {
      console.log("Error while adding gym service", error.message);
    }
  };


  filterGyms = async (searchString, searchFields) => {

    let queryArray = [];
    searchFields.forEach((searchField) => {
      queryArray.push({ [searchField]: { "$regex": searchString, "$options": "i"  } })
    })

    try {
      const gyms = await gymModel.find({ $or: queryArray })
      return gyms
    } catch (error) {
      console.log("Error while filtering gyms", error.message);
    }

  }
}

module.exports = new GymService();
