const express = require("express");
const router = express.Router();
const gymController = require("../../controllers/courseController");

// TODO: Add remaining endpoints
router.get("/get-all-gyms", gymController.getAllCourses);
router.post("/add-gym", gymController.addCourse);
router.get("/filter", gymController.filterCourses);
router.get("/get/:id", gymController.getCourse);

module.exports = router;
