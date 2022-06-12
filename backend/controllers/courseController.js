const courseService = require("../services/courseService");
const courseModel = require("../database/models/course");

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();

        res.status(200).json(courses);
    } catch (error) {
        console.log(`Error while fetching all courses`, error.message);
        res.status(400).json({ error: "Error while fetching all courses" });
    }
};

const getCourse = async (req, res) => {
    console.log(req.params.id)
    const { id } = req.params;
    const course = await courseService.getCourse(id)
    if (course) {
        res.status(200).json({ message: `Course found`, response: course })
    } else {
        res.status(404).json({ message: `Course not found`})
    }
}

const addCourse = async (req, res) => {
    try {
        const course = new courseModel(req.body);
        courseService.addCourse(course);

        res.status(200).json({ message: "Course added successfully", response: course });
    } catch (error) {
        console.log(`Error while adding course`, error.message);
        res.status(400).json({ error: "Error while adding course" });
    }
};

const filterCourses = async (req, res) => {
    const { search } = req.query
    const courses = await courseService.filterCourses(search, ["name", "city"])
    if (courses.length > 0) {
        res.status(200).json({ message: `${courses.length} results found`, response: courses })
    } else {
        res.status(404).json({ message: `No results found`})
    }
}

module.exports = { getAllCourses, getCourse, addCourse, filterCourses };
