import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Input,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Lightbox from "./widgets/Lightbox";
import { allCities } from "../config/cities";
import { FC, Fragment, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  SubscriptionOffers,
  CourseSession,
  SessionDetails,
  SubscriptionTypes,
  UserProfileDetails,
} from "../models/allModels";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toCleanSubscriptionTypeFormat } from "../api/utils/formatters";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import axios from 'axios';


interface NewCourseState {
  name: string;
  gymId: string;
  description: string;
  images?: string;
  subscriptionOffers: SubscriptionOffers[];
  sessions: CourseSession[];
}

interface NewOptionState {
  name: string;
  description: string;
  price: number;
}

const optionModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const courseModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
};

const CreateGym: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const handleOpenOptionModal = () => setOpenOptionModal(true);
  const handleCloseOptionModal = () => setOpenOptionModal(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const handleOpenCourseModal = () => setOpenCourseModal(true);
  const handleCloseCourseModal = () => setOpenCourseModal(false);
  const [options, setOptions] = useState<NewOptionState[]>([]);
  const [courses, setCourses] = useState<NewCourseState[]>([]);
  const [courseSessions, setCourseSessions] = useState<CourseSession[]>([
    { sessionDay: "Monday", sessionDetails: [] },
    { sessionDay: "Tuesday", sessionDetails: [] },
    { sessionDay: "Wednesday", sessionDetails: [] },
    { sessionDay: "Thursday", sessionDetails: [] },
    { sessionDay: "Friday", sessionDetails: [] },
    { sessionDay: "Saturday", sessionDetails: [] },
    { sessionDay: "Sunday", sessionDetails: [] },
  ]);
  let [images, setImages] = React.useState<string[]>([
    "https://thecatapi.com/api/images/get?format=src&type=png",
    "https://thecatapi.com/api/images/get?format=src&type=png&2",
    "https://thecatapi.com/api/images/get?format=src&type=png&3",
  ]);
  const [courseImages, setCourseImages] = useState<string[]>([
    "https://thecatapi.com/api/images/get?format=src&type=png",
    "https://thecatapi.com/api/images/get?format=src&type=png&2",
    "https://thecatapi.com/api/images/get?format=src&type=png&3",
  ]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) =>
        UnifiedErrorHandler.handle(err, "Cannot get user profile")
      );
  }, [token]);

  const gymValidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    website: yup.string(),
    phone: yup.number().required("Phone number is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    description: yup.string().required("Description is required"),
    gymImages: yup.string(),
    amenities: yup.string().required("Amenities are required"),
    dayPassSelected: yup.boolean(),
    dayPassPrice: yup.number(),
    gymMonthlySubscriptionSelected: yup.boolean(),
    gymMonthlySubscriptionPrice: yup.number(),
    gymYearlySubscriptionSelected: yup.boolean(),
    gymYearlySubscriptionPrice: yup.number(),
  });

  const courseValidationSchema = yup.object({
    courseName: yup.string().required("Course name is required"),
    courseDescription: yup.string().required("Course description is required"),
    courseSessionTicketSelected: yup.boolean(),
    courseSessionTicketPrice: yup.number(),
    monthlySubscriptionSelected: yup.boolean(),
    monthlySubscriptionPrice: yup.number(),
    yearlySubscriptionSelected: yup.boolean(),
    yearlySubscriptionPrice: yup.number(),
    courseImages: yup.string(),
  });

  const optionValidationSchema = yup.object({
    optionName: yup.string().required("Option name is required"),
    optionDescription: yup.string().required("Option description is required"),
    optionPrice: yup.number().required("Option price is required"),
  });

  const gymFormik = useFormik({
    initialValues: {
      name: "",
      website: "",
      phone: "",
      city: "",
      address: "",
      description: "",
      gymImages: "",
      amenities: "",
      dayPassSelected: false,
      dayPassPrice: 0,
      gymMonthlySubscriptionSelected: false,
      gymMonthlySubscriptionPrice: 0,
      gymYearlySubscriptionSelected: false,
      gymYearlySubscriptionPrice: 0,
    },
    validationSchema: gymValidationSchema,
    onSubmit: async (values: any) => {
      const gym = values
      const gymoptions: any = options
      const gymcourses: any = courses

      const data = { gym, gymcourses, gymoptions }
      const headers = { "x-access-token": String(localStorage.getItem('token')) }
      await axios.post(`gyms/add-gym`, data, { headers })
      console.log(gym);
      console.log(gymoptions);
      console.log(gymcourses);
    },
  });

  const optionFormik = useFormik({
    initialValues: {
      optionName: "",
      optionDescription: "",
      optionPrice: 0,
    },
    validationSchema: optionValidationSchema,
    onSubmit: (values: any) => {
      const newOption: NewOptionState = {
        name: values.optionName,
        description: values.optionDescription,
        price: values.optionPrice,
      };
      setOptions([...options, newOption]);
      setOpenOptionModal(false);
      optionFormik.resetForm();
    },
  });

  const courseFormik = useFormik({
    initialValues: {
      courseName: "",
      courseDescription: "",
      courseSessionTicketSelected: false,
      courseSessionTicketPrice: 0,
      monthlySubscriptionSelected: false,
      monthlySubscriptionPrice: 0,
      yearlySubscriptionSelected: false,
      yearlySubscriptionPrice: 0,
      courseImages: "",
    },
    validationSchema: courseValidationSchema,
    onSubmit: (values: any) => {
      const newCourse: NewCourseState = {
        name: values.courseName,
        description: values.courseDescription,
        gymId: "",
        sessions: courseSessions,
        subscriptionOffers: [
          {
            subscriptionType: SubscriptionTypes.SESSION_PASS,
            subscriptionPrice: values.courseSessionTicketPrice,
            discount: 0
          },
          {
            subscriptionType: SubscriptionTypes.MONTHLY_PASS,
            subscriptionPrice: values.monthlySubscriptionPrice,
            discount: 0
          },
          {
            subscriptionType: SubscriptionTypes.YEARLY_PASS,
            subscriptionPrice: values.yearlySubscriptionPrice,
            discount: 0
          },
        ],
        images: values.courseImages,
      };
      setCourses([...courses, newCourse]);
      setOpenCourseModal(false);
      courseFormik.resetForm();
    },
  });

  const handleDeleteOption = (option: NewOptionState) => {
    const updatedOptions = options.filter((item) => item.name !== option.name);
    setOptions(updatedOptions);
  };

  const handleDeleteCourse = (course: NewCourseState) => {
    const updatedCourses = courses.filter((item) => item.name !== course.name);
    setCourses(updatedCourses);
  };

  return (
    <form onSubmit={gymFormik.handleSubmit}>
      <Grid
        container
        spacing={3}
        style={{
          padding: "3em",
          borderRadius: "20px",
          backgroundColor: "#eee",
          marginTop: "3em",
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Grid item xs={12}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Welcome onboard
          </Typography>
          <Typography variant="body1">
            Please enter your gym details to start
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={gymFormik.values.name}
            onChange={gymFormik.handleChange}
            required
            label="Name"
            placeholder="HyperGym"
            inputProps={{ style: { fontWeight: "bold" } }}
            error={gymFormik.touched.name && Boolean(gymFormik.errors.name)}
            helperText={gymFormik.touched.name && gymFormik.errors.name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="website"
            name="website"
            value={gymFormik.values.website}
            onChange={gymFormik.handleChange}
            inputProps={{ style: { fontWeight: "bold" } }}
            error={
              gymFormik.touched.website && Boolean(gymFormik.errors.website)
            }
            helperText={gymFormik.touched.website && gymFormik.errors.website}
            fullWidth
            label="Website"
            placeholder="https://hypergym.com"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            required
            value={gymFormik.values.description}
            onChange={gymFormik.handleChange}
            inputProps={{ style: { fontWeight: "bold" } }}
            error={
              gymFormik.touched.description &&
              Boolean(gymFormik.errors.description)
            }
            helperText={
              gymFormik.touched.description && gymFormik.errors.description
            }
            multiline={true}
            fullWidth
            rows={4}
            label="Description"
            placeholder="A great gym in the heart of the city"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Location
          </Typography>
          <Typography variant="body2">Where can we find you ? </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Address"
            id="address"
            name="address"
            placeholder="Please enter your establishment's full address"
            required
            value={gymFormik.values.address}
            onChange={gymFormik.handleChange}
            inputProps={{ style: { fontWeight: "bold" } }}
            error={
              gymFormik.touched.address && Boolean(gymFormik.errors.address)
            }
            helperText={gymFormik.touched.address && gymFormik.errors.address}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Select
            fullWidth
            required
            label="City"
            id="city"
            name="city"
            onChange={gymFormik.handleChange}
            inputProps={{ style: { fontWeight: "bold" } }}
            value={gymFormik.values.city}
          >
            {allCities.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Contact Info
          </Typography>
          <Typography variant="body2">
            How can customers, and the GymVault staff, reach you ?
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField fullWidth value={profile ? profile.email : ""} required />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Phone"
            placeholder="49 123 4567890"
            id="phone"
            name="phone"
            value={gymFormik.values.phone}
            onChange={gymFormik.handleChange}
            required
            inputProps={{ style: { fontWeight: "bold" } }}
            error={gymFormik.touched.phone && Boolean(gymFormik.errors.phone)}
            helperText={gymFormik.touched.phone && gymFormik.errors.phone}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Subscriptions
          </Typography>
          <Typography variant="body2">
            What kind of entry tickets can your customers buy ?
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Checkbox
                size="small"
                onChange={gymFormik.handleChange}
                value={gymFormik.values.dayPassSelected}
                color="secondary"
                name="dayPassSelected"
                id="dayPassSelected"
              />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Day Pass
              </Typography>
              <br />
              <TextField
                disabled={!gymFormik.values.dayPassSelected}
                id="dayPassPrice"
                name="dayPassPrice"
                value={gymFormik.values.dayPassPrice}
                onChange={gymFormik.handleChange}
                required
                error={
                  gymFormik.touched.dayPassPrice &&
                  Boolean(gymFormik.errors.dayPassPrice)
                }
                helperText={
                  gymFormik.touched.dayPassPrice &&
                  gymFormik.errors.dayPassPrice
                }
                fullWidth
                label="Price (&euro;)"
                type="number"
                placeholder="6.99"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Checkbox
                size="small"
                onChange={gymFormik.handleChange}
                value={gymFormik.values.gymMonthlySubscriptionSelected}
                color="secondary"
                name="gymMonthlySubscriptionSelected"
                id="gymMonthlySubscriptionSelected"
              />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Monthly Subscription
              </Typography>
              <br />
              <TextField
                disabled={!gymFormik.values.gymMonthlySubscriptionSelected}
                id="gymMonthlySubscriptionPrice"
                name="gymMonthlySubscriptionPrice"
                value={gymFormik.values.gymMonthlySubscriptionPrice}
                onChange={gymFormik.handleChange}
                required
                error={
                  gymFormik.touched.gymMonthlySubscriptionPrice &&
                  Boolean(gymFormik.errors.gymMonthlySubscriptionPrice)
                }
                helperText={
                  gymFormik.touched.gymMonthlySubscriptionPrice &&
                  gymFormik.errors.gymMonthlySubscriptionPrice
                }
                fullWidth
                label="Price (&euro;)"
                type="number"
                placeholder="49.99"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Checkbox
                size="small"
                onChange={gymFormik.handleChange}
                value={gymFormik.values.gymYearlySubscriptionSelected}
                color="secondary"
                name="gymYearlySubscriptionSelected"
                id="gymYearlySubscriptionSelected"
              />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Yearly Subscription
              </Typography>
              <br />
              <TextField
                disabled={!gymFormik.values.gymYearlySubscriptionSelected}
                id="gymYearlySubscriptionPrice"
                name="gymYearlySubscriptionPrice"
                value={gymFormik.values.gymYearlySubscriptionPrice}
                onChange={gymFormik.handleChange}
                required
                error={
                  gymFormik.touched.gymYearlySubscriptionPrice &&
                  Boolean(gymFormik.errors.gymYearlySubscriptionPrice)
                }
                helperText={
                  gymFormik.touched.gymYearlySubscriptionPrice &&
                  gymFormik.errors.gymYearlySubscriptionPrice
                }
                fullWidth
                label="Price (&euro;)"
                type="number"
                placeholder="329.99"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Courses
          </Typography>
          <Typography variant="body2">
            Sports classes that are offered separately from fixed subscriptions
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item xs={12}>
          <div>
            {courses.map((item, index) => (
              <Grid
                item
                md={12}
                xs={12}
                key={index}
                style={{
                  borderRadius: "12px",
                  height: "100%",
                }}
              >
                <Paper
                  style={{
                    backgroundColor: "#999",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "1.5em",
                    margin: "1em",
                    position: "relative",
                  }}
                >
                  <div>
                    <DeleteIcon
                      color="action"
                      fontSize="small"
                      onClick={() => handleDeleteCourse(item)}
                      style={{ position: "absolute", top: "5px", right: "5px" }}
                    />
                    <span style={{ fontWeight: "bold" }}>{item.name}</span>
                    <br />
                    <br />
                    <span>{item.description}</span>
                    <br />
                    {item.subscriptionOffers.map((subscription) => (
                      <div>
                        <span>
                          {toCleanSubscriptionTypeFormat(
                            subscription.subscriptionType
                          )}{" "}
                        </span>
                        <span>{subscription.subscriptionPrice} &euro;</span>
                      </div>
                    ))}
                  </div>
                </Paper>
              </Grid>
            ))}
            <Modal open={openCourseModal} onClose={handleCloseCourseModal}>
              <Box sx={courseModalStyle}>
                <form onSubmit={courseFormik.handleSubmit} id="myForm">
                  <Grid
                    container
                    spacing={3}
                    style={{
                      padding: "1em",
                      borderRadius: "20px",
                      backgroundColor: "#eee",
                      overflowY: "scroll",
                    }}
                    height={600}
                  >
                    <Grid
                      item
                      md={12}
                      xs={12}
                      style={{ padding: 0, marginBottom: "16px" }}
                    >
                      <TextField
                        fullWidth
                        id="courseName"
                        name="courseName"
                        value={courseFormik.values.courseName}
                        onChange={courseFormik.handleChange}
                        required
                        label="Course Name"
                        placeholder="Spinning"
                        error={
                          courseFormik.touched.courseName &&
                          Boolean(courseFormik.errors.courseName)
                        }
                        helperText={
                          courseFormik.touched.courseName &&
                          courseFormik.errors.courseName
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                      style={{ padding: 0, marginBottom: "16px" }}
                    >
                      <TextField
                        fullWidth
                        id="courseDescription"
                        name="courseDescription"
                        value={courseFormik.values.courseDescription}
                        onChange={courseFormik.handleChange}
                        required
                        multiline={true}
                        rows={4}
                        label="Course Description"
                        placeholder="This 80 minute class is the ultimate in endurance and strength training. Rotating between two instructors, clients get the best of two full classes consisting of indoor cycling and power and strength."
                        error={
                          courseFormik.touched.courseDescription &&
                          Boolean(courseFormik.errors.courseDescription)
                        }
                        helperText={
                          courseFormik.touched.courseDescription &&
                          courseFormik.errors.courseDescription
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Course Subscriptions
                      </Typography>
                      <Typography variant="body2">
                        What kind of entry tickets to your courses can your
                        customer buy ?
                      </Typography>
                      <hr className="mini-hr" />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                          <Checkbox
                            size="small"
                            onChange={courseFormik.handleChange}
                            value={
                              courseFormik.values.courseSessionTicketSelected
                            }
                            color="secondary"
                            name="courseSessionTicketSelected"
                            id="courseSessionTicketSelected"
                          />
                          <Typography
                            variant="body1"
                            style={{ display: "inline-block" }}
                          >
                            Session Ticket
                          </Typography>
                          <br />
                          <TextField
                            disabled={
                              !courseFormik.values.courseSessionTicketSelected
                            }
                            id="courseSessionTicketPrice"
                            name="courseSessionTicketPrice"
                            value={courseFormik.values.courseSessionTicketPrice}
                            onChange={courseFormik.handleChange}
                            required
                            error={
                              courseFormik.touched.courseSessionTicketPrice &&
                              Boolean(
                                courseFormik.errors.courseSessionTicketPrice
                              )
                            }
                            helperText={
                              courseFormik.touched.courseSessionTicketPrice &&
                              courseFormik.errors.courseSessionTicketPrice
                            }
                            fullWidth
                            label="Price (&euro;)"
                            type="number"
                            placeholder="6.99"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <Checkbox
                            size="small"
                            onChange={courseFormik.handleChange}
                            value={
                              courseFormik.values.monthlySubscriptionSelected
                            }
                            color="secondary"
                            name="monthlySubscriptionSelected"
                            id="monthlySubscriptionSelected"
                          />
                          <Typography
                            variant="body1"
                            style={{ display: "inline-block" }}
                          >
                            Monthly Subscription
                          </Typography>
                          <br />
                          <TextField
                            disabled={
                              !courseFormik.values.monthlySubscriptionSelected
                            }
                            id="monthlySubscriptionPrice"
                            name="monthlySubscriptionPrice"
                            value={courseFormik.values.monthlySubscriptionPrice}
                            onChange={courseFormik.handleChange}
                            required
                            error={
                              courseFormik.touched.monthlySubscriptionPrice &&
                              Boolean(
                                courseFormik.errors.monthlySubscriptionPrice
                              )
                            }
                            helperText={
                              courseFormik.touched.monthlySubscriptionPrice &&
                              courseFormik.errors.monthlySubscriptionPrice
                            }
                            fullWidth
                            label="Price (&euro;)"
                            type="number"
                            placeholder="49.99"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <Checkbox
                            size="small"
                            onChange={courseFormik.handleChange}
                            value={
                              courseFormik.values.yearlySubscriptionSelected
                            }
                            color="secondary"
                            name="yearlySubscriptionSelected"
                            id="yearlySubscriptionSelected"
                          />
                          <Typography
                            variant="body1"
                            style={{ display: "inline-block" }}
                          >
                            Yearly Subscription
                          </Typography>
                          <br />
                          <TextField
                            disabled={
                              !courseFormik.values.yearlySubscriptionSelected
                            }
                            id="yearlySubscriptionPrice"
                            name="yearlySubscriptionPrice"
                            value={courseFormik.values.yearlySubscriptionPrice}
                            onChange={courseFormik.handleChange}
                            required
                            error={
                              courseFormik.touched.yearlySubscriptionPrice &&
                              Boolean(
                                courseFormik.errors.yearlySubscriptionPrice
                              )
                            }
                            helperText={
                              courseFormik.touched.yearlySubscriptionPrice &&
                              courseFormik.errors.yearlySubscriptionPrice
                            }
                            fullWidth
                            label="Price (&euro;)"
                            type="number"
                            placeholder="329.99"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Course Sessions
                      </Typography>
                      <Typography variant="body2">
                        What time of the week are the session held ?
                      </Typography>
                      <hr className="mini-hr" />
                    </Grid>
                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>Weekly Schedule</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {courseSessions.map((row) => (
                            <Row
                              key={row.sessionDay}
                              row={row.sessionDay}
                              courseSessions={courseSessions}
                              setCourseSessions={setCourseSessions}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Grid item xs={12}>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Pictures
                      </Typography>
                      <Typography variant="body2">
                        Paste in the URLs of the pictures you want to use for
                        your course on the right, see their preview on the left.
                        Easy, right?
                      </Typography>
                      <hr className="mini-hr" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Lightbox states={courseImages} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        name="courseImages"
                        id="courseImages"
                        value={courseFormik.values.courseImages}
                        onChange={(e) => {
                          let urls = e.target.value.split("\n");
                          setCourseImages(urls);
                          courseFormik.handleChange(e);
                        }}
                        multiline
                        placeholder={`https://hypergym.com/images/course1.jpg\nhttps://hypergym.com/images/course2.jpg\n...`}
                        required
                        rows={20}
                        label="Picture URLs (one per line)"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    type="submit"
                    id="myForm"
                  >
                    Add course
                  </Button>
                </form>
              </Box>
            </Modal>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleOpenCourseModal}
            >
              {courses.length === 0 ? "Add a course" : "Add another course"}
            </Button>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Pictures
          </Typography>
          <Typography variant="body2">
            Paste in the URLs of the pictures you want to use on the right, see
            their preview on the left. Easy, right?
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item md={6} xs={12}>
          <Lightbox states={images} />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="gymImages"
            id="gymImages"
            value={gymFormik.values.gymImages}
            onChange={(e) => {
              let urls = e.target.value.split("\n");
              setImages(urls);
              gymFormik.handleChange(e);
            }}
            fullWidth
            multiline
            placeholder={`https://hypergym.com/images/gym.jpg\nhttps://hypergym.com/images/gym2.jpg\n...`}
            required
            rows={20}
            label="Picture URLs (one per line)"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Offerings
          </Typography>
          <Typography variant="body2">
            What else do you offer to your customers ?
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Amenities (one per line)"
            placeholder={`Sauna\nWheelchair Entrance\nFree Wi-Fi`}
            id="amenities"
            name="amenities"
            required
            value={gymFormik.values.amenities}
            onChange={gymFormik.handleChange}
            error={
              gymFormik.touched.amenities && Boolean(gymFormik.errors.amenities)
            }
            helperText={
              gymFormik.touched.amenities && gymFormik.errors.amenities
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <div>
            {options.map((item, index) => (
              <Grid
                item
                md={12}
                xs={12}
                key={index}
                style={{
                  borderRadius: "12px",
                  height: "100%",
                }}
              >
                <Paper
                  style={{
                    backgroundColor: "#999",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "1.5em",
                    margin: "1em",
                    position: "relative",
                  }}
                >
                  <div>
                    <DeleteIcon
                      color="action"
                      fontSize="small"
                      onClick={() => handleDeleteOption(item)}
                      style={{ position: "absolute", top: "5px", right: "5px" }}
                    />
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "bold",
                        float: "right",
                      }}
                    >
                      {item.price > 0 ? item.price + "€" : "free"}
                    </Typography>

                    <span style={{ fontWeight: "bold" }}>{item.name}</span>
                    <br />
                    <br />
                    <span>{item.description}</span>
                  </div>
                </Paper>
              </Grid>
            ))}
            <Modal open={openOptionModal} onClose={handleCloseOptionModal}>
              <Box sx={optionModalStyle}>
                <Grid
                  onSubmit={optionFormik.handleSubmit}
                  container
                  component="form"
                  spacing={3}
                  style={{
                    padding: "1em",
                    borderRadius: "20px",
                    backgroundColor: "#eee",
                  }}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ padding: 0, marginBottom: "16px" }}
                  >
                    <TextField
                      fullWidth
                      id="optionName"
                      name="optionName"
                      value={optionFormik.values.optionName}
                      onChange={optionFormik.handleChange}
                      required
                      label="Option Name"
                      placeholder="Equipment Rental"
                      error={
                        optionFormik.touched.optionName &&
                        Boolean(optionFormik.errors.optionName)
                      }
                      helperText={
                        optionFormik.touched.optionName &&
                        optionFormik.errors.optionName
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ padding: 0, marginBottom: "16px" }}
                  >
                    <TextField
                      fullWidth
                      id="optionDescription"
                      name="optionDescription"
                      value={optionFormik.values.optionDescription}
                      onChange={optionFormik.handleChange}
                      required
                      multiline={true}
                      rows={3}
                      label="Option Description"
                      placeholder="Rent yoga mats"
                      error={
                        optionFormik.touched.optionDescription &&
                        Boolean(optionFormik.errors.optionDescription)
                      }
                      helperText={
                        optionFormik.touched.optionDescription &&
                        optionFormik.errors.optionDescription
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ padding: 0, marginBottom: "16px" }}
                  >
                    <TextField
                      fullWidth
                      id="optionPrice"
                      name="optionPrice"
                      type="number"
                      value={optionFormik.values.optionPrice}
                      onChange={optionFormik.handleChange}
                      required
                      label="Option Price (&euro;)"
                      placeholder="19.99"
                      error={
                        optionFormik.touched.optionPrice &&
                        Boolean(optionFormik.errors.optionPrice)
                      }
                      helperText={
                        optionFormik.touched.optionPrice &&
                        optionFormik.errors.optionPrice
                      }
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    type="submit"
                  >
                    Add option
                  </Button>
                </Grid>
              </Box>
            </Modal>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleOpenOptionModal}
            >
              {options.length === 0 ? "Add an option" : "Add another option"}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "5em" }} />
        <Grid item md={9} xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            All Done.
          </Typography>
          <Typography variant="body2">
            By continuing, you confirm your agreement to our Terms of Service.
            The gym will be visible to the public immediately.
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="success" fullWidth type="submit">
        Create Your Gym
      </Button>
    </form>
  );
};

