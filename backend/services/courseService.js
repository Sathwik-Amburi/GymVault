const gymvaultDb = require("../database/database");
const CourseModel = require("../database/models/course");

// TODO: Add remaining service functions
class CourseService {
    getAllCourses = async () => {
        try {
            const courses = await CourseModel.find();
            return courses;
        } catch (error) {
            console.log("Error while fetching all courses in service", error.message);
        }
    };

    getCourse = async (courseId) => {
        try {
            const course = await CourseModel.findById(courseId);
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


    filterCourses = async (searchString, searchFields) => {

        let queryArray = [];
        searchFields.forEach((searchField) => {
            queryArray.push({ [searchField]: { "$regex": searchString, "$options": "i"  } })
        })

        try {
            const courses = await courseModel.find({ $or: queryArray })
            return courses
        } catch (error) {
            console.log("Error while filtering courses", error.message);
        }

    }
}

module.exports = new CourseService();
