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
import {
    setCurrentWorkerId, setWorkerFormOpen,
    setWorkerFormType,
    setWorkerFormValueCoordinatesId,
    setWorkerFormValueName,
    setWorkerFormValueRating,
    setWorkerFormValueSalary, setWorkerFormValueStatus
} from "../../slices/formSlices/workerFormSlice";

const UpdateWorker= forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const worker = workers.find(worker => worker.id === id)
            if (worker !== undefined) {
                dispatch(setWorkerFormValueName(worker.name));
                dispatch(setWorkerFormValueSalary(worker.salary));
                dispatch(setWorkerFormValueRating(worker.rating));
                dispatch(setWorkerFormValueStatus(worker.status));
                dispatch(setWorkerFormValueCoordinatesId(worker.coordinatesId));
                dispatch(setWorkerFormType('update'));
                dispatch(setCurrentWorkerId(id));
                dispatch(setWorkerFormOpen(true));
            } else {
                dispatch(addPopup({message: `There is no coordinates with id ${id}`, duration: 5000, type:PopupTypes.ERROR}))
            }
        }
    }));

    const dispatch = useAppDispatch();
    const workers = useSelector((state: RootState) => state.workers);

    return(
        <div></div>
    );
})
export default UpdateWorker