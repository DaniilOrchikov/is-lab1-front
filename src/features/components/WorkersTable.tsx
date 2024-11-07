import {useSelector} from "react-redux";
import {State, useAppDispatch} from "../../store";
import React, {useRef} from "react";
import {compareCoordinates, Worker} from "../../types";
import UpdateWorkerForm from "./forms/UpdateWorkerForm";
import UniversalTable, {HeadCell} from "./UniversalTable";
import Button from "@mui/material/Button";
import {setCreateWorkerOpen} from "../slices/formSlices/createWorkerSlice";
import CreateWorkerForm from "./forms/CreateWorkerForm";

const WorkersTable = () => {
    const workers = useSelector((state: State) => state.workers);
    const coordinatesList = useSelector((state: State) => state.coordinatesList);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {id: 'id', numeric: true, label: 'Id'} as HeadCell<Worker>,
        {id: 'name', numeric: false, label: 'Name'} as HeadCell<Worker>,
        {id: 'salary', numeric: true, label: 'Salary'} as HeadCell<Worker>,
        {id: 'rating', numeric: true, label: 'Rating'} as HeadCell<Worker>,
        {id: 'coordinatesId', numeric: false, label: 'Coordinates'} as HeadCell<Worker>,
        {id: 'status', numeric: false, label: 'Status'} as HeadCell<Worker>,
    ];

    const compareWorkers = (a: Worker, b: Worker, orderBy: keyof Worker) => {
        if (orderBy === 'coordinatesId') {
            const coordA = coordinatesList.find(coordinates => coordinates.id === a[orderBy]);
            const coordB = coordinatesList.find(coordinates => coordinates.id === b[orderBy]);
            if (coordA && coordB) {
                return compareCoordinates(coordA, coordB);
            }
            return 0;
        }
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const formatCellData = (columnId: keyof Worker, data: Worker[keyof Worker]) => {
        if (columnId === 'coordinatesId') {
            const coords = coordinatesList.find(coordinates => coordinates.id === data as number);
            return coords ? `(${coords.x}; ${coords.y})` : null;
        }
        return data;
    };

    const dispatch = useAppDispatch();
    return (
        <>
            <UniversalTable
                data={workers}
                headCells={headCells}
                comparator={compareWorkers}
                formatCellData={formatCellData}
                updateFormRef={refUpdateForm}
            />
            <UpdateWorkerForm ref={refUpdateForm}/>
            <Button variant="contained" onClick={() => dispatch(setCreateWorkerOpen(true))}>
                Create Worker
            </Button>
            <CreateWorkerForm></CreateWorkerForm>
        </>
    );
};

export default WorkersTable;