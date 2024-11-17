import React from 'react';
import { useAppDispatch, RootState } from "../../../store";
import { Address } from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    createAddressThunk,
    deleteAddressByIdThunk,
    updateAddressThunk,
} from "../../slices/addressSlice";
import { useSelector } from "react-redux";
import {resetAddressForm, setAddressFormOpen} from "../../slices/formSlices/addressFormSlice";

const AddressForm = () => {
    const dispatch = useAppDispatch();

    // Воспользуйтесь селекторами для извлечения данных формы и состояния
    const addressForm = useSelector((state: RootState) => state.addressForm);
    const user = useSelector((state: RootState) => state.user);

    const handleClose = () => {
        dispatch(setAddressFormOpen(false));
        dispatch(resetAddressForm());
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const street = formData.get("street") as string;
        const zipCode = formData.get("zipCode") as string;

        let address: Address = {
            id: addressForm.currentAddressId,
            street: street,
            zipCode: zipCode,
            creatorName: user.name
        };

        if (addressForm.type === 'update') {
            dispatch(updateAddressThunk(address));
        } else {
            dispatch(createAddressThunk(address));
        }

        dispatch(resetAddressForm());
        handleClose();
    };

    const handleDelete = () => {
        dispatch(deleteAddressByIdThunk(addressForm.currentAddressId));
        dispatch(resetAddressForm());
        handleClose();
    };

    return (
        <Box>
            <Dialog
                open={addressForm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {addressForm.type === 'update' ? "Update " : "Create "} Address
                </DialogTitle>
                {!addressForm.canUpdateObject ?
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">
                        You cannot modify this object because you are not its creator.
                    </Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <TextField name="street" label="Street" variant="standard" required
                                       defaultValue={addressForm.valueStreet !== null ? addressForm.valueStreet : ''}
                                       disabled={!addressForm.canUpdateObject}
                            />
                            <TextField name="zipCode" label="Zip Code" variant="standard" required
                                       defaultValue={addressForm.valueZipCode !== null ? addressForm.valueZipCode : ''}
                                       disabled={!addressForm.canUpdateObject} />
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                            {addressForm.type === 'update' && addressForm.canUpdateObject ?
                                (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                         onClick={handleDelete}>Delete</Button>) : ""}
                            {addressForm.canUpdateObject ?
                                <Button variant="contained" type="submit"
                                        sx={{marginRight: '2%'}}>
                                    {addressForm.type === 'update' ? "Update " : "Create "}
                                </Button> : ""}
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AddressForm;