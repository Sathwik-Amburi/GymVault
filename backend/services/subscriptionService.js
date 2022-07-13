const subscriptionModel = require("../database/models/subscription");
const courseService = require("./courseService");
const gymService = require("./gymService");
const ObjectId = require('mongoose').Types.ObjectId; 

class SubscriptionService {
    getSubscriptionsByUserId = async (userId) => {
        try {
            
            const subscriptions = await subscriptionModel.find({ userId: ObjectId(userId) }).sort({ purchaseDate: -1 });
            let res = await Promise.all(subscriptions.map(async (subscription) => {
                const gym = await gymService.getGym(subscription.gymId);
                if (subscription.courseId) {
                    // TODO - what if the course is deleted?
                    const course = await courseService.getCourse(subscription.courseId);
                    return {
                        ...subscription.toJSON(),
                        course: course,
                        gym: gym,
                    };
                } else {
                    return {
                        ...subscription.toJSON(),
                        gym: gym,
                    };
                }
            }));
            return res;
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
    getSubscriptionsByGymId = async (gymId) => {
        try {
            const subscriptions = await subscriptionModel.find({ gymId: gymId, userId: null });
            return subscriptions;
        } catch (error) {
            console.log("Error while fetching subscriptions", error.message);
        }
    }
    addSubscription = async (subscription) => {
        try {
            await subscription.save();
        } catch (error) {
            console.log("Error while adding subscription", error.message);
        }
    }
    checkOrPurchase = async (uid, courseOrGymId, stripeToken) => {
        function randomString() {
            const len = 10;
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < len; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
        // TODO!!! check validity of purchase via Stripe??
        if(true) {
            // Check if it is a course or gym ID 
            let entity = null;
            try {
                entity = await courseService.getCourse(courseOrGymId);
                if(entity != null) {
                    // ok
                } else {
                    entity = await gymService.getGym(courseOrGymId);
                    if(entity != null) {
                        // still ok
                    } else {
                        console.log("Neither gym nor course!");
                    }
                }
            } catch (error) {
                console.log("Error while checking purchase: ", error);
            }
            
            if(entity != null && uid != null) {
                let type = "DAY_PASS"; // TODO infer from request, entity
                let purchaseDate = new Date();
                let expirationDate = new Date();
                expirationDate.setDate(purchaseDate.getDate() + 1);
                const offset = 
                    (type == "DAY_PASS")   ? 1 :
                    (type == "MONTH_PASS") ? 30 :
                    (type == "YEAR_PASS")  ? 365 :
                    0; // TODO: not 0 but course duration
                const subscription = new subscriptionModel({
                    gymId: ("gymId" in entity) ? entity.gymId : entity._id,
                    courseId: ("gymId" in entity) ? entity._id : null,
                    name: entity.name,
                    type: type,
                    price: 1234,
                    optionals: [],
                    purchaseDate: purchaseDate,
                    expireDate: expirationDate,
                    ticketSecret: randomString(),
                    courseId: (typeof entity === "Course") ? courseOrGymId : null,
                    userId: uid


                });
                await subscription.save();
                return subscription;
            }
        }
        return null;
    }
}

module.exports = new SubscriptionService();