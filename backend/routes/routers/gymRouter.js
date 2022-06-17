const express = require("express");
const router = express.Router();
const gymController = require("../../controllers/gymController");

// TODO: Add remaining endpoints
router.get("/get-all-gyms", gymController.getAllGyms);
router.post("/add-gym", gymController.addGym);
router.get("/filter", gymController.filterGyms);
router.post("/filter/price-range", gymController.filterGymsByPriceRange);
router.post("/subscriptions/add-subscription", gymController.addSubscription);
router.get(
  "/subscriptions/get-subscriptions/:gymId",
  gymController.getSubscriptionsByGymId
);
router.get("/get/:id", gymController.getGym);

module.exports = router;
