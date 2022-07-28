import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { allCities } from "../config/cities";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import Map from "./widgets/map/GermanyMap";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setErrorAlert } from "../store/slices/errorAlertSlice";

interface City {
  label: string;
}

export default function SearchType(props: any) {
  const dispatch = useDispatch();
  let [name, setName] = useState<string>("");
  let [city, setCity] = useState<string>("");
  let [error, setError] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [loaded, setLoaded] = useState<Boolean>(false);

  useEffect(() => {
    setLoaded(false);
    ApiCalls.getAllAvailableSearchCities(props.type)
      .then((res) => {
        setCities(
          res.data.map((city) => {
            return { label: city };
          })
        );
        setLoaded(true);
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Cannot find gym cities. Please try again.",
          })
        );
      });
  }, [props.type]);

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
          props.type === "gyms" ? "gyms" : "courses"
        }/search?name=${name}&city=${city}`
      );
    }
  };

  return (
    <>
      {loaded ? (
        <Map type={props.type} cities={cities} setCity={setCity} />
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "30px 0px 20px 0px",
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
            label={props.type === "gyms" ? "Gym Name" : "Course Name"}
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
            value={city}
            renderInput={(params) => <TextField {...params} label="City" />}
          />

          <span style={{ fontSize: "12px", color: "red" }}>{error}</span>
        </div>

        <Button
          onClick={search}
          style={{ marginLeft: "3px", height: "55px", fontWeight: "bold" }}
          variant="contained"
          endIcon={<SearchIcon sx={{ color: "white" }} />}
        >
          Search
        </Button>
      </div>
    </>
  );
}
