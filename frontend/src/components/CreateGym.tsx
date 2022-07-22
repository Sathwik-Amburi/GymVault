import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Lightbox from "./widgets/Lightbox";
import { allCities } from "../config/cities";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubscriptionOffers, CourseSession } from "../models/allModels";

interface NewCourseState {
  name: string;
  gymId: string;
  description: string;
  images?: string[];
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

export default function CreateGym() {
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const handleOpenOptionModal = () => setOpenOptionModal(true);
  const handleCloseOptionModal = () => setOpenOptionModal(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const handleOpenCourseModal = () => setOpenCourseModal(true);
  const handleCloseCourseModal = () => setOpenCourseModal(false);
  const [options, setOptions] = useState<NewOptionState[]>([]);
  const [courses, setCourses] = useState<NewCourseState[]>([]);

  const gymValidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup.number().required("Phone number is required"),
    address: yup.string().required("Address is required"),
    description: yup.string().required("Description is required"),
    amenities: yup.string().required("Amenities are required"),
    optionName: yup.string().required("Option name is required"),
    optionDescription: yup.string().required("Option description is required"),
    optionPrice: yup.number().required("Option price is required"),
  });

  const courseValidationSchema = yup.object({
    courseName: yup.string().required("Course name is required"),
    courseDescription: yup.string().required("Course description is required"),
    coursePrice: yup.number().required("Course price is required"),
    courseSessionTicketSelected: yup.boolean(),
    courseSessionTicketPrice: yup.number(),
    monthlySubscriptionSelected: yup.boolean(),
    monthlySubscriptionPrice: yup.number(),
    yearlySubscriptionSelected: yup.boolean(),
    yearlySubscriptionPrice: yup.number(),
  });

  const optionValidationSchema = yup.object({
    optionName: yup.string().required("Option name is required"),
    optionDescription: yup.string().required("Option description is required"),
    optionPrice: yup.number().required("Option price is required"),
  });

  const gymFormik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      description: "",
      amenities: "",
    },
    validationSchema: gymValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const optionFormik = useFormik({
    initialValues: {
      optionName: "",
      optionDescription: "",
      optionPrice: 0,
    },
    validationSchema: optionValidationSchema,
    onSubmit: (values) => {
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
    },
    validationSchema: courseValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // const newCourse: NewCourseState = {
      //   name: values.courseName,
      //   description: values.courseDescription,
      //   // price: values.coursePrice,
      // };
      // setCourses([...courses, newCourse]);
      // setOpenCourseModal(false);
      // optionFormik.resetForm();
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

  let [images, setImages] = React.useState<string[]>([
    "https://thecatapi.com/api/images/get?format=src&type=png",
    "https://thecatapi.com/api/images/get?format=src&type=png&2",
    "https://thecatapi.com/api/images/get?format=src&type=png&3",
  ]);

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
            fullWidth
            label="Website"
            type="url"
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
          <Typography variant="body2">Where we'll find you</Typography>
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
            How customers, and the GymVault staff, can reach you
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            defaultValue={"the one you're signed up with lol"}
            disabled
            required
          />
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
            What kind of entry tickets your customers can buy. All are optional
          </Typography>
          <hr className="mini-hr" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Checkbox size="small" color="secondary" />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Daily Ticket
              </Typography>
              <br />
              <TextField
                fullWidth
                label="Price (EUR)"
                type="number"
                placeholder="6.69"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Checkbox size="small" color="secondary" />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Monthly Subscription
              </Typography>
              <br />
              <TextField
                fullWidth
                label="Price (EUR)"
                type="number"
                placeholder="69.69"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Checkbox size="small" color="secondary" />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Yearly Subscription
              </Typography>
              <br />
              <TextField
                fullWidth
                label="Price (EUR)"
                type="number"
                placeholder="699.69"
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
                    {/* <Typography
                      variant="h6"
                      style={{
                        fontWeight: "bold",
                        float: "right",
                      }}
                    >
                      {item.price > 0 ? item.price + "€" : "free"}
                    </Typography> */}

                    <span style={{ fontWeight: "bold" }}>{item.name}</span>
                    <br />
                    <br />
                    <span>{item.description}</span>
                  </div>
                </Paper>
              </Grid>
            ))}
            <Modal open={openCourseModal} onClose={handleCloseCourseModal}>
              <Box sx={courseModalStyle}>
                <Grid
                  onSubmit={courseFormik.handleSubmit}
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
                          label="Price (EUR)"
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
                          label="Price (EUR)"
                          type="number"
                          placeholder="49.99"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Checkbox
                          size="small"
                          onChange={courseFormik.handleChange}
                          value={courseFormik.values.yearlySubscriptionSelected}
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
                            Boolean(courseFormik.errors.yearlySubscriptionPrice)
                          }
                          helperText={
                            courseFormik.touched.yearlySubscriptionPrice &&
                            courseFormik.errors.yearlySubscriptionPrice
                          }
                          fullWidth
                          label="Price (EUR)"
                          type="number"
                          placeholder="329.99"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    type="submit"
                    onClick={()=>{console.log(courseFormik.values)}}
                  >
                    Add course
                  </Button>
                </Grid>
              </Box>
            </Modal>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleOpenCourseModal}
            >
              {options.length === 0 ? "Add a course" : "Add another course"}
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
            fullWidth
            multiline
            placeholder={`https://hypergym.com/images/gym.jpg\nhttps://hypergym.com/images/gym2.jpg\n...`}
            required
            rows={20}
            label="Picture URLs (one per line)"
            onChange={(e) => {
              let urls = e.target.value.split("\n");
              setImages(urls);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Offerings
          </Typography>
          <Typography variant="body2">
            What else you offer to your customers
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
                      label="Option Price (EUR)"
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
}
