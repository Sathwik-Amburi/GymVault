const express = require("express");
const router = express.Router();
const gymController = require("../../controllers/gymController");
const courseController = require("../../controllers/courseController");
const subscriptionController = require("../../controllers/subscriptionController");

router.get("/get-all-gyms", gymController.getAllGyms);
router.get("/cities/:type", gymController.getAllAvailableSearchCities);
router.post("/add-gym", gymController.addGym);
router.get("/filter", gymController.filterGyms);
router.post("/filter/price-ranges", gymController.filterGymsByPriceRanges);
router.post("/subscriptions/add-subscription", gymController.addSubscription);
router.get(
  "/subscriptions/get-subscriptions/:gymId",
  subscriptionController.getSubscriptionsByGymId
);
router.get("/get/:id", gymController.getGym);
router.get("/get/:id/courses", courseController.getCoursesByGymId);

module.exports = router;
