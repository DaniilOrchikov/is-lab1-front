import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import React from "react";
import {logout} from "../slices/userSlice";
import {RootState, useAppDispatch} from "../../store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const pages = ['tables'];

function MenuIcon() {
    return null;
}

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user)

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{my: 2, color: 'white', display: 'block'}}
                                onClick={() => navigate(`/${page}`)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0, display: "flex"}}>
                        {user.admin ?
                            <Button
                                sx={{my: 2, color: 'white'}}
                                onClick={() => {
                                    navigate("/admin")
                                }}
                            >
                                Admin Requests
                            </Button>
                            : ""}
                        <Button
                            sx={{my: 2, color: 'white'}}
                            onClick={() => {
                                dispatch(logout())
                            }}
                        >
                            {user.name} Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;