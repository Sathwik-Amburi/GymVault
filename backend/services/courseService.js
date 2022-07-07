const courseModel = require("../database/models/course");
const ObjectId = require("mongoose").Types.ObjectId;

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
      let courses = await courseModel
        .find({ name: { $regex: String(name), $options: "i" } })
        .populate({ path: "gymId" });

      const matchingCourses = courses.filter((course) => {
        return course.gymId.city == city;
      });
      return matchingCourses;
    } catch (error) {
      console.log("Error while filtering courses", error.message);
    }
  };

  filterCoursesByPriceRange = async (priceRange, city) => {
    try {
      const courses = await courseModel.find({
        subscriptionOffers: {
          $elemMatch: {
            subscriptionType: "MONTHLY_PASS",
            subscriptionPrice: {
              $gte: priceRange[0],
              $lte: priceRange[1],
            },
          },
        },
        city: city,
      });

      return { courses };
    } catch (error) {
      console.log(
        "Error while filtering courses by price range",
        error.message
      );
    }
  };
}

module.exports = new CourseService();
