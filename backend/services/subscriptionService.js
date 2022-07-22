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

    generateSubscriptionData = async (uid, courseOrGymId, baseType, startDateString, basePrice, rawOptionals) => {
        let price = 0;
        let optionals = rawOptionals.map(optional => {
            return {                
                name: optional.name,
                description: optional.description,
                price: optional.price,
            }
        });

        let type =  baseType == 1 ? "DAY_PASS" :
                    baseType == 2 ? "MONTHLY_PASS" :
                    baseType == 3 ? "YEARLY_PASS" : "";

        function randomString() {
            const len = 10;
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < len; i++) {
                if(i == 5) result += '-';
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

        let purchaseDate = new Date(startDateString); // TODO: do the same for sessions!! e.g. match date, time , instructor
        let expirationDate = new Date();
    
        // Check if it is a course or gym ID 
        let entity = await courseService.getCourse(courseOrGymId);
        if(entity != null) {
            // ok, it's a course - get the real start date from the session data
            let found = false;
            entity.sessions.forEach(session => {
                session.sessionDetails.forEach(sessionDetail => {
                    if(session.sessionDay + sessionDetail.sessionTime + sessionDetail.sessionsInstructor == startDateString) {
                        purchaseDate = new Date();
                        // TODO: compute purchase date by summing days of week to current, times, etc
                        found = true;
                        console.log("Match found, session start: " + purchaseDate);
                        //actually, it lasts 24h from the 1st session, not until its end? expirationDate = new Date(session.endDate);
                    }
                });
            });
            if(!found) {
                console.log("No match found for " + startDateString);
            }
        } else {
            entity = await gymService.getGym(courseOrGymId);
            if(entity != null) {
                // still ok
            } else {
                console.log("Neither gym nor course!");
                return null;
            }
        }
        
        if(entity != null && uid != null) {
            const offset = 
                (type == "DAY_PASS")   ? 1 :
                (type == "MONTHLY_PASS") ? 30 :
                (type == "YEARLY_PASS")  ? 365 :
                0; 
            expirationDate.setDate(purchaseDate.getDate() + offset);
            const subscription = {
                gymId: ("gymId" in entity) ? entity.gymId : entity._id,
                courseId: ("gymId" in entity) ? entity._id : null,
                name: entity.name,
                type: type,
                price: basePrice + optionals.reduce((acc, cur) => acc + cur.price, 0),
                optionals: optionals,
                purchaseDate: purchaseDate,
                expireDate: expirationDate,
                ticketSecret: randomString(),
                courseId: ("gymId" in entity) ? courseOrGymId : null,
                userId: uid
            };
            return subscription;
        }
        return null;
    }
}

module.exports = new SubscriptionService();