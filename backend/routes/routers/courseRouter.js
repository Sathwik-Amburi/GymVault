const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/courseController");

router.get("/get-all-courses", courseController.getAllCourses);// use this route to get all the courses
router.post("/add-course", courseController.addCourse);//use this route to add a course to the database
router.get("/filter", courseController.filterCourses);
router.post("/filter/price-ranges", courseController.filterCoursesByPriceRanges);
router.get("/get/:id", courseController.getCourse);//use this route to get a course by its Id.

module.exports = router;
