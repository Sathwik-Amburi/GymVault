const subscriptionModel = require("../database/models/subscription");

class SubscriptionService {
    getSubscriptionsByUserId = async (userId) => {
        try {
            const subscriptions = await subscriptionModel.find({ userId: userId });
            return subscriptions;
        } catch (error) {
            console.log("Error while fetching subscriptions", error.message);
        }
    }
    getSubscriptionById = async (subscriptionId) => {
        try {
            const subscription = await subscriptionModel.findById(subscriptionId);
            return subscription;
        } catch (error) {
            console.log("Error while fetching subscription", error.message);
        }
    }
    addSubscription = async (subscription) => {
        try {
            await subscription.save();
        } catch (error) {
            console.log("Error while adding subscription", error.message);
        }
    }
}

module.exports = new SubscriptionService();