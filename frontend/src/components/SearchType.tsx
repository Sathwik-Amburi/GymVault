import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { allCities } from "../config/cities";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function SearchType({ type }: any) {
  let [name, setName] = React.useState<string>("");
  let [city, setCity] = React.useState<string>("");
  let [error, setError] = React.useState<string>("");

  const cities = allCities.map((city) => {
    return { label: city };
  });

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
