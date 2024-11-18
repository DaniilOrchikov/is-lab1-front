import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setAddressFormCanUpdateObject,
    setAddressFormOpen,
    setAddressFormType
} from "../../slices/formSlices/addressFormSlice";
import CreateButtonProps from "./CreateButtonProps";

const CreateAddressButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" onClick={() => {
            dispatch(setAddressFormOpen(true));
            dispatch(setAddressFormType('create'));
            dispatch(setAddressFormCanUpdateObject(true));
        }} sx={props.sx}>Create Address</Button>
    );
};

export default CreateAddressButton;