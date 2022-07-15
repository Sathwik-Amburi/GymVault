const courseModel = require("../database/models/course");
const ObjectId = require("mongoose").Types.ObjectId;
const reviewModel = require("../database/models/review");

class CourseService {
  getAllCourses = async () => {
    try {
      const courses = await courseModel.find();
      return courses;
    } catch (error) {
      console.log("Error while fetching all courses in service", error.message);
    }
  };

  getCourse = async (courseId) => {
    try {
      const course = await courseModel.findById(courseId);
      return course;
    } catch (error) {
      console.log("Error while fetching course", error.message);
    }
  };

  getCoursesByGymId = async (gymId) => {
    try {
      const courses = await courseModel.find({ gymId: ObjectId(gymId) });
      return courses;
    } catch (error) {
      console.log("Error while fetching courses by gymId", error.message);
    }
  };

  addCourse = async (course) => {
    try {
      await course.save();
    } catch (error) {
      console.log("Error while adding course service", error.message);
    }
  };

  filterCourses = async (name, city) => {
    try {
      const allRatings = await reviewModel.aggregate([
        { $match: { courseId: { $ne: null, $exists: true } } },
        { $unwind: "$courseId" },
        {
          $group: {
            _id: "$courseId",
            rating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
      ]);

      let courses = await courseModel
        .find({ name: { $regex: String(name), $options: "i" } })
        .populate({ path: "gymId" });

      const matchingCourses = courses.filter((course) => {
        return course.gymId.city == city;
      });

      const coursesWithRatings = matchingCourses.map((item1) => {
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

      return coursesWithRatings.sort(
        (a, b) =>
          (b.rating.length !== 0 ? b.rating[0].rating : -Infinity) -
          (a.rating.length !== 0 ? a.rating[0].rating : -Infinity)
      );
    } catch (error) {
      console.log("Error while filtering courses", error.message);
    }
  };

  filterCoursesByPriceRanges = async (priceRanges, city, name) => {
    try {
      const allRatings = await reviewModel.aggregate([
        { $match: { courseId: { $ne: null, $exists: true } } },
        { $unwind: "$courseId" },
        {
          $group: {
            _id: "$courseId",
            rating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
      ]);

      const filters = priceRanges.map((item) => {
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

      if (filters.length > 0) {
        const onlyCourses = await courseModel
          .find({
            subscriptionOffers: {
              $all: filters,
            },
          })
          .populate({ path: "gymId" });

        const courses = onlyCourses.filter((course) => {
          return course.gymId.city == city;
        });

        const coursesWithRatings = courses.map((item1) => {
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
          courses: coursesWithRatings.sort(
            (a, b) =>
              (b.rating.length !== 0 ? b.rating[0].rating : -Infinity) -
              (a.rating.length !== 0 ? a.rating[0].rating : -Infinity)
          ),
        };
      } else {
        const onlyCourses = await courseModel
          .find({})
          .populate({ path: "gymId" });

        const courses = onlyCourses.filter((course) => {
          return course.gymId.city == city;
        });

        const coursesWithRatings = courses.map((item1) => {
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
          courses: coursesWithRatings.sort(
            (a, b) =>
              (b.rating.length !== 0 ? b.rating[0].rating : -Infinity) -
              (a.rating.length !== 0 ? a.rating[0].rating : -Infinity)
          ),
        };
      }
    } catch (error) {
      console.log("Error while filtering courses", error.message);
    }
  };
}

module.exports = new CourseService();
