const courseModel = require("../database/models/course");

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
}

module.exports = new CourseService();
