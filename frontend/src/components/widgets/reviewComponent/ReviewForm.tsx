import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApiCalls from "../../../api/apiCalls";
import {useNavigate} from "react-router";

const theme = createTheme();

export default function ReviewForm(props:any) {
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get('title'),
            description: data.get('description'),
        });
        ApiCalls.addReview(
            data.get("userId"),
            data.get("username"),
            data.get("gymId"),
            data.get("rating"),
            data.get("title"),
            data.get("description")
        )
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid>
                            <input
                                value = {props.userId}
                                name = 'userId'
                                id = 'userId'
                                hidden
                            />
                            <input
                                value = {props.username}
                                name = 'username'
                                id = 'username'
                                hidden
                                />
                            <input
                                value = {props.gymId}
                                name = 'gymId'
                                id = 'gymId'
                                hidden
                            />
                            {/*<input*/}
                            {/*    value = {props.courseId || null}*/}
                            {/*    name = "courseId"*/}
                            {/*    id = "courseId"*/}
                            {/*    hidden*/}
                            {/*/>*/}
                            <input
                                value = {props.rating || 3}
                                name = 'rating'
                                id = 'rating'
                                hidden
                                />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                name = "title"
                                label="Title"
                                type="text"
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                name = "description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="filled"
                                multiline
                                rows={4}
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
    );
}