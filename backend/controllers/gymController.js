const gymService = require("../services/gymService");
const gymModel = require("../database/models/gym");

const getAllGyms = async (req, res) => {
  try {
    const gyms = await gymService.getAllGyms();

    res.status(200).json(gyms);
  } catch (error) {
    console.log(`Error while fetching all gyms`, error.message);
    res.status(400).json({ error: "Error while fetching all gyms" });
  }
};

const addGym = async (req, res) => {
  try {
    const gym = new gymModel(req.body);
    gymService.addGym(gym);

    res.status(200).json({ message: "Gym added successfully", response: gym });
  } catch (error) {
    console.log(`Error while adding gym`, error.message);
    res.status(400).json({ error: "Error while adding gym" });
  }
};

const filterGym = (req, res) => {
  
}

module.exports = { getAllGyms, addGym };
