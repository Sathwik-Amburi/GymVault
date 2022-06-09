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

const getGym = async (req, res) => {
  console.log(req.params.id)
  const { id } = req.params;
  const gym = await gymService.getGym(id)
  if (gym) {
    res.status(200).json({ message: `Gym found`, response: gym })
  }
  res.status(404).json({ message: `Gym not found`})
}

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

const filterGyms = async (req, res) => {
  const { search } = req.query
  const gyms = await gymService.filterGyms(search, ["name", "city"])
  if (gyms.length > 0) {
    res.status(200).json({ message: `${gyms.length} results found`, response: gyms })
  } else {
    res.status(404).json({ message: `No results found`})
  }
}

module.exports = { getAllGyms, getGym, addGym, filterGyms };
