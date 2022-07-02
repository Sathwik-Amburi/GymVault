const subscriptionService = require('../services/subscriptionService');

const getSubscriptionById = async (req, res) => {
    const { id } = req.params;
    const subscription = await subscriptionService.getSubscriptionById(id);
    if (subscription) {
        res.status(200).json({ message: `Subscription found`, response: subscription });
    } else {
        res.status(404).json({ message: `Subscription not found` });
    }
}

const getSubscriptionsByUserId = async (req, res) => {
    const { id } = req.params;
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(id);
    if (subscriptions) {
        res.status(200).json({ message: `Subscriptions found`, response: subscriptions });
    } else {
        res.status(404).json({ message: `Subscriptions not found` });
    }
}


const getSubscriptionsByGymId = async (req, res) => {
    const { gymId } = req.params;
    const subscriptions = await subscriptionService.getSubscriptionsByGymId(gymId);
    if (subscriptions) {
      res
        .status(200)
        .json({ message: `Subscriptions found`, response: subscriptions });
    } else {
      res.status(404).json({ message: `Subscriptions` });
    }
  };

module.exports = { getSubscriptionById, getSubscriptionsByUserId, getSubscriptionsByGymId };