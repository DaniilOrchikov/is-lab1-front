import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,
} from "@mui/material";
import { logout } from "../slices/userSlice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FunctionsManager from "./functions/FunctionsManager";

const pages = ['tables'];

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate(`/${page}`)}
                            >
                                {page}
                            </Button>
                        ))}

                        {/* Вставляем новый компонент FunctionsManager */}
                        <FunctionsManager />
                    </Box>
                    <Box sx={{ flexGrow: 0, display: "flex" }}>
                        {user.admin && (
                            <Button
                                sx={{ my: 2, color: 'white' }}
                                onClick={() => navigate("/admin")}
                            >
                                Admin Requests
                            </Button>
                        )}
                        <Button
                            sx={{ my: 2, color: 'white' }}
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