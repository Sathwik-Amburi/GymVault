import { Snackbar } from "@mui/material";
import { FC, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setErrorAlert } from "../store/slices/errorAlertSlice";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorAlert: FC = () => {
  const dispatch = useDispatch();
  const { showError, errorMessage } = useSelector(
    (state: RootState) => state.errorAlert
  );

  const handleClose = () => {
    dispatch(setErrorAlert({ showError: false, errorMessage: "" }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showError}
      onClose={handleClose}
      message={errorMessage}
      key={errorMessage}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
