import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { allCities } from "../config/cities";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

interface City {
  label: string;
}

export default function SearchType({ type }: any) {
  let [name, setName] = useState<string>("");
  let [city, setCity] = useState<string>("");
  let [error, setError] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    ApiCalls.getAllAvailableSearchCities(type)
      .then((res) => {
        setCities(
          res.data.map((city) => {
            return { label: city };
          })
        );
      })
      .catch((err) => UnifiedErrorHandler.handle(err, "Cannot get gym cities"));
  }, [type]);

  let navigate = useNavigate();

  const handleNameChange = (event: any) => {
    let newNameSearch = event.target.value;
    setName(newNameSearch);
  };

  const handleCityChange = (event: any, value: any) => {
    let newCitySearch = value;
    setCity(newCitySearch);
  };

  const search = (event: any) => {
    event.preventDefault();
    if (!allCities.includes(city)) {
      setError("*please enter a valid location");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      navigate(
        `/results/${
          type === "gyms" ? "gyms" : "courses"
        }/search?name=${name}&city=${city}`
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "30px 0px 40px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextField
            onChange={handleNameChange}
            style={{ marginRight: "3px" }}
            fullWidth
            label={type === "gyms" ? "Gym Name" : "Course Name"}
            id="fullWidth"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Autocomplete
            onInputChange={handleCityChange}
            freeSolo
            disablePortal
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="City" />}
          />

          <span style={{ fontSize: "12px", color: "red" }}>{error}</span>
        </div>

        <Button
          onClick={search}
          style={{ marginLeft: "3px", height: "55px" }}
          variant="contained"
          endIcon={<i className="fas fa-search" />}
        >
          Search
        </Button>
      </div>
    </>
  );
}
