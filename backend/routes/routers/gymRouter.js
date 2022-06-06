const express = require("express");
const router = express.Router();
const gymController = require("../../controllers/gymController");

// TODO: Add remaining endpoints
router.get("/get-all-gyms", gymController.getAllGyms);
router.post("/add-gym", gymController.addGym);

module.exports = router;
