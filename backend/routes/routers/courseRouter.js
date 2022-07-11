const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/courseController");

router.get("/get-all-courses", courseController.getAllCourses);
router.post("/add-course", courseController.addCourse);
router.get("/filter", courseController.filterCourses);
router.post("/filter/price-range", courseController.filterCoursesByPriceRange);
router.post("/filter/price-ranges", courseController.filterCoursesByPriceRanges);
router.get("/get/:id", courseController.getCourse);

module.exports = router;
