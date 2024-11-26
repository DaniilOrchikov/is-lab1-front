import React from "react";
import {RootState, useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setAddressFormCanUpdateObject, setAddressFormCreatorName,
    setAddressFormOpen,
    setAddressFormType
} from "../../slices/formSlices/addressFormSlice";
import CreateButtonProps from "./CreateButtonProps";
import {useSelector} from "react-redux";

const CreateAddressButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Button variant="contained" onClick={() => {
            dispatch(setAddressFormOpen(true));
            dispatch(setAddressFormType('create'));
            dispatch(setAddressFormCanUpdateObject(true));
            dispatch(setAddressFormCreatorName(user.name))
        }} sx={props.sx}>Create Address</Button>
    );
};

export default CreateAddressButton;