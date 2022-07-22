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

const gymByOwnerId = async (req, res) => {
  if(req.user.role!=="gym_owner"){
    return res.status(403).json({message: 'forbidden'})
  } 
  // temporary get Progym in Hamburg
  const gym = await gymModel.findById('62c572f1dc7d322846a2a9b2')
  res.json({gym})
}

const editGymSubscriptionPrice = async (req, res) => {
  if(req.user.role!=="gym_owner"){
    return res.status(403).json({message: 'forbidden'})
  }
  if(!req.body.subscriptionOffers || req.body.subscriptionOffers === undefined){
    return res.status(400).json({message: 'invalid request'})
  }
  // temporary get Progym in Hamburg
  const gym = await gymModel.findByIdAndUpdate('62c572f1dc7d322846a2a9b2', {subscriptionOffers: req.body.subscriptionOffers}, {new: true})
  res.json({gym})
}

const getAllAvailableSearchCities = async (req, res) => {
  try {
    const { type } = req.params;
    let availablesCities = [];
    if (type === "gyms") {
      availableCities = await gymService.getAllAvailableGymCities();
    } else {
      availableCities = await gymService.getAllAvailableCourseCities();
    }

    res.status(200).json(availableCities);
  } catch (error) {
    console.log(`Error while fetching all available cities`, error.message);
    res
      .status(400)
      .json({ error: "Error while fetching all available cities" });
  }
};

const getGym = async (req, res) => {
  const { id } = req.params;
  const gym = await gymService.getGym(id);
  if (gym) {
    res.status(200).json({ message: `Gym found`, response: gym });
  } else {
    res.status(404).json({ message: `Gym not found` });
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

const filterGyms = async (req, res) => {
  const { name, city } = req.query;

  if (!city || city == null || city == undefined) {
    return res
      .status(400)
      .json({ message: "search failed", errors: ["Please choose a city"] });
  }

  const gyms = await gymService.filterGyms(name, city);

  if (gyms.length > 0) {
    res
      .status(200)
      .json({ message: `${gyms.length} results found`, response: gyms });
  } else {
    res.status(404).json({ message: `No results found` });
  }
};

const filterGymsBySelectedFilters = async (req, res) => {
  const { filters, city } = req.body;

  const results = await gymService.filterGymsBySelectedFilters(filters, city);

  if (results.gyms.length > 0) {
    res.status(200).json({
      message: `${results.gyms.length} results found`,
      response: results,
    });
  } else {
    res.status(200).json({ message: `No results found` });
  }
};

const getAllGymAmenitiesByCity = async (req, res) => {
  const { name, city } = req.query;

  if (!city || city == null || city == undefined) {
    return res
      .status(400)
      .json({ message: "search failed", errors: ["Please choose a city"] });
  }

  const amenities = await gymService.getAllGymAmenitiesByCity(name, city);

  if (amenities.length > 0) {
    res.status(200).json({
      message: `${amenities.length} results found`,
      amenities: amenities,
    });
  } else {
    res.status(200).json({ message: `No amenities found` });
  }
};

const addSubscription = async (req, res) => {
  const { gymId } = req.body;
  try {
    await gymService.addSubscription(req.body);

    res
      .status(200)
      .json({ message: `Subscription added successfully to gym ${gymId}` });
  } catch (err) {
    console.log(
      `Error while adding subscription to gym ${gymId}`,
      error.message
    );
    res
      .status(400)
      .json({ error: `Error while adding subscription to gym ${gymId}` });
  }
};

module.exports = {
  getAllGyms,
  getAllAvailableSearchCities,
  getGym,
  addGym,
  filterGyms,
  filterGymsBySelectedFilters,
  getAllGymAmenitiesByCity,
  addSubscription,
  gymByOwnerId,
  editGymSubscriptionPrice
};
