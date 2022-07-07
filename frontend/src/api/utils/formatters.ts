import { SubscriptionTypes } from "../../models/allModels";

export const toCleanSubscriptionTypeFormat = (subscriptionType: SubscriptionTypes): string => {
  switch (subscriptionType) {
    case SubscriptionTypes.DAY_PASS:
      return "Day Pass";
    case SubscriptionTypes.MONTHLY_PASS:
      return "Monthly Pass";
    case SubscriptionTypes.YEARLY_PASS:
      return "Yearly Pass";
    case SubscriptionTypes.COURSE_TICKET:
      return "Yearly Pass";
    default:
      return "";
  }
};
