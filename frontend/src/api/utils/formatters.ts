import { SubscriptionTypes } from "../../models/allModels";

export const toCleanSubscriptionTypeFormat = (
  subscriptionType: SubscriptionTypes
): string => {
  switch (subscriptionType) {
    case SubscriptionTypes.DAY_PASS:
      return "Daily Pass";
    case SubscriptionTypes.MONTHLY_PASS:
      return "Monthly Pass";
    case SubscriptionTypes.YEARLY_PASS:
      return "Yearly Pass";
    case SubscriptionTypes.COURSE_TICKET:
      return "Course Ticket";
    case SubscriptionTypes.SESSION_PASS:
      return "Session Pass";
    default:
      return "";
  }
};

export const toCleanSubscriptionRange = (
  subscriptionType: SubscriptionTypes
): string => {
  switch (subscriptionType) {
    case SubscriptionTypes.DAY_PASS:
      return "Day";
    case SubscriptionTypes.MONTHLY_PASS:
      return "Month";
    case SubscriptionTypes.YEARLY_PASS:
      return "Year";
    case SubscriptionTypes.COURSE_TICKET:
      return "Session";
    case SubscriptionTypes.SESSION_PASS:
      return "Session";
    default:
      return "";
  }
};

export const getCourseSpelling = (resultLength: number | undefined): string => {
  switch (resultLength) {
    case 1:
      return "Course ";
    default:
      return "Courses ";
  }
};

export const getGymSpelling = (resultLength: number | undefined): string => {
  switch (resultLength) {
    case 1:
      return "Gym ";
    default:
      return "Gyms ";
  }
};