const Row = (props: {
  row: string;
  courseSessions: CourseSession[];
  setCourseSessions: (sessions: CourseSession[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const { row, courseSessions, setCourseSessions } = props;
  const [daySessions, setDaySessions] = useState<SessionDetails[]>(
    courseSessions[courseSessions.findIndex((el) => el.sessionDay === row)]
      .sessionDetails
  );

  const handleTimeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTime(event.target.value);
  };

  const handleInstructorInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInstructor(event.target.value);
  };

  const handleSessionInfoAdd = () => {
    if (instructor === "" || time === "") {
      return;
    }
    setDaySessions([
      ...daySessions,
      { sessionTime: time, sessionsInstructor: instructor },
    ]);

    var allSessions = courseSessions;
    allSessions[allSessions.findIndex((el) => el.sessionDay === row)] = {
      sessionDay: row,
      sessionDetails: [
        ...daySessions,
        { sessionTime: time, sessionsInstructor: instructor },
      ],
    };

    setCourseSessions(allSessions);
    setTime("");
    setInstructor("");
  };

  const handleSessionDetailsDelete = (session: SessionDetails) => {
    const updatedSessions = daySessions.filter(
      (item) => item.sessionTime !== session.sessionTime
    );
    setDaySessions(updatedSessions);

    var allSessions = courseSessions;
    allSessions[allSessions.findIndex((el) => el.sessionDay === row)] = {
      sessionDay: row,
      sessionDetails: updatedSessions,
    };

    setCourseSessions(allSessions);
  };

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Time</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Instructor
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {daySessions.length > 0 ? (
                    <>
                      {daySessions.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {item.sessionTime}
                          </TableCell>
                          <TableCell>{item.sessionsInstructor}</TableCell>
                          <TableCell>
                            <DeleteIcon
                              color="info"
                              fontSize="small"
                              sx={{
                                "&:hover": {
                                  color: "red",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={() => handleSessionDetailsDelete(item)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : null}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="11:30 - 14:00"
                        inputProps={{ "aria-label": "description" }}
                        onChange={handleTimeInput}
                        value={time}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Kevin Smith"
                        inputProps={{ "aria-label": "description" }}
                        onChange={handleInstructorInput}
                        value={instructor}
                      />
                    </TableCell>
                    <TableCell>
                      <AddCircleIcon
                        color="info"
                        fontSize="small"
                        sx={{
                          "&:hover": {
                            color: "green",
                            cursor: "pointer",
                          },
                        }}
                        onClick={handleSessionInfoAdd}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default CreateGym;
