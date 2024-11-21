import {
    setPersonFormType,
    setPersonFormOpen,
    setCurrentPersonId,
    setPersonFormValueEyeColor,
    setPersonFormValueHairColor,
    setPersonFormValueHeight,
    setPersonFormValueNationality,
    setPersonFormCanUpdateObject,
    setPersonFormCreatorName,
    setPersonFormValueLocationId
} from "../../slices/formSlices/personFormSlice";
import {forwardRef, useImperativeHandle} from "react";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";
import {RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";

const UpdatePerson= forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const person = persons.find(person => person.id === id)
            if (person !== undefined) {
                dispatch(setPersonFormValueEyeColor(person.eyeColor));
                dispatch(setPersonFormValueHairColor(person.hairColor));
                dispatch(setPersonFormValueHeight(person.height));
                dispatch(setPersonFormValueNationality(person.nationality));
                dispatch(setPersonFormValueLocationId(person.locationId));
                dispatch(setPersonFormType('update'));
                dispatch(setCurrentPersonId(id));
                dispatch(setPersonFormOpen(true));
                dispatch(setPersonFormCreatorName(person.creatorName))
                if (person.creatorName == user.name || user.admin){
                    dispatch(setPersonFormCanUpdateObject(true))
                }
                else{
                    dispatch(setPersonFormCanUpdateObject(false))
                }
            } else {
                dispatch(addPopup({message: `There is no person with id ${id}`, duration: 5000, type:PopupTypes.ERROR}))
            }
        }
    }));

    const dispatch = useAppDispatch();
    const persons = useSelector((state: RootState) => state.persons);
    const user = useSelector((state: RootState) => state.user);

    return(
        <div></div>
    );
})
export default UpdatePerson