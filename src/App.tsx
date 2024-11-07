import React, {ReactNode, useEffect} from 'react';
import './App.css';
import WorkersTable from "./features/components/WorkersTable";
import {useAppDispatch} from "./store";
import {fetchWorkersThunk} from "./features/slices/workersSlice";
import {fetchCoordinatesThunk} from "./features/slices/coordinatesSlice";
import {Box, Tab, Tabs} from "@mui/material";
import Paper from "@mui/material/Paper";
import Header from "./features/components/Header";
import PopupManager from "./features/components/PopupManager";
import CoordinatesTable from "./features/components/CoordinatesTable";
import CustomTabPanel from "./features/components/CustomTabPanel";

function MenuIcon() {
    return null;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const dispatch = useAppDispatch();
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

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <PopupManager></PopupManager>
            <Header></Header>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Worker" {...a11yProps(0)} />
                        <Tab label="Coordinates" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    <Box sx={{minWidth: 750, display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%'}}>
                            <WorkersTable></WorkersTable>
                        </Paper>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <Box sx={{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                            <CoordinatesTable></CoordinatesTable>
                        </Paper>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    Item Three
                </CustomTabPanel>
            </Box>
        </Box>
    );
}

export default App;
