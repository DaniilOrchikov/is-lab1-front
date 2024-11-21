import {forwardRef, useImperativeHandle} from "react";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";
import {RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";
import {
    setAddressFormCanUpdateObject, setAddressFormCreatorName, setAddressFormOpen, setAddressFormType,
    setAddressFormValueStreet,
    setAddressFormValueZipCode, setCurrentAddressId
} from "../../slices/formSlices/addressFormSlice";

const UpdateAddress = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const address = addresses.find(address => address.id === id)
            if (address !== undefined) {
                dispatch(setAddressFormValueStreet(address.street));
                dispatch(setAddressFormValueZipCode(address.zipCode));
                dispatch(setAddressFormCreatorName(address.creatorName));
                dispatch(setAddressFormType('update'));
                dispatch(setCurrentAddressId(id));
                dispatch(setAddressFormOpen(true));
                if (address.creatorName == user.name || user.admin){
                    dispatch(setAddressFormCanUpdateObject(true))
                }
                else{
                    dispatch(setAddressFormCanUpdateObject(false))
                }
            } else {
                dispatch(addPopup({
                    message: `There is no address with id ${id}`,
                    duration: 5000,
                    type: PopupTypes.ERROR
                }))
            }
        }
    }));

    const dispatch = useAppDispatch();
    const addresses = useSelector((state: RootState) => state.addresses);
    const user = useSelector((state: RootState) => state.user);

    return (
        <div></div>
    );
})
export default UpdateAddress