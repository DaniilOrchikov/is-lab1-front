import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {configureApiWithAuth} from "../api";
import {fetchCoordinatesThunk} from "../slices/coordinatesSlice";
import {fetchOrganizationsThunk} from "../slices/organizationSlice";
import {fetchWorkersThunk} from "../slices/workersSlice";
import {fetchPersonsThunk} from "../slices/personSlice";

const UpdateManagement=()=>{
    const dispatch = useAppDispatch();
    const user = useSelector((state:RootState) => state.user);

    useEffect(() => {
        configureApiWithAuth(user.name, user.password);
    }, [user]);

    useEffect(() => {
        const fetchCoordinates = () => {
            dispatch(fetchCoordinatesThunk());
        };

        const intervalId = setInterval(fetchCoordinates, 1000);

        fetchCoordinates();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    useEffect(() => {
        const fetchOrganizations = () => {
            dispatch(fetchOrganizationsThunk());
        };

        const intervalId = setInterval(fetchOrganizations, 1000);

        fetchOrganizations();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    useEffect(() => {
        const fetchPersons = () => {
            dispatch(fetchPersonsThunk());
        };

        const intervalId = setInterval(fetchPersons, 1000);

        fetchPersons();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    useEffect(() => {
        const fetchWorkers = () => {
            dispatch(fetchWorkersThunk());
        };

        const intervalId = setInterval(fetchWorkers, 1000);

        fetchWorkers();

        return () => clearInterval(intervalId);
    }, [dispatch]);
    return(<div></div>)
}

export default UpdateManagement