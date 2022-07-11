import { FC, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Filter, SubscriptionTypes } from "../models/allModels";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import { useDispatch } from "react-redux";
import { setGymResults } from "../store/slices/gymResultsSlice";

interface PriceRangeSliderState {
  minPrice: number;
  maxPrice: number;
  sliderChanged: boolean;
}

interface ResultsFilterProps {
  city: string | null;
  name: string | null;
}

const ResultsFilter: FC<ResultsFilterProps> = ({ city, name }) => {
  const dispatch = useDispatch();
  const dailyPassMaxPrice = 50;
  const monthlyPassMaxPrice = 100;
  const yearlyPassMaxPrice = 500;
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
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCloseFilter = (filterType: SubscriptionTypes) => {
    const updatedActiveFilters = activeFilters?.filter(
      (item) => item.type !== filterType
    );
    resetFilterPriceRangeValue(filterType);

    setActiveFilters(updatedActiveFilters);
    city &&
      ApiCalls.getGymsByFilters(updatedActiveFilters, city)
        .then((res) => {
          if (res.data.message === "No results found") {
            dispatch(setGymResults({ filteredGyms: [] }));
          } else {
            dispatch(setGymResults({ filteredGyms: res.data.response.gyms }));
          }
        })
        .catch((err) =>
          UnifiedErrorHandler.handle(err, "Cannot get gyms by price range")
        );
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
    }
  };

  const handleFilter = () => {
    buildActiveFilters();
    city &&
      ApiCalls.getGymsByFilters(activeFilters, city)
        .then((res) => {
          if (res.data.message === "No results found") {
            dispatch(setGymResults({ filteredGyms: [] }));
          } else {
            dispatch(setGymResults({ filteredGyms: res.data.response.gyms }));
          }
        })
        .catch((err) =>
          UnifiedErrorHandler.handle(err, "Cannot get gyms by price range")
        );
    setOpenModal(false);
  };

  const buildActiveFilters = () => {
    if (dailyPasspriceRange.sliderChanged) {
      activeFilters.push({
        type: SubscriptionTypes.DAY_PASS,
        name: "Day pass between",
        minPrice: dailyPasspriceRange.minPrice,
        maxPrice: dailyPasspriceRange.maxPrice,
      });
      setDailyPassPriceRange({ ...dailyPasspriceRange, sliderChanged: false });
    }
    if (monthlyPasspriceRange.sliderChanged) {
      activeFilters.push({
        type: SubscriptionTypes.MONTHLY_PASS,
        name: "Monthly pass between",
        minPrice: monthlyPasspriceRange.minPrice,
        maxPrice: monthlyPasspriceRange.maxPrice,
      });
      setMonthlyPassPriceRange({
        ...monthlyPasspriceRange,
        sliderChanged: false,
      });
    }
    if (yearlyPasspriceRange.sliderChanged) {
      activeFilters.push({
        type: SubscriptionTypes.YEARLY_PASS,
        name: "Yearly pass between",
        minPrice: yearlyPasspriceRange.minPrice,
        maxPrice: yearlyPasspriceRange.maxPrice,
      });
      setYearlyPassPriceRange({
        ...yearlyPasspriceRange,
        sliderChanged: false,
      });
    }
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

  return (
    <>
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
              <Typography>
                Daily Pass (€): between {dailyPasspriceRange.minPrice} and{" "}
                {dailyPasspriceRange.maxPrice} EUR
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
                Monthly Pass (€): between {monthlyPasspriceRange.minPrice} and{" "}
                {monthlyPasspriceRange.maxPrice} EUR
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
                {yearlyPasspriceRange.maxPrice} EUR
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
                        label: `${monthlyPassMaxPrice} €`,
                      },
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default ResultsFilter;
