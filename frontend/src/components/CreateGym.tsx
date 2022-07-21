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
  Select,
  Typography,
} from "@mui/material";
import Lightbox from "./widgets/Lightbox";
import { allCities } from "../config/cities";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export default function CreateGym() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup.number().required("Phone number is required"),
    address: yup.string().required("Address is required"),
    description: yup.string().required("Description is required"),
    amenities: yup.string().required("Amenities are required"),
    optionName: yup.string().required("Option name is required"),
    optionDescription: yup.string().required("Option description is required"),
    optionPrice: yup.number().required("Option price is required"),
  });

  const validationSchema2 = yup.object({
    optionName: yup.string().required("Option name is required"),
    optionDescription: yup.string().required("Option description is required"),
    optionPrice: yup.number().required("Option price is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      description: "",
      amenities: "",
    },
    validationSchema: validationSchema,
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
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  let [images, setImages] = React.useState<string[]>([
    "https://thecatapi.com/api/images/get?format=src&type=png",
    "https://thecatapi.com/api/images/get?format=src&type=png&2",
    "https://thecatapi.com/api/images/get?format=src&type=png&3",
  ]);

  return (
    <form onSubmit={formik.handleSubmit}>
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
            value={formik.values.name}
            onChange={formik.handleChange}
            required
            label="Name"
            placeholder="HyperGym"
            inputProps={{ style: { fontWeight: "bold" } }}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            value={formik.values.description}
            onChange={formik.handleChange}
            inputProps={{ style: { fontWeight: "bold" } }}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
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
            value={formik.values.address}
            onChange={formik.handleChange}
            inputProps={{ style: { fontWeight: "bold" } }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Select
            fullWidth
            required
            label="City"
            id="city"
            name="city"
            onChange={formik.handleChange}
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
            value={formik.values.phone}
            onChange={formik.handleChange}
            required
            inputProps={{ style: { fontWeight: "bold" } }}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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
        <Grid item xs={12} style={{ padding: "15em" }}>
          TODO courses UI - come up with something
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
            value={formik.values.amenities}
            onChange={formik.handleChange}
            error={formik.touched.amenities && Boolean(formik.errors.amenities)}
            helperText={formik.touched.amenities && formik.errors.amenities}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <div>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleOpen}
            >
              Add an option
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
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
