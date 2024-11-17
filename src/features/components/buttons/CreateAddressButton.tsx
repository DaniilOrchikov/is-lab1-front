import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setAddressFormCanUpdateObject,
    setAddressFormOpen,
    setAddressFormType
} from "../../slices/formSlices/addressFormSlice";

const CreateAddressButton = () => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" sx={{width: "40%"}} onClick={() => {
            dispatch(setAddressFormOpen(true));
            dispatch(setAddressFormType('create'));
            dispatch(setAddressFormCanUpdateObject(true));
        }}>Create Address</Button>
    );
};

export default CreateAddressButton;