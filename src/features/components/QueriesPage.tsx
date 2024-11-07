import React, {useEffect} from 'react';
import WorkersTable from "./WorkersTable";
import {Box, Tab, Tabs} from "@mui/material";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import PopupManager from "./PopupManager";
import CoordinatesTable from "./CoordinatesTable";
import CustomTabPanel from "./CustomTabPanel";
import {RootState, useAppDispatch} from "../../store";
import {fetchCoordinatesThunk} from "../slices/coordinatesSlice";
import {fetchWorkersThunk} from "../slices/workersSlice";
import {configureApiWithAuth} from "../api/api";
import {useSelector} from "react-redux";

const QueriesPage = () => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        configureApiWithAuth(user.name, user.password);
    }, [user]);

    useEffect(() => {
        const fetchCoordinates = () => {
            dispatch(fetchCoordinatesThunk());
        };

        const intervalId = setInterval(fetchCoordinates, 1000);

        fetchCoordinates();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    useEffect(() => {
        const fetchWorkers = () => {
            dispatch(fetchWorkersThunk());
        };

        const intervalId = setInterval(fetchWorkers, 1000);

        fetchWorkers();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    return (
        <Box>
            <PopupManager></PopupManager>
            <Header></Header>
        </Box>
    )
}
export default QueriesPage