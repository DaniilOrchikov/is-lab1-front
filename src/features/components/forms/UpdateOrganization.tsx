import {
    setOrganizationFormType,
    setOrganizationFormOpen,
    setCurrentOrganizationId,
    setOrganizationFormValueAddressId,
    setOrganizationFormValueAnnualTurnover,
    setOrganizationFormValueEmployeesCount,
    setOrganizationFormValueFullName,
    setOrganizationFormValueRating, setOrganizationFormValueType
} from "../../slices/formSlices/organizationFormSlice";
import {forwardRef, useImperativeHandle} from "react";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";
import {RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";
import {setCoordinatesFormCanUpdateObject} from "../../slices/formSlices/coordinatesFormSlice";

const UpdateOrganization= forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const organization = organizations.find(organization => organization.id === id)
            if (organization !== undefined) {
                // dispatch(setOrganizationFormValueAddressId(organization.addressId));
                dispatch(setOrganizationFormValueAnnualTurnover(organization.annualTurnover));
                dispatch(setOrganizationFormValueEmployeesCount(organization.employeesCount));
                dispatch(setOrganizationFormValueFullName(organization.fullName));
                dispatch(setOrganizationFormValueRating(organization.rating));
                dispatch(setOrganizationFormValueType(organization.type));
                dispatch(setOrganizationFormType('update'));
                dispatch(setCurrentOrganizationId(id));
                dispatch(setOrganizationFormOpen(true));
                if (organization.creatorName == user.name){
                    dispatch(setCoordinatesFormCanUpdateObject(true))
                }
                else{
                    dispatch(setCoordinatesFormCanUpdateObject(false))
                }
            } else {
                dispatch(addPopup({message: `There is no organization with id ${id}`, duration: 5000, type:PopupTypes.ERROR}))
            }
        }
    }));

    const dispatch = useAppDispatch();
    const organizations = useSelector((state: RootState) => state.organizations);
    const user = useSelector((state: RootState) => state.user);

    return(
        <div></div>
    );
})
export default UpdateOrganization