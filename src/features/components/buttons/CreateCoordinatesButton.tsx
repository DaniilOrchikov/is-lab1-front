import {
    setCoordinatesFormCanUpdateObject, setCoordinatesFormCreatorName,
    setCoordinatesFormOpen,
    setCoordinatesFormType
} from "../../slices/formSlices/coordinatesFormSlice";
import React from "react";
import {RootState, useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import CreateButtonProps from "./CreateButtonProps";
import {useSelector} from "react-redux";

const CreateCoordinatesButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Button variant="contained" onClick={() => {
            dispatch(setCoordinatesFormOpen(true))
            dispatch(setCoordinatesFormType('create'))
            dispatch(setCoordinatesFormCanUpdateObject(true))
            dispatch(setCoordinatesFormCreatorName(user.name))
        }} sx={props.sx}>Create Coordinates</Button>)
}

export default CreateCoordinatesButton