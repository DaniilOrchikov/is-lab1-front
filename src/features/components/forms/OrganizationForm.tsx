import React, {useState} from 'react'
import store, {RootState, useAppDispatch} from "../../../store";
import {Organization, OrganizationType, PopupTypes} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle, Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    createOrganizationThunk,
    deleteOrganizationByIdThunk, fetchOrganizationsThunk,
    updateOrganizationThunk
} from "../../slices/organizationSlice";
import {useSelector} from "react-redux";
import {
    setOrganizationFormOpen,
    resetOrganizationForm,
    setOrganizationFormValueAddressId,
    setOrganizationFormValueType,
    setOrganizationFormValueFullName,
    setOrganizationFormValueRating,
    setOrganizationFormValueAnnualTurnover,
} from "../../slices/formSlices/organizationFormSlice";
import {addPopup} from "../../slices/popupSlice";
import CreateAddressButton from "../buttons/CreateAddressButton";
import SelectField from "./SelectField";


const OrganizationForm = () => {
    const organizationForm = useSelector((state: RootState) => state.organizationForm);
    const dispatch = useAppDispatch();
    const organizations = useSelector((state: RootState) => state.organizations);
    const addresses = useSelector((state: RootState) => state.addresses);
    const [nameErrorMessage, setNameErrorMessage] = useState("")
    const user = useSelector((state: RootState) => state.user);

    const handleClose = () => {
        dispatch(setOrganizationFormOpen(false));
        dispatch(resetOrganizationForm())
        dispatch(setOrganizationFormValueAddressId(null))
        setNameErrorMessage("")
    };

    const handleAddOrganization = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(fetchOrganizationsThunk())

        if (organizationForm.valueFullName !== "" && organizations.filter(org => org.fullName === organizationForm.valueFullName).length > (organizationForm.type === 'create' ? 0 : 1)) {
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
                addressId: organizationForm.valueAddressId,
                annualTurnover: organizationForm.valueAnnualTurnover,
                employeesCount: organizationForm.valueEmployeesCount,
                fullName: organizationForm.valueFullName,
                rating: organizationForm.valueRating,
                type: organizationForm.valueType,
                creatorName: organizationForm.creatorName
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
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">
                        You cannot modify an object because you are not its creator.
                    </Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleAddOrganization}>
                        <Box className="block">
                            <TextField name="fullName" label="Full Name" variant="standard"
                                       onChange={(event) => {
                                           setNameErrorMessage("")
                                           dispatch(setOrganizationFormValueFullName(event.target.value))
                                       }}
                                       value={organizationForm.valueFullName}
                                       disabled={!organizationForm.canUpdateObject}/>
                        </Box>
                        <Box className="block">
                            <Typography sx={{color: "red", height: "1em"}}
                                        variant="caption">{nameErrorMessage}</Typography>
                        </Box>
                        <Box className="block">

                            <TextField name="rating" label="Rating" variant="standard"
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setOrganizationFormValueRating(parseInt(event.target.value)))
                                           } else {
                                               dispatch(setOrganizationFormValueRating(null))
                                           }
                                       }}
                                       sx={{marginTop: "5%"}}
                                       type={'number'}
                                       defaultValue={organizationForm.valueRating}
                                       required
                                       InputProps={{inputProps: {min: 1}}}
                                       disabled={!organizationForm.canUpdateObject}/>

                            <TextField name="annualTurnover" label="Annual Turnover" variant="standard"
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setOrganizationFormValueAnnualTurnover(parseInt(event.target.value)))
                                           } else {
                                               dispatch(setOrganizationFormValueAnnualTurnover(null))
                                           }
                                       }}
                                       sx={{marginTop: "5%"}}
                                       type={'number'}
                                       required
                                       defaultValue={organizationForm.valueAnnualTurnover}
                                       InputProps={{inputProps: {min: 1}}}
                                       disabled={!organizationForm.canUpdateObject}/>
                        </Box>
                        <Box className="block" sx={{marginTop:"4%"}}>
                            <SelectField label="Type"
                                         value={organizationForm.valueType}
                                         changeHandler={(event) => dispatch(setOrganizationFormValueType(event.target.value as OrganizationType))}
                                         options={Object.values(OrganizationType).map(type => ({
                                             label: type,
                                             value: type
                                         }))}
                                         disabled={!organizationForm.canUpdateObject}
                                         className="select-enum"/>
                        </Box>
                        <Box className="block-column">
                            {organizationForm.canUpdateObject ? <CreateAddressButton sx={{width: "40%"}}/> : ""}
                            <Box sx={{minWidth: "40%", marginTop: "4%"}}>
                                <SelectField label="Address"
                                             value={organizationForm.valueAddressId || ''}
                                             changeHandler={(event) => dispatch(setOrganizationFormValueAddressId(parseInt(event.target.value as string)))}
                                             options={addresses.filter((address) => address.creatorName === user.name || address.id === organizationForm.valueAddressId || (user.admin && address.creatorName === organizationForm.creatorName)).map(address => ({
                                                 label: `${address.street}, zipCode: ${address.zipCode}`,
                                                 value: address.id
                                             }))}
                                             disabled={!organizationForm.canUpdateObject}/>
                            </Box>
                        </Box>
                        <Box className="buttons">
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