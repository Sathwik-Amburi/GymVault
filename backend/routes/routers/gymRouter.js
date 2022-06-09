const express = require("express");
const router = express.Router();
const gymController = require("../../controllers/gymController");

// TODO: Add remaining endpoints
router.get("/get-all-gyms", gymController.getAllGyms);
router.post("/add-gym", gymController.addGym);
router.get("/filter", gymController.filterGyms);
router.get("/get/:id", gymController.getGym);

module.exports = router;
