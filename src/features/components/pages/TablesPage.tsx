import React from 'react';
import WorkersTable from "../tables/WorkersTable";
import {Box, InputLabel, Tab, Tabs} from "@mui/material";
import Paper from "@mui/material/Paper";
import Header from "../Header";
import CoordinatesTable from "../tables/CoordinatesTable";
import CustomTabPanel from "../CustomTabPanel";
import OrganizationsTable from "../tables/OrganizationsTable";
import CoordinatesForm from "../forms/CoordinatesForm";
import OrganizationForm from "../forms/OrganizationForm";
import PersonsTable from "../tables/PersonsTable";
import PersonForm from "../forms/PersonForm";
import AddressesTable from "../tables/AddressesTable";
import AddressForm from "../forms/AddressForm";
import LocationForm from "../forms/LocationForm";
import LocationTable from "../tables/LocationTable";
import WorkerForm from "../forms/WorkerForm";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setWorkerFormValueName} from "../../slices/formSlices/workerFormSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TablesPage = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const workers = useSelector((state: RootState) => state.workers);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Box>
            <Header/>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Worker" {...a11yProps(0)} />
                        <Tab label="Coordinates" {...a11yProps(1)} />
                        <Tab label="Organizations" {...a11yProps(2)} />
                        <Tab label="People" {...a11yProps(3)} />
                        <Tab label="Addresses" {...a11yProps(4)} />
                        <Tab label="Locations" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    <Box sx={{minWidth: 750, display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%'}}>
                            <WorkersTable workers={workers}></WorkersTable>
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
                    <Box sx={{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                            <OrganizationsTable></OrganizationsTable>
                        </Paper>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    <Box sx={{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                            <PersonsTable></PersonsTable>
                        </Paper>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={4}>
                    <Box sx={{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                            <AddressesTable></AddressesTable>
                        </Paper>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={5}>
                    <Box sx={{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                        <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                            <LocationTable></LocationTable>
                        </Paper>
                    </Box>
                </CustomTabPanel>
            </Box>
            <WorkerForm/>
            <CoordinatesForm/>
            <OrganizationForm/>
            <PersonForm/>
            <AddressForm/>
            <LocationForm/>
        </Box>
    )
}
export default TablesPage