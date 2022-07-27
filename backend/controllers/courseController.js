const courseService = require("../services/courseService");
const courseModel = require("../database/models/course");

const getAllCourses = async (req, res) => {
  //this controller function uses the course service to fetch all the courses
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    console.log(`Error while fetching all courses`, error.message);
    res.status(400).json({ error: "Error while fetching all courses" });
  }
};

const getCourse = async (req, res) => {
  //this controller function uses the course service to get a course by its ID
  const { id } = req.params;
  const course = await courseService.getCourse(id);
  if (course) {
    res.status(200).json({ message: `Course found`, response: course });
  } else {
    res.status(404).json({ message: `Course not found` });
  }
};

const getCoursesByGymId = async (req, res) => {
  //this controller function uses the course service to fetch courses with the same gym id
  const { id } = req.params;
  const courses = await courseService.getCoursesByGymId(id);
  if (courses) {
    res.status(200).json({ message: `Courses found`, response: courses });
  } else {
    res.status(404).json({ message: `Courses not found` });
  }
};

const addCourse = async (req, res) => {
  //this controller function uses the course service to add a course to a database
  try {
    const course = new courseModel(req.body);
    courseService.addCourse(course);

    res
      .status(200)
      .json({ message: "Course added successfully", response: course });
  } catch (error) {
    console.log(`Error while adding course`, error.message);
    res.status(400).json({ error: "Error while adding course" });
  }
};

const filterCourses = async (req, res) => {
  const { name, city } = req.query;

  if (!city || city == null || city == undefined) {
    return res
      .status(400)
      .json({ message: "search failed", errors: ["Please choose a city"] });
  }

  const courses = await courseService.filterCourses(name, city);

  if (courses.length > 0) {
    res
      .status(200)
      .json({ message: `${courses.length} results found`, response: courses });
  } else {
    res.status(404).json({ message: `No results found` });
  }
};

const filterCoursesByPriceRanges = async (req, res) => {
  const { priceRanges, city, name } = req.body;

  const results = await courseService.filterCoursesByPriceRanges(
    priceRanges,
    city,
    name
  );

  if (results.courses.length > 0) {
    res.status(200).json({
      message: `${results.courses.length} results found`,
      response: results,
    });
  } else {
    res.status(200).json({ message: `No results found` });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  getCoursesByGymId,
  addCourse,
  filterCourses,
  filterCoursesByPriceRanges,
};
