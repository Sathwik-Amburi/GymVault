import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";
import { Link } from "react-router-dom";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const LandingPage: FC = () => {
  const [gyms, setGyms] = useState<Gym[]>([
    { name: "", description: "", phoneNumber: "", address: "", city: "", amenities:  [], _id: "" },
  ]);

  useEffect(() => {
    ApiCalls.getAllGyms()
      .then((res) => {
        console.log(res.data);
        setGyms(res.data);
      }).catch((err) => UnifiedErrorHandler.handle(err, "Cannot get gyms"));
  }, []);

  return (
    <>
      <div>TODO: Implement the landing page</div>
      <div>response body from the dummy examples in the db </div>
      Currently in DB:
      <ul>
        {gyms.map((item) => {
          return (
            <>
              <li>
                <Link to={`/gym/${item._id}`}>{item.name}</Link>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default LandingPage;
