const subscriptionService = require('../services/subscriptionService');
const subscriptionModel = require("../database/models/subscription");
const gymModel = require("../database/models/gym");


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
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(req.user.id);
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

const checkOrPurchase = async (req, res) => {
    res.status(404).json({ message: `Deprecated` });
    // const { courseOrGymId, stripeToken } = req.params;
    // const subscription = await subscriptionService.checkOrPurchase(req.user.id, courseOrGymId, stripeToken);
    // if (subscription) {
    //     res.status(200)
    //        .json({ message: `Subscription purchased`, response: subscription });
    // } else {
    //     res.status(404).json({ message: `Subscription not purchased` });
    // }
}

const countActiveSubscriptions = async (req, res) => {
    const owner_id = req.user.id
    console.log(owner_id)
    if (req.user.role !== 'gym_owner') {
        return res.status(400).json({ message: "unauthorized" })
    }
    const gym = await gymModel.findOne({ userId: owner_id})
    console.log(gym)
    if (!gym) {
        return res.status(400).json({ message: 'no gym created' })
    }

    const countActiveSubscriptions = await subscriptionModel.countDocuments({ 
        gymId: gym._id,
        expireDate: { $gte: new Date() },
    })

    res.json({countActiveSubscriptions})
}


module.exports = { getSubscriptionById, getSubscriptionsByUserId, getSubscriptionsByGymId, checkOrPurchase, countActiveSubscriptions };