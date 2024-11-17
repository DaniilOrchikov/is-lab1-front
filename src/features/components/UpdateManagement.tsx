import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {configureApiWithAuth} from "../api";
import {fetchCoordinatesThunk} from "../slices/coordinatesSlice";
import {fetchOrganizationsThunk} from "../slices/organizationSlice";
import {fetchWorkersThunk} from "../slices/workersSlice";
import {fetchPersonsThunk} from "../slices/personSlice";
import {fetchAddressesThunk} from "../slices/addressSlice";

const UpdateManagement=()=>{
    const dispatch = useAppDispatch();
    const user = useSelector((state:RootState) => state.user);

    useEffect(() => {
        configureApiWithAuth(user.name, user.password);
    }, [user]);
    useEffect(() => {
        const fetch = () => {
            dispatch(fetchAddressesThunk());
            dispatch(fetchCoordinatesThunk());
            dispatch(fetchOrganizationsThunk());
            dispatch(fetchPersonsThunk());
            dispatch(fetchWorkersThunk());
        };

        const intervalId = setInterval(fetch, 1000);

        fetch();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    return(<div></div>)
}

export default UpdateManagement