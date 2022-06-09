import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";
import Navbar from "./widgets/Navbar";

const GymViewPage: FC = () => {
  const [gyms, setGyms] = useState<Gym[]>([
    { name: "", phoneNumber: 0, _id: "" },
  ]);

  return (
    <>
      <Navbar />
    </>
  );
};

export default GymViewPage;
