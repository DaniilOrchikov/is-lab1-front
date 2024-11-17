import React, {useRef, useState} from "react";
import {useAppDispatch} from "../../../store";
import {Md5} from "ts-md5";
import axios from "axios";
import {auth, logout, setAdmin} from "../../slices/userSlice";
import {useNavigate} from "react-router-dom";
import {Container, TextField, Button, Typography, Box, Grid, Checkbox, FormControlLabel} from '@mui/material';

const AuthorizationPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [adminChecked, setAdminChecked] = useState(false);
    const errorMessageRef = useRef<HTMLParagraphElement>(null);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;

        if (password.length < 8) {
            if (errorMessageRef.current) {
                errorMessageRef.current.textContent = "Password must be at least 8 characters long.";
            }
            return;
        }

        const hashedPassword = Md5.hashStr(password);

        const api = axios.create({
            baseURL: 'http://127.0.0.1:5000',
            headers: {
                'Authorization': `Basic ${btoa(name + ':' + hashedPassword)}`,
                'Content-Type': 'application/json',
            },
        });

        api.post(registered ? '/signin' : '/login')
            .then(async (response) => {
                if (errorMessageRef.current) errorMessageRef.current.textContent = '';
                dispatch(auth({name, password}));
                if (response.data.admin) {
                    dispatch(setAdmin(true))
                    alert("You are an administrator")
                } else if (adminChecked) {
                    api.post('/admin_queue').then(async (response) => {
                        if (response.status === 200) {
                            dispatch(setAdmin(true))
                            alert("You are an administrator")
                        } else {
                            alert(response.data)
                        }
                    })
                }
                navigate('/tables');
            }).catch((error) => {
            dispatch(logout());
            try {
                if (errorMessageRef.current) errorMessageRef.current.textContent = error.response.data.message as string;
            } catch (e) {
                if (errorMessageRef.current) errorMessageRef.current.textContent = "Sorry, server error, try again"
            }
        });
    }

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminChecked(event.target.checked)
    }

    return (
        <Container maxWidth="xs" style={{marginTop: '200px'}}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h5" component="h1" gutterBottom>
                    {registered ? "Sign In" : "Create Account"}
                </Typography>
            </Box>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            name="password"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox onChange={handleCheckbox}/>}
                                          label="Apply to become an administrator"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            {registered ? "Enter" : "Create User"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Box mt={2} textAlign="center">
                <Typography color="error" ref={errorMessageRef}></Typography>
            </Box>
            <Box mt={2} textAlign="center">
                <Button onClick={() => {
                    setRegistered(!registered)
                    errorMessageRef.current!.textContent = ''
                }} color="secondary">
                    {registered ? "Do you want to create a new account? Log in" : "Already registered? Sign in"}
                </Button>
            </Box>
        </Container>
    );
}

export default AuthorizationPage;