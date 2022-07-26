const express = require("express");
const router = express.Router();
const gymController = require("../../controllers/gymController");
const courseController = require("../../controllers/courseController");
const subscriptionController = require("../../controllers/subscriptionController");
const { validateJwtToken } = require("../../middleware/jwtAuth");


router.get("/get-all-gyms", gymController.getAllGyms);
router.get("/cities/:type", gymController.getAllAvailableSearchCities);
router.post("/add-gym", validateJwtToken, gymController.addGym);
router.get("/filter", gymController.filterGyms);
router.post("/filter/selected-ranges", gymController.filterGymsBySelectedFilters);
router.post("/subscriptions/add-subscription", gymController.addSubscription);
router.get("/amenities", gymController.getAllGymAmenitiesByCity);
router.get(
  "/subscriptions/get-subscriptions/:gymId",
  subscriptionController.getSubscriptionsByGymId
);
router.get("/get/:id", gymController.getGym);
router.get("/get/:id/courses", courseController.getCoursesByGymId);
router.get("/get-gym-by-owner", validateJwtToken, gymController.gymByOwnerId)

router.patch("/edit-subscriptions-discounts", validateJwtToken, gymController.editGymSubscriptionPrice)
router.get("/add-permission", validateJwtToken, gymController.gymFormPermission)

module.exports = router;
