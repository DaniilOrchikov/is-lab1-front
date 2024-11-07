import {
    setCoordinatesFormType,
    setCoordinatesFormValueX,
    setCoordinatesFormValueY,
    setCoordinatesFormOpen, setCurrentCoordinatesId
} from "../../slices/formSlices/coordinatesFormSlice";
import {forwardRef, useImperativeHandle} from "react";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";
import {RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";

const UpdateCoordinates= forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const coordinates = coordinatesList.find(coordinates => coordinates.id === id)
            if (coordinates !== undefined) {
                dispatch(setCoordinatesFormValueX(coordinates.x));
                dispatch(setCoordinatesFormValueY(coordinates.y));
                dispatch(setCoordinatesFormType('update'));
                dispatch(setCurrentCoordinatesId(id));
                dispatch(setCoordinatesFormOpen(true));
            } else {
                dispatch(addPopup({message: `There is no coordinates with id ${id}`, duration: 5000, type:PopupTypes.ERROR}))
            }
        }
    }));

    const dispatch = useAppDispatch();
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);

    return(
        <div></div>
    );
})
export default UpdateCoordinates