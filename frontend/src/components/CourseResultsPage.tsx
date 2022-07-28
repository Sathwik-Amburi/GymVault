import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import CourseResultCard from "./CourseResultCard";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import { getCourseSpelling } from "../api/utils/formatters";
import CourseResultsFilter from "./CourseResultsFilter";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setCourseResults } from "../store/slices/courseResultsSlice";
import CourseResultsSort from "./CourseResultsSort";
import CityMap from "./widgets/map/CityMap";
import { setErrorAlert } from "../store/slices/errorAlertSlice";

const CourseResultsPage: FC = () => {
  const dispatch = useDispatch();
  const queries = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState<boolean>(true);
  const courseResults = useSelector(
    (state: RootState) => state.courseResults.filteredCourses
  );

  const city = queries.get("city");
  const name = queries.get("name");

  useEffect(() => {
    city &&
      ApiCalls.getAllCoursesByCityOrName(city, name)
        .then((res) => {
          dispatch(setCourseResults({ filteredCourses: res.data.response }));
          setLoading(false);
        })
        .catch((err) => {
          UnifiedErrorHandler.handle(err);
          dispatch(
            setErrorAlert({
              showError: true,
              errorMessage: "Cannot get courses",
            })
          );
        });
  }, []);

  return (
    <>
      {courseResults && courseResults.length > 0 ? (
        <>
          <Grid>
            <Grid>
              <Typography fontSize={"2em"} fontWeight="bold">
                {courseResults ? courseResults.length : 0}{" "}
                {getCourseSpelling(courseResults?.length)}
                found in {city}
              </Typography>
            </Grid>
            <Grid container>
              <CourseResultsFilter city={city} name={name} />
              <CourseResultsSort />
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "30px 0px",
            }}
          >
            <CityMap item="course" city={city} />
          </div>

          <ChonkySpinner loading={loading}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {courseResults &&
                courseResults.map((item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <CourseResultCard course={item} />
                  </Grid>
                ))}
            </Grid>
          </ChonkySpinner>
        </>
      ) : (
        <Grid>
          <Grid>
            <Typography fontSize={"2em"} fontWeight="bold">
              {courseResults ? courseResults.length : 0}{" "}
              {getCourseSpelling(courseResults?.length)} called {name}
              found in {city}
            </Typography>
            <Typography fontSize={"1em"} variant="caption">
              Please try searching using a different name or try searching by
              city
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                margin: "30px 0px",
              }}
            >
              <CityMap item="course" city={city} />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CourseResultsPage;
