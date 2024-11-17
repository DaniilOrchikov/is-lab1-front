import React, {useEffect, useState} from 'react'
import store, {RootState, useAppDispatch} from "../../../store";
import {Organization, OrganizationType, PopupTypes, Status} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    createOrganizationThunk,
    deleteOrganizationByIdThunk, fetchOrganizationsThunk,
    updateOrganizationThunk
} from "../../slices/organizationSlice";
import {useSelector} from "react-redux";
import {
    setOrganizationFormOpen, resetOrganizationForm
} from "../../slices/formSlices/organizationFormSlice";
import FormControl from "@mui/material/FormControl";
import {addPopup} from "../../slices/popupSlice";


const OrganizationForm = () => {
    const organizationForm = useSelector((state: RootState) => state.organizationForm);
    const dispatch = useAppDispatch();
    const [addressId, setAddressId] = useState("");
    const [type, setType] = useState(OrganizationType.COMMERCIAL);
    const organizations = useSelector((state: RootState) => state.organizations);
    const [nameErrorMessage, setNameErrorMessage] = useState("")
    const user = useSelector((state: RootState) => state.user);


    const handleAddressChange = (event: SelectChangeEvent) => {
        setAddressId(event.target.value);
    };


    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as OrganizationType);
    };

    const handleClose = () => {
        dispatch(setOrganizationFormOpen(false));
        dispatch(resetOrganizationForm())
    };

    const handleAddOrganization = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const annualTurnover = parseInt(formData.get("annualTurnover") as string);
        const employeesCount = parseInt(formData.get("employeesCount") as string);
        const rating = parseInt(formData.get("rating") as string);
        const fullName = formData.get("fullName") as string;
        dispatch(fetchOrganizationsThunk())

        if (organizations.filter(org => org.fullName === fullName).length > (organizationForm.type === 'create' ? 0 : 1)) {
            store.dispatch(addPopup({
                message: `Organization with that name exists`,
                duration: 5000,
                type: PopupTypes.ERROR
            }))
            setNameErrorMessage("Organization with that name exists")
            return
        } else {
            let organization: Organization = {
                id: organizationForm.currentOrganizationId,
                addressId: parseInt(addressId),
                annualTurnover: annualTurnover,
                employeesCount: employeesCount,
                fullName: fullName,
                rating: rating,
                type: type,
                creatorName: user.name
            } as Organization;
            if (organizationForm.type === 'update') {
                dispatch(updateOrganizationThunk(organization));
            } else {
                dispatch(createOrganizationThunk(organization));
            }
        }
        dispatch(resetOrganizationForm());
        handleClose()
    }

    const handleDeleteOrganization = () => {
        dispatch(deleteOrganizationByIdThunk(organizationForm.currentOrganizationId))
        dispatch(resetOrganizationForm())
        handleClose()
    }

    useEffect(() => {
        if (organizationForm.valueType !== null) {
            setType(organizationForm.valueType);
        }
    }, [organizationForm.valueType]);
    useEffect(() => {
        if (organizationForm.valueAddressId !== null) {
            setAddressId(organizationForm.valueAddressId.toString())
        }
    }, [organizationForm.valueAddressId]);

    return (
        <Box>
            <Dialog
                open={organizationForm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {organizationForm.type === 'update' ? "Update " : "Create "} Organization
                </DialogTitle>
                {!organizationForm.canUpdateObject ?
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">You cannot modify an object because you
                        are not
                        its creator.</Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleAddOrganization}>
                        <Box>
                            <Box>
                                <TextField name="fullName" label="Full Name" variant="standard"
                                           onChange={() => {
                                               setNameErrorMessage("")
                                           }}
                                           required
                                           defaultValue={organizationForm.valueFullName !== null ? organizationForm.valueFullName : ''}
                                           disabled={!organizationForm.canUpdateObject}/>
                            </Box>
                            <Typography sx={{color: "red"}} variant="caption">{nameErrorMessage}</Typography>
                            <Box>

                                <TextField name="rating" label="Rating" variant="standard"
                                           sx={{marginTop: "5%"}}
                                           type={'number'}
                                           defaultValue={organizationForm.valueRating !== null ? organizationForm.valueRating : ''}
                                           required
                                           InputProps={{inputProps: {min: 1}}}
                                           disabled={!organizationForm.canUpdateObject}/>
                            </Box>
                            <Box>

                                <TextField name="annualTurnover" label="Annual Turnover" variant="standard"
                                           sx={{marginTop: "5%"}}
                                           type={'number'}
                                           required
                                           defaultValue={organizationForm.valueAnnualTurnover !== null ? organizationForm.valueAnnualTurnover : ''}
                                           InputProps={{inputProps: {min: 1}}}
                                           disabled={!organizationForm.canUpdateObject}/>
                            </Box>
                            <Box>

                                <TextField name="employeesCount" label="Employees Count" variant="standard"
                                           sx={{marginTop: "5%"}}
                                           type={'number'}
                                           required
                                           defaultValue={organizationForm.valueEmployeesCount !== null ? organizationForm.valueEmployeesCount : ''}
                                           InputProps={{inputProps: {min: 1}}}
                                           disabled={!organizationForm.canUpdateObject}/>
                            </Box>

                            <FormControl variant="outlined" fullWidth sx={{width: 300, marginTop: "8%"}}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    id="type-select"
                                    value={type}
                                    onChange={handleTypeChange}
                                    label="Status"
                                    disabled={!organizationForm.canUpdateObject}
                                >
                                    {Object.entries(OrganizationType).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/*<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                            {/*    <Button variant="contained" onClick={() => {*/}
                            {/*        dispatch(setAddressFormOpen(true))*/}
                            {/*        dispatch(setAddressFormType('create'))*/}
                            {/*    }}>*/}
                            {/*        Create Address*/}
                            {/*    </Button>*/}
                            {/*    <FormControl>*/}
                            {/*        <InputLabel>Address</InputLabel>*/}
                            {/*        <Select*/}
                            {/*            id="select-address"*/}
                            {/*            label="Address"*/}
                            {/*            onChange={handleAddressChange}*/}
                            {/*            required*/}
                            {/*            value={addressId}*/}
                            {/*            sx={{width: 150}}*/}
                            {/*        >*/}
                            {/*            {addressList.map((address) =>*/}
                            {/*                <MenuItem key={address.id}*/}
                            {/*                          value={address.id}>({address.x}; {address.y})</MenuItem>)*/}
                            {/*            }*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*</Box>*/}
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                            {organizationForm.type === 'update' && organizationForm.canUpdateObject ?
                                (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                         onClick={handleDeleteOrganization}>Delete</Button>) : ""}
                            {organizationForm.canUpdateObject ?
                                <Button variant="contained" type="submit"
                                        sx={{marginRight: '2%'}}>{organizationForm.type === 'update' ? "Update " : "Create "}</Button>
                                : ""}
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default OrganizationForm;