const subscriptionModel = require("../database/models/subscription");
const courseService = require("./courseService");
const gymService = require("./gymService");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");

class SubscriptionService {
  getSubscriptionsByUserId = async (userId) => {
    try {
      const subscriptions = await subscriptionModel
        .find({ userId: ObjectId(userId) })
        .sort({ purchaseDate: -1 });
      let res = await Promise.all(
        subscriptions.map(async (subscription) => {
          const gym = await gymService.getGym(subscription.gymId);
          if (subscription.courseId) {
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
        })
      );
      return res;
    } catch (error) {
      console.log("Error while fetching subscriptions", error.message);
    }
  };
  getSubscriptionById = async (subscriptionId) => {
    try {
      const subscription = await subscriptionModel.findById(subscriptionId);
      return subscription;
    } catch (error) {
      console.log("Error while fetching subscription", error.message);
    }
  };
  getSubscriptionsByGymId = async (gymId) => {
    try {
      const subscriptions = await subscriptionModel.find({
        gymId: gymId,
        userId: null,
      });
      return subscriptions;
    } catch (error) {
      console.log("Error while fetching subscriptions", error.message);
    }
  };
  addSubscription = async (subscription) => {
    try {
      await subscription.save();
    } catch (error) {
      console.log("Error while adding subscription", error.message);
    }
  };

  generateSubscriptionData = async (
    uid,
    courseOrGymId,
    baseType,
    startDateString,
    basePrice,
    rawOptionals
  ) => {
    let type =
      baseType == 1
        ? "DAY_PASS"
        : baseType == 2
        ? "MONTHLY_PASS"
        : baseType == 3
        ? "YEARLY_PASS"
        : baseType == 4
        ? "SESSION_PASS"
        : "";
    const offset =
      type == "DAY_PASS"
        ? 1
        : type == "MONTHLY_PASS"
        ? 30
        : type == "YEARLY_PASS"
        ? 365
        : 0;

    let optionals = rawOptionals.map((optional) => {
      return {
        name: optional.name,
        description: optional.description,
        price: optional.price,
      };
    });

    function randomString() {
      const len = 10;
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (var i = 0; i < len; i++) {
        if (i == 5) result += "-";
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }

    let purchaseDate = moment(); // WILL BE REPLACED by either startDateString or session date
    console.log(purchaseDate);
    let expirationDate = moment().startOf("day").toDate();

    // Check if it is a course or gym ID
    let entity = await courseService.getCourse(courseOrGymId);
    if (entity != null) {
      // it's a course - get the real start date from the session data

      // if it's a single session ticket, it is only valid in that timeframe
      if (baseType == 4) {
        let found = false;
        entity.sessions.forEach((session) => {
          session.sessionDetails.forEach((sessionDetail) => {
            if (
              session.sessionDay +
                sessionDetail.sessionTime +
                sessionDetail.sessionsInstructor ==
              startDateString
            ) {
              purchaseDate = moment().startOf("day");
              // compute purchase date by summing days of week to current, times, etc
              let i = 9;
              while (
                purchaseDate.format("dddd") != session.sessionDay &&
                i > 0
              ) {
                //console.log(purchaseDate.format("dddd") + " != " + session.sessionDay + ", i=" + i);
                purchaseDate.add(1, "days");
                i--;
              }
              if (i != 0) {
                found = true;
                console.log(
                  "Match found, session start: " +
                    purchaseDate.format("DD/MM/YYYY")
                );
                console.log(
                  "Single session ticket, setting validity to session time only"
                );
                let sessionTime = sessionDetail.sessionTime.split(" - ");
                console.log(sessionTime);
                expirationDate = moment(
                  purchaseDate.format("YYYY-MM-DD") +
                    " " +
                    sessionTime[1] +
                    " +0000",
                  "YYYY-MM-DD HH:mm Z"
                ).toDate();
                purchaseDate = moment(
                  purchaseDate.format("YYYY-MM-DD") +
                    " " +
                    sessionTime[0] +
                    " +0000",
                  "YYYY-MM-DD HH:mm Z"
                ).toDate();
                console.log(
                  "purchase: ",
                  purchaseDate,
                  ", expiry: ",
                  expirationDate
                );
              } else {
                purchaseDate = purchaseDate.toDate();
                // it's a month/yearly ticket, so it starts today, but not at the session type
                expirationDate.setDate(purchaseDate.getDate() + offset);
              }
            } else {
              console.log("No match found for " + startDateString);
              return null;
            }
          });
        });
      } else {
        // it's a monthly/yearly ticket, so it starts the first day, but not at the session type
        purchaseDate = moment(startDateString, "DD/MM/YYYY")
          .startOf("day")
          .toDate();
        expirationDate.setDate(purchaseDate.getDate() + offset);
      }
    } else {
      entity = await gymService.getGym(courseOrGymId);
      if (entity != null) {
        // it's a gym; then get the start date & apply it
        purchaseDate = moment(startDateString, "DD/MM/YYYY")
          .startOf("day")
          .toDate();
        expirationDate.setDate(purchaseDate.getDate() + offset);
      } else {
        console.log("Neither gym nor course!");
        return null;
      }
    }

    if (entity != null && uid != null) {
      const subscription = {
        gymId: "gymId" in entity ? entity.gymId : entity._id,
        courseId: "gymId" in entity ? entity._id : null,
        name: entity.name,
        type: type,
        price: basePrice + optionals.reduce((acc, cur) => acc + cur.price, 0),
        optionals: optionals,
        purchaseDate: purchaseDate,
        expireDate: expirationDate,
        ticketSecret: randomString(),
        courseId: "gymId" in entity ? courseOrGymId : null,
        userId: uid,
      };
      return subscription;
    }
    return null;
  };
}

module.exports = new SubscriptionService();
