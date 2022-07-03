const gymModel = require("../database/models/gym");
const Subscription = require("../database/models/subscription");

class GymService {
  getAllGyms = async () => {
    try {
      const gyms = await gymModel.find();
      return gyms;
    } catch (error) {
      console.log("Error while fetching all gyms in service", error.message);
    }
  };

  getAllAvailableGymCities = async () => {
    try {
      const availableCities = await gymModel.distinct("city");
      return availableCities;
    } catch (error) {
      console.log(
        "Error while fetching all available cities in service",
        error.message
      );
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

  filterGyms = async (name, city) => {
    try {
      const gyms = await gymModel.find({
        name: { $regex: String(name), $options: "i" },
        city: city,
      });
      return gyms;
    } catch (error) {
      console.log("Error while filtering gyms", error.message);
    }
  };

  filterGymsByPriceRange = async (priceRange) => {
    try {
      const subscriptions = await Subscription.find({
        price: { $gte: priceRange[0], $lte: priceRange[1] },
      });

      const gyms = await gymModel.find({
        _id: {
          $in: subscriptions.map((item) => {
            return item.gymId;
          }),
        },
      });
      return { gyms, subscriptions };
    } catch (error) {
      console.log("Error while filtering gyms", error.message);
    }
  };

  addSubscription = async (subscriptionBody) => {
    try {
      const subscription = new Subscription(subscriptionBody);
      await subscription.save();
    } catch (error) {
      console.log("Error while adding subscription", error.message);
    }
  };

  getSubscriptionsByGymId = async (gymId) => {
    try {
      const subscriptions = await Subscription.find({ gymId });
      return subscriptions;
    } catch (error) {
      console.log("Error while subscriptions by gymId", error.message);
    }
  };
}

module.exports = new GymService();
