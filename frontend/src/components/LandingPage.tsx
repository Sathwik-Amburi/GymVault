import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";

const LandingPage: FC = () => {
  const [gyms, setGyms] = useState<Gym[]>([
    { name: "", phoneNumber: 0, _id: "" },
  ]);

  useEffect(() => {
    ApiCalls.getAllGyms()
      .then((res) => {
        console.log(res.data);
        setGyms(res.data);
      })
      .catch((err) => {
        // do some error handling later, log error for now
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div>TODO: Implement the landing page</div>
      <div>response body from the dummy examples in the db </div>
      {gyms.map((item) => {
        return (
          <>
            <div>
              id {item._id} name {item.name} phone number {item.phoneNumber}
            </div>
          </>
        );
      })}
    </>
  );
};

export default LandingPage;
