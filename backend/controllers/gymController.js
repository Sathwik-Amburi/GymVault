const gymService = require("../services/gymService");
const gymModel = require("../database/models/gym");
const courseModel = require("../database/models/course");


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
  if (req.user.role !== "gym_owner") {
    return res.status(403).json({ message: 'forbidden' })
  }
  const gym = await gymModel.findOne({userId: req.user.id})
  res.json({ gym })
}

const editGymSubscriptionPrice = async (req, res) => {
  if (req.user.role !== "gym_owner") {
    return res.status(403).json({ message: 'forbidden' })
  }
  if (!req.body.subscriptionOffers || req.body.subscriptionOffers === undefined) {
    return res.status(400).json({ message: 'invalid request' })
  }
  const gym = await gymModel.findOneAndUpdate({ userId: req.user.id }, { subscriptionOffers: req.body.subscriptionOffers }, { new: true })
  res.json({ gym })
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

  let { gym, gymcourses, gymoptions, gymlocation } = req.body

  // create gym
  let { address, city, description, name, phone, website,
    amenities, gymImages,
    dayPassSelected, dayPassPrice,
    gymMonthlySubscriptionSelected, gymMonthlySubscriptionPrice,
    gymYearlySubscriptionSelected, gymYearlySubscriptionPrice,
  } = gym

  let subscriptionOffers = []
  dayPassSelected && dayPassPrice > 0 ?
    subscriptionOffers.push({ subscriptionType: 'DAY_PASS', subscriptionPrice: dayPassPrice }) : ''

  gymMonthlySubscriptionSelected && gymMonthlySubscriptionPrice > 0 ?
    subscriptionOffers.push({ subscriptionType: 'MONTHLY_PASS', subscriptionPrice: gymMonthlySubscriptionPrice }) : ''

  gymYearlySubscriptionSelected && gymYearlySubscriptionPrice > 0 ?
    subscriptionOffers.push({ subscriptionType: 'YEARLY_PASS', subscriptionPrice: gymYearlySubscriptionPrice }) : ''


  const newGym = new gymModel({
    name,
    email: req.user.email,
    city,
    phoneNumber: phone,
    address,
    description,
    amenities: amenities.split('\n'),
    websiteURL: website,
    subscriptionOffers,
    optionals: gymoptions ? gymoptions : [],
    images: gymImages.split('\n'),
    coordinates: gymlocation,
    userId: req.user.id
  });
  await newGym.save()

  // create courses
  if (gymcourses.length > 0) {
    gymcourses.forEach(async (course) => {
      let description = course.description
      let name = course.name
      let subscriptionOffers = course.subscriptionOffers.filter((s) => s.subscriptionPrice > 0)
      let sessions = course.sessions.filter((session) => session.sessionDetails.length > 0)
      let images = course.images.split('\n')
      let gymId = newGym._id
      const newCourse = new courseModel({ name, description, images, subscriptionOffers, sessions, gymId, userId: req.user.id })
      await newCourse.save()
    })
  }

  res.status(201).send("success")

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
