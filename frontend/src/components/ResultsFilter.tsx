import { FC, useEffect, useState } from "react";
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
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Gym, PriceRangeFilter, SubscriptionTypes } from "../models/allModels";
import TuneIcon from "@mui/icons-material/Tune";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import { useDispatch } from "react-redux";
import { setGymResults } from "../store/slices/gymResultsSlice";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { setErrorAlert } from "../store/slices/errorAlertSlice";

interface PriceRangeSliderState {
  minPrice: number;
  maxPrice: number;
  sliderChanged: boolean;
}

interface ResultsFilterProps {
  city: string | null;
  name: string | null;
  gyms: Gym[];
}

export interface Filter {
  priceRangeFilters: PriceRangeFilter[];
  amenitiesFilters: string[];
}

const ResultsFilter: FC<ResultsFilterProps> = ({ city, name, gyms }) => {
  const dispatch = useDispatch();
  const [allAmenities, setAllAmenities] = useState<string[]>([]);
  const dailyPassMaxPrice = 50;
  const monthlyPassMaxPrice = 100;
  const yearlyPassMaxPrice = 750;
  const [dailyPasspriceRange, setDailyPassPriceRange] =
    useState<PriceRangeSliderState>({
      minPrice: 0,
      maxPrice: dailyPassMaxPrice,
      sliderChanged: false,
    });
  const [monthlyPasspriceRange, setMonthlyPassPriceRange] =
    useState<PriceRangeSliderState>({
      minPrice: 0,
      maxPrice: monthlyPassMaxPrice,
      sliderChanged: false,
    });
  const [yearlyPasspriceRange, setYearlyPassPriceRange] =
    useState<PriceRangeSliderState>({
      minPrice: 0,
      maxPrice: yearlyPassMaxPrice,
      sliderChanged: false,
    });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<PriceRangeFilter[]>([]);
  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);

  useEffect(() => {
    city &&
      ApiCalls.getAllGymAmenitiesByCity(name, city)
        .then((res) => {
          setAllAmenities(res.data.amenities);
        })
        .catch((err) => {
          UnifiedErrorHandler.handle(err);
          dispatch(
            setErrorAlert({
              showError: true,
              errorMessage: `Cannot get gym amenities in ${city}`,
            })
          );
        });
      }, [gyms, city, dispatch, name]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCloseFilter = (filterType: SubscriptionTypes) => {
    const updatedActiveFilters = activeFilters?.filter(
      (item) => item.type !== filterType
    );
    resetFilterPriceRangeValue(filterType);

    setActiveFilters(updatedActiveFilters);
    const filters: Filter = {
      priceRangeFilters: updatedActiveFilters,
      amenitiesFilters: activeAmenities,
    };

    city &&
      ApiCalls.getGymsByFilters(filters, city)
        .then((res) => {
          dispatch(setGymResults({ filteredGyms: res.data.response.gyms }));
        })
        .catch((err) => {
          UnifiedErrorHandler.handle(err);
          dispatch(
            setErrorAlert({
              showError: true,
              errorMessage: "Cannot get gyms by the specified filters",
            })
          );
        });
  };

  const handleDayPassSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (newValue instanceof Array) {
      setDailyPassPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1],
        sliderChanged: true,
      });

      const cleanedFilters = activeFilters.filter(
        (item) => item.type !== SubscriptionTypes.DAY_PASS
      );

      const updatedActiveFilters = [
        ...cleanedFilters,
        {
          type: SubscriptionTypes.DAY_PASS,
          name: "Day pass between",
          minPrice: dailyPasspriceRange.minPrice,
          maxPrice: dailyPasspriceRange.maxPrice,
        },
      ];

      setActiveFilters(updatedActiveFilters);
    }
  };

  const handleMonthlyPassSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (newValue instanceof Array) {
      setMonthlyPassPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1],
        sliderChanged: true,
      });

      const cleanedFilters = activeFilters.filter(
        (item) => item.type !== SubscriptionTypes.MONTHLY_PASS
      );

      const updatedActiveFilters = [
        ...cleanedFilters,
        {
          type: SubscriptionTypes.MONTHLY_PASS,
          name: "Monthly pass between",
          minPrice: monthlyPasspriceRange.minPrice,
          maxPrice: monthlyPasspriceRange.maxPrice,
        },
      ];

      setActiveFilters(updatedActiveFilters);
    }
  };

  const handleYearlyPassSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (newValue instanceof Array) {
      setYearlyPassPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1],
        sliderChanged: true,
      });
      const cleanedFilters = activeFilters.filter(
        (item) => item.type !== SubscriptionTypes.YEARLY_PASS
      );
      const updatedActiveFilters = [
        ...cleanedFilters,
        {
          type: SubscriptionTypes.YEARLY_PASS,
          name: "Yearly pass between",
          minPrice: yearlyPasspriceRange.minPrice,
          maxPrice: yearlyPasspriceRange.maxPrice,
        },
      ];

      setActiveFilters(updatedActiveFilters);
    }
  };

  const handleFilter = () => {
    setDailyPassPriceRange({ ...dailyPasspriceRange, sliderChanged: false });
    setMonthlyPassPriceRange({
      ...monthlyPasspriceRange,
      sliderChanged: false,
    });
    setYearlyPassPriceRange({
      ...yearlyPasspriceRange,
      sliderChanged: false,
    });
    const filters: Filter = {
      priceRangeFilters: activeFilters,
      amenitiesFilters: activeAmenities,
    };
    city &&
      ApiCalls.getGymsByFilters(filters, city)
        .then((res) => {
          dispatch(setGymResults({ filteredGyms: res.data.response.gyms }));
        })
        .catch((err) => {
          UnifiedErrorHandler.handle(err);
          dispatch(
            setErrorAlert({
              showError: true,
              errorMessage: "Cannot get gyms by the specified filters",
            })
          );
        });
    setOpenModal(false);
  };

  const resetFilterPriceRangeValue = (filterType: SubscriptionTypes) => {
    switch (filterType) {
      case SubscriptionTypes.DAY_PASS:
        setDailyPassPriceRange({
          minPrice: 0,
          maxPrice: dailyPassMaxPrice,
          sliderChanged: false,
        });
        break;
      case SubscriptionTypes.MONTHLY_PASS:
        setMonthlyPassPriceRange({
          minPrice: 0,
          maxPrice: monthlyPassMaxPrice,
          sliderChanged: false,
        });
        break;
      case SubscriptionTypes.YEARLY_PASS:
        setYearlyPassPriceRange({
          minPrice: 0,
          maxPrice: yearlyPassMaxPrice,
          sliderChanged: false,
        });
        break;
      default:
        return;
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    var newActiveAmenities: string[] = [];
    if (event.target.checked) {
      newActiveAmenities = [...activeAmenities, value];
    } else {
      newActiveAmenities = activeAmenities.filter((item) => item !== value);
    }
    setActiveAmenities(newActiveAmenities);
  };

  const handleFilterClear = () => {
    setActiveAmenities([]);
    setActiveFilters([]);
    setDailyPassPriceRange({
      minPrice: 0,
      maxPrice: dailyPassMaxPrice,
      sliderChanged: false,
    });
    setMonthlyPassPriceRange({
      minPrice: 0,
      maxPrice: monthlyPassMaxPrice,
      sliderChanged: false,
    });
    setYearlyPassPriceRange({
      minPrice: 0,
      maxPrice: yearlyPassMaxPrice,
      sliderChanged: false,
    });
    city &&
      ApiCalls.getAllGymsByCityOrName(city, name)
        .then((res) => {
          dispatch(setGymResults({ filteredGyms: res.data.response }));
          setOpenModal(false);
        })
        .catch((err) => {
          UnifiedErrorHandler.handle(err);
          dispatch(
            setErrorAlert({
              showError: true,
              errorMessage: "Cannot get gyms",
            })
          );
        });
  };

  return (
    <>
      <Grid
        md={10}
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
                  {item.name} {item.minPrice} and {item.maxPrice} &euro;
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
          <Badge
            badgeContent={activeAmenities.length}
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="secondary"
              disableElevation
              style={{
                marginRight: "8px",
                float: "right",
                fontWeight: "bold",
                color: "white",
                height: "38px",
              }}
              onClick={handleOpenModal}
            >
              <TuneIcon fontSize="medium" /> Filters
            </Button>
          </Badge>

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
              <Grid container direction={"column"}>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <PriceCheckIcon
                    fontSize="small"
                    color="success"
                    style={{ marginRight: "4px" }}
                  />
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Prices
                  </Typography>
                </Grid>
                <div style={{ marginLeft: "32px" }}>
                  <Typography>
                    Daily Pass (€): between {dailyPasspriceRange.minPrice} and{" "}
                    {dailyPasspriceRange.maxPrice} &euro;
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box sx={{ width: 300, marginLeft: "16px" }}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        max={dailyPassMaxPrice}
                        value={[
                          dailyPasspriceRange.minPrice,
                          dailyPasspriceRange.maxPrice,
                        ]}
                        onChange={handleDayPassSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={() => {
                          return `${[
                            dailyPasspriceRange.minPrice,
                            dailyPasspriceRange.maxPrice,
                          ]} €`;
                        }}
                        marks={[
                          { value: 0, label: "0 €" },
                          {
                            value: dailyPassMaxPrice,
                            label: `${dailyPassMaxPrice} €`,
                          },
                        ]}
                      />
                    </Box>
                  </Typography>
                  <Typography>
                    Monthly Pass (€): between {monthlyPasspriceRange.minPrice}{" "}
                    and {monthlyPasspriceRange.maxPrice} &euro;
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box sx={{ width: 300, marginLeft: "16px" }}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        max={monthlyPassMaxPrice}
                        value={[
                          monthlyPasspriceRange.minPrice,
                          monthlyPasspriceRange.maxPrice,
                        ]}
                        onChange={handleMonthlyPassSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={() => {
                          return `${[
                            monthlyPasspriceRange.minPrice,
                            monthlyPasspriceRange.maxPrice,
                          ]} €`;
                        }}
                        marks={[
                          { value: 0, label: "0 €" },
                          {
                            value: monthlyPassMaxPrice,
                            label: `${monthlyPassMaxPrice} €`,
                          },
                        ]}
                      />
                    </Box>
                  </Typography>
                  <Typography>
                    Yearly Pass (€): between {yearlyPasspriceRange.minPrice} and{" "}
                    {yearlyPasspriceRange.maxPrice} &euro;
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box sx={{ width: 300, marginLeft: "16px" }}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        max={yearlyPassMaxPrice}
                        value={[
                          yearlyPasspriceRange.minPrice,
                          yearlyPasspriceRange.maxPrice,
                        ]}
                        onChange={handleYearlyPassSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={() => {
                          return `${[
                            yearlyPasspriceRange.minPrice,
                            yearlyPasspriceRange.maxPrice,
                          ]} €`;
                        }}
                        marks={[
                          { value: 0, label: "0 €" },
                          {
                            value: yearlyPassMaxPrice,
                            label: `${yearlyPassMaxPrice} €`,
                          },
                        ]}
                      />
                    </Box>
                  </Typography>
                </div>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <FitnessCenterIcon
                    fontSize="small"
                    sx={{ color: "#4e78f5" }}
                    style={{ marginRight: "4px" }}
                  />
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Amenities
                  </Typography>
                </Grid>
                <div style={{ wordWrap: "break-word", marginLeft: "32px" }}>
                  <FormGroup>
                    <Grid container item xs={12}>
                      {allAmenities.map((item, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              onChange={(event) =>
                                handleCheckboxChange(event, item)
                              }
                              checked={
                                activeAmenities.find(
                                  (element) => element === item
                                )
                                  ? true
                                  : false
                              }
                            />
                          }
                          label={item}
                        />
                      ))}
                    </Grid>
                  </FormGroup>
                </div>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleFilterClear}
                color="primary"
                variant="outlined"
                style={{
                  background: "white",
                  fontWeight: "bold",
                }}
              >
                Clear all filters
              </Button>
              <Button
                autoFocus
                onClick={handleFilter}
                color="inherit"
                variant="outlined"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#D7053E",
                }}
              >
                Filter
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Grid>
      </Grid>
    </>
  );
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }} {...other}>
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default ResultsFilter;
