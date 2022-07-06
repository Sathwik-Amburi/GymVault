import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReviewForm from "./ReviewForm";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function ReviewButton(props: any) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<number | null>(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () =>{
        setOpen(false)
    }

    return (
        <div>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend">Rate this Subscription!</Typography>
                <Rating
                    name="rating"
                    size = "large"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
            <Button variant="contained" onClick={handleClickOpen}>
                Write a Review!
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please share your feedback about the subscription and help others!
                    </DialogContentText>
                    <ReviewForm userId = {props.userId} gymId = {props.gymId} courseId = {props.courseId}  username = {props.username} rating = {value} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
