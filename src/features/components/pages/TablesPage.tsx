import React from 'react';
import WorkersTable from "../tables/WorkersTable";
import {Box, Tab, Tabs} from "@mui/material";
import Paper from "@mui/material/Paper";
import Header from "../Header";
import PopupManager from "../PopupManager";
import CoordinatesTable from "../tables/CoordinatesTable";
import CustomTabPanel from "../CustomTabPanel";
import OrganizationsTable from "../tables/OrganizationsTable";
import CoordinatesForm from "../forms/CoordinatesForm";
import OrganizationForm from "../forms/OrganizationForm";
import PersonsTable from "../tables/PersonsTable";
import PersonForm from "../forms/PersonForm";
import AddressesTable from "../tables/AddressesTable";
import AddressForm from "../forms/AddressForm";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TablesPage =()=>{
    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return(
        <Box>
            <PopupManager></PopupManager>
            <Header></Header>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Worker" {...a11yProps(0)} />
                        <Tab label="Coordinates" {...a11yProps(1)} />
                        <Tab label="Organizations" {...a11yProps(2)} />
                        <Tab label="People" {...a11yProps(3)} />
                        <Tab label="Addresses" {...a11yProps(4)} />
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
            </Box>
            <CoordinatesForm></CoordinatesForm>
            <OrganizationForm></OrganizationForm>
            <PersonForm></PersonForm>
            <AddressForm></AddressForm>
        </Box>
    )
}
export default TablesPage