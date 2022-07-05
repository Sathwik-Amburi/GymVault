import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Course, Filter, FilterTypes } from "../models/allModels";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import apiCalls from "../api/apiCalls";
import CourseResultCard from "./CourseResultCard";
import ChonkySpinner from "./widgets/ChonkySpinner";

const CourseResultsPage: FC = () => {
  const queries = new URLSearchParams(window.location.search);
  const maxPrice = 1000;
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Course[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>();

  useEffect(() => {
    const name = queries.get("name");
    const city = queries.get("city");
    if (city) {
      ApiCalls.getAllCoursesByCityOrName(city, name)
        .then((res) => {
          setResults(res.data.response);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleFilter = () => {
    setLoading(true);
    apiCalls
      .getGymsByPriceRange(priceRange)
      .then((res) => {
        if (res.data.message === "No results found") {
          setResults([]);
        } else {
          setResults(res.data.response.gyms);
          setActiveFilters([
            {
              type: FilterTypes.PRICE_RANGE,
              name: "Price range between",
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
            },
          ]);
        }
      })
      .catch((err) => console.log(err.message));
    setLoading(false);
    setOpenModal(false);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleCloseFilter = (filterType: FilterTypes) => {
    const updatedActiveFilters = activeFilters?.filter(
      (item) => item.type !== filterType
    );
    setActiveFilters(updatedActiveFilters);
    ApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Grid>
        <Grid>
          <Typography fontSize={"2em"}>
            {results ? results.length : 0} Results found
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ marginBottom: "8px" }}
          justifyContent="space-between"
        >
          <Grid>
            {activeFilters &&
              activeFilters.map((item, index) => {
                return (
                  <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    style={{ marginRight: "8px" }}
                  >
                    {item.name} {item.minPrice} and {item.maxPrice} EUR
                    <CloseIcon
                      fontSize="small"
                      onClick={() => handleCloseFilter(item.type)}
                      key={index}
                    />
                  </Button>
                );
              })}
          </Grid>
          <Grid>
            <Button
              variant="contained"
              size="small"
              disableElevation
              style={{ marginRight: "8px", float: "right" }}
              onClick={handleOpenModal}
            >
              <FilterAltIcon fontSize="small" /> Filters
            </Button>

            <BootstrapDialog
              onClose={handleCloseModal}
              aria-labelledby="customized-dialog-title"
              open={openModal}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleCloseModal}
              >
                Filter by
              </BootstrapDialogTitle>
              <DialogContent dividers sx={{ width: 500 }}>
                <Typography gutterBottom>
                  Price range (€): between {priceRange[0]} and {priceRange[1]}{" "}
                  EUR
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      max={maxPrice}
                      value={priceRange}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={() => {
                        return `${priceRange} €`;
                      }}
                      marks={[
                        { value: 0, label: "0 €" },
                        { value: 1000, label: "1000 €" },
                      ]}
                    />
                  </Box>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleFilter}>
                  Filter
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Grid>
        </Grid>
      </Grid>
      <ChonkySpinner loading={loading}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {results &&
            results.map((item, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <CourseResultCard course={item} />
              </Grid>
            ))}
        </Grid>
      </ChonkySpinner>
    </>
  );
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default CourseResultsPage;
