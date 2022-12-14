import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import ApiCalls from "../../../api/apiCalls";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";

const theme = createTheme();
export default function ReviewButton(props: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(0);
  const [rating, setReview] = useState<any>(0); //to get the reviews/rating of a user for a particular gym/course.
  const [reviewAdded, setReviewAdded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [reviewValidation, setReviewValidation] = useState(false);
  let gymId = props.gymId;
  let courseId = props.courseId;
  let userId = props.userId;
  let Id;
  if (props.courseId === null) {
    Id = props.gymId;
  } else {
    Id = props.courseId;
    gymId = null;
  }

  //fetch existing reviews by the user
  try {
    ApiCalls.getReviewByUserId(userId, Id).then((res) => {
      setReview(res.data.response);
      setReviewAdded(true);
    });
  } catch (e) {
    //do nothing
  }

  const deleteReview = () => {
    let Id;
    if (props.courseId === null) {
      Id = props.gymId;
    } else {
      Id = props.courseId;
      gymId = null;
    }
    try {
      ApiCalls.deleteReviewByUserId(userId, Id).then((res) => {
        setReviewAdded(false);
      });
    } catch (e) {
      //do nothing
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //add the review by the user
    ApiCalls.addReview(
      data.get("userId"),
      data.get("username"),
      data.get("gymId"),
      data.get("courseId"),
      data.get("rating"),
      data.get("title"),
      data.get("description")
    );
    setOpen(false);
    setReviewAdded(true);
    setReview(data.get("rating"));
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {!reviewAdded && (
        <>
          <Button
            variant="outlined"
            style={{ fontWeight: "bold" }}
            color="info"
            onClick={handleClickOpen}
            startIcon={<RateReviewIcon color="info" />}
          >
            Write a review
          </Button>
        </>
      )}
      {reviewAdded && (
        <>
          <Typography
            component="legend"
            style={{ display: "inline-block", fontWeight: "bold" }}
          >
            You have rated this subscription:{" "}
          </Typography>
          <Rating name="read-only" value={rating} size="large" readOnly />
          <br />
          <Button
            variant="outlined"
            style={{ fontWeight: "bold" }}
            onClick={deleteReview}
            startIcon={<DeleteIcon color="error" />}
            color="error"
          >
            Delete Review
          </Button>
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please share your feedback about the subscription and help others!
          </DialogContentText>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Typography
                        component="legend"
                        style={{ display: "inline-block", fontWeight: "bold" }}
                      >
                        Rate this:{" "}
                      </Typography>
                      <Rating
                        name="rating"
                        size="large"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Box>
                    <input
                      value={props.userId}
                      name="userId"
                      id="userId"
                      hidden
                    />
                    <input
                      value={props.username}
                      name="username"
                      id="username"
                      hidden
                    />
                    <input
                      value={gymId || null}
                      name="gymId"
                      id="gymId"
                      hidden
                    />
                    <input
                      value={props.courseId || null}
                      name="courseId"
                      id="courseId"
                      hidden
                    />
                    <input
                      value={value || 3}
                      name="rating"
                      id="rating"
                      hidden
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      name="title"
                      label="Title"
                      type="text"
                      variant="standard"
                      error={title === "" ? true : false}
                      helperText={title === "" ? "Please enter a title" : null}
                      onChange={handleTitleChange}
                      value={title}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="description"
                      name="description"
                      label="Description"
                      type="text"
                      fullWidth
                      variant="filled"
                      multiline
                      rows={4}
                      error={description === "" ? true : false}
                      helperText={
                        description === ""
                          ? "Please share your experience"
                          : null
                      }
                      onChange={handleDescriptionChange}
                      value={description}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
