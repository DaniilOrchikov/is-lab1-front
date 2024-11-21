import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {configureApiWithAuth} from "../utils/auth";
import {fetchCoordinatesThunk} from "../slices/coordinatesSlice";
import {fetchOrganizationsThunk} from "../slices/organizationSlice";
import {fetchWorkersThunk} from "../slices/workersSlice";
import {fetchPersonsThunk} from "../slices/personSlice";
import {fetchAddressesThunk} from "../slices/addressSlice";
import {fetchLocationsThunk} from "../slices/locationSlice";
import {adminApplicationStatus} from "../api/userApi";
import {addPopup} from "../slices/popupSlice";
import {PopupTypes} from "../../types";
import {setAdmin, setInAdminQueue} from "../slices/userSlice";

const UpdateManagement=()=>{
    const dispatch = useAppDispatch();
    const user = useSelector((state:RootState) => state.user);

    useEffect(() => {
        configureApiWithAuth(user.name, user.password);
    }, [user]);

    const adminStatusRequest=()=>{
        if (user.inAdminQueue){
            adminApplicationStatus().then((response)=>{
                if (response.status === 'approved'){
                    dispatch(setAdmin(true))
                    dispatch(setInAdminQueue(false))
                    dispatch(addPopup({message: `You have become an administrator`, duration: 10000, type: PopupTypes.SUCCESS}))
                }else if (response.status === 'rejected'){
                    dispatch(setInAdminQueue(false))
                    dispatch(addPopup({message: `Your application has been rejected`, duration: 10000, type: PopupTypes.WARNING}))
                }
            })
        }
    }

    useEffect(() => {
        const fetch = () => {
            dispatch(fetchLocationsThunk());
            dispatch(fetchAddressesThunk());
            dispatch(fetchCoordinatesThunk());
            dispatch(fetchOrganizationsThunk());
            dispatch(fetchPersonsThunk());
            dispatch(fetchWorkersThunk());
            adminStatusRequest()
        };

        const intervalId = setInterval(fetch, 1000);

        fetch();

        return () => clearInterval(intervalId);
    }, [dispatch, user]);
    return(<div></div>)
}

export default UpdateManagement