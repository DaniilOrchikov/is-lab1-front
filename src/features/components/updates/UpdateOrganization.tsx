import {
    setOrganizationFormType,
    setOrganizationFormOpen,
    setCurrentOrganizationId,
    setOrganizationFormValueAddressId,
    setOrganizationFormValueAnnualTurnover,
    setOrganizationFormValueEmployeesCount,
    setOrganizationFormValueFullName,
    setOrganizationFormValueRating,
    setOrganizationFormValueType,
    setOrganizationFormCreatorName,
    setOrganizationFormCanUpdateObject
} from "../../slices/formSlices/organizationFormSlice";
import {forwardRef, useImperativeHandle} from "react";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";
import {RootState, useAppDispatch} from "../../../store";
import {useSelector} from "react-redux";

const UpdateOrganization= forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const organization = organizations.find(organization => organization.id === id)
            if (organization !== undefined) {
                dispatch(setOrganizationFormValueAnnualTurnover(organization.annualTurnover));
                dispatch(setOrganizationFormValueEmployeesCount(organization.employeesCount));
                dispatch(setOrganizationFormValueFullName(organization.fullName));
                dispatch(setOrganizationFormValueRating(organization.rating));
                dispatch(setOrganizationFormValueType(organization.type));
                dispatch(setOrganizationFormValueAddressId(organization.addressId))
                dispatch(setOrganizationFormType('update'));
                dispatch(setCurrentOrganizationId(id));
                dispatch(setOrganizationFormOpen(true));
                dispatch(setOrganizationFormCreatorName(organization.creatorName));
                if (organization.creatorName == user.name || user.admin){
                    dispatch(setOrganizationFormCanUpdateObject(true))
                }
                else{
                    dispatch(setOrganizationFormCanUpdateObject(false))
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