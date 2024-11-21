import {
    setLocationFormType,
    setLocationFormValueX,
    setLocationFormValueY,
    setLocationFormOpen,
    setCurrentLocationId,
    setLocationFormCreatorName,
    setLocationFormCanUpdateObject,
    setLocationFormValueZ, setLocationFormValueName
} from "../../slices/formSlices/locationFormSlice";
import {forwardRef, useImperativeHandle} from "react";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";
import {RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";

const UpdateLocation = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const location = locations.find(location => location.id === id)
            if (location !== undefined) {
                dispatch(setLocationFormValueX(location.x));
                dispatch(setLocationFormValueY(location.y));
                dispatch(setLocationFormValueZ(location.z));
                dispatch(setLocationFormValueName(location.name));
                dispatch(setLocationFormCreatorName(location.creatorName));
                dispatch(setLocationFormType('update'));
                dispatch(setCurrentLocationId(id));
                dispatch(setLocationFormOpen(true));
                if (location.creatorName == user.name || user.admin){
                    dispatch(setLocationFormCanUpdateObject(true))
                }
                else{
                    dispatch(setLocationFormCanUpdateObject(false))
                }
            } else {
                dispatch(addPopup({
                    message: `There is no location with id ${id}`,
                    duration: 5000,
                    type: PopupTypes.ERROR
                }))
            }
        }
    }));

    const dispatch = useAppDispatch();
    const locations = useSelector((state: RootState) => state.locations);
    const user = useSelector((state: RootState) => state.user);

    return (
        <div></div>
    );
})
export default UpdateLocation