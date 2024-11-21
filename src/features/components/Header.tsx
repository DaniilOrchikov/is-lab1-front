import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,
} from "@mui/material";
import {logout, setAdmin, setInAdminQueue} from "../slices/userSlice";
import store, {RootState} from "../../store";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import FunctionsManager from "./functions/FunctionsManager";
import {adminApplicationStatus, adminRequest} from "../api/userApi";
import {addPopup} from "../slices/popupSlice";
import {PopupTypes} from "../../types";

const pages = ['tables', 'map'];

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

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

                        <FunctionsManager/>
                    </Box>
                    <Box sx={{flexGrow: 0, display: "flex"}}>
                        {user.admin && (
                            <Button
                                sx={{my: 2, color: 'white'}}
                                onClick={() => navigate("/admin")}
                            >
                                Admin Requests
                            </Button>
                        )}
                        {!user.inAdminQueue && !user.admin && (
                            <Button
                                sx={{my: 2, color: 'white'}}
                                onClick={() => {
                                    adminRequest().then((status) => {
                                        if (status === 201) {
                                            dispatch(setAdmin(true))
                                            dispatch(addPopup({message: `You are the administrator`, duration: 10000, type: PopupTypes.INFO}))
                                        } else if (status === 200) {
                                            dispatch(setInAdminQueue(true))
                                            dispatch(addPopup({message: `Your application has been submitted`, duration: 10000, type: PopupTypes.SUCCESS}))
                                        }
                                    })
                                }}
                            >
                                Become an administrator
                            </Button>
                        )}
                        <Button
                            sx={{my: 2, color: 'white'}}
                            onClick={() => dispatch(logout())}
                        >
                            {user.name} Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;