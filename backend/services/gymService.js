const gymModel = require("../database/models/gym");
const courseModel = require("../database/models/course");
const Subscription = require("../database/models/subscription");
const reviewModel = require("../database/models/review");

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
      const availableGymCities = await gymModel.distinct("city");
      return availableGymCities;
    } catch (error) {
      console.log(
        "Error while fetching all available gym cities in service",
        error.message
      );
    }
  };

  getAllAvailableCourseCities = async () => {
    try {
      const rawIds = await courseModel.find({}).select({ gymId: 1, _id: 0 });
      const allCourseGymIds = rawIds.map((item) => {
        return item.gymId.toString();
      });
      const availableCourseCities = await gymModel
        .find()
        .where("_id")
        .in(allCourseGymIds)
        .distinct("city");

      return availableCourseCities;
    } catch (error) {
      console.log(
        "Error while fetching all available course cities in service",
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
      const allRatings = await reviewModel.aggregate([
        { $unwind: "$gymId" },
        {
          $group: {
            _id: "$gymId",
            rating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
      ]);

      const gyms = await gymModel.find({
        name: { $regex: String(name), $options: "i" },
        city: city,
      });

      const gymsWithRatings = gyms.map((item1) => {
        return {
          ...item1._doc,
          rating: allRatings
            .filter((item2) => {
              return item1._doc._id.toString() == item2._id.toString();
            })
            .map((item3) => {
              return { rating: item3.rating, ratedBy: item3.count };
            }),
        };
      });

      return gymsWithRatings.sort(
        (a, b) =>
          (b.rating.length !== 0 ? b.rating[0].rating : -Infinity) -
          (a.rating.length !== 0 ? a.rating[0].rating : -Infinity)
      );
    } catch (error) {
      console.log("Error while filtering gyms", error.message);
    }
  };

  filterGymsBySelectedFilters = async (filterResults, city) => {
    try {
      const { priceRangeFilters, amenitiesFilters } = filterResults;

      const allRatings = await reviewModel.aggregate([
        { $unwind: "$gymId" },
        {
          $group: {
            _id: "$gymId",
            rating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
      ]);

      const filters = priceRangeFilters.map((item) => {
        return {
          $elemMatch: {
            subscriptionType: item.type,
            subscriptionPrice: {
              $gte: item.minPrice,
              $lte: item.maxPrice,
            },
          },
        };
      });

      var newFilters = {
        subscriptionOffers: {
          $all: filters,
        },
        city: city,
        amenities: { $all: amenitiesFilters },
      };

      if (filters.length === 0) {
        delete newFilters.subscriptionOffers;
      }
      if (amenitiesFilters.length === 0) {
        delete newFilters.amenities;
      }

      const gyms = await gymModel.find(newFilters);

      const gymsWithRatings = gyms.map((item1) => {
        return {
          ...item1._doc,
          rating: allRatings
            .filter((item2) => {
              return item1._doc._id.toString() == item2._id.toString();
            })
            .map((item3) => {
              return { rating: item3.rating, ratedBy: item3.count };
            }),
        };
      });

      return {
        gyms: gymsWithRatings.sort(
          (a, b) =>
            (b.rating.length !== 0 ? b.rating[0].rating : -Infinity) -
            (a.rating.length !== 0 ? a.rating[0].rating : -Infinity)
        ),
      };
    } catch (error) {
      console.log("Error while filtering gyms", error.message);
    }
  };

  getAllGymAmenitiesByCity = async (name, city) => {
    const amenities = await gymModel.find(
      { city, name: { $regex: String(name), $options: "i" } },
      { amenities: 1, _id: 0 }
    );
    const allAmenities = amenities
      .map((item) => {
        return item.amenities;
      })
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i);

    return allAmenities;
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
