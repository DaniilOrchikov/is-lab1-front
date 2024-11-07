import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import React, {useRef} from "react";
import {compareCoordinates, Status, Worker} from "../../types";
import UniversalTable, {HeadCell, standardFilterField} from "./UniversalTable";
import Button from "@mui/material/Button";
import {setWorkerFormOpen, setWorkerFormType} from "../slices/formSlices/workerFormSlice";
import WorkerForm from "./forms/WorkerForm";
import UpdateWorker from "./forms/UpdateWorker"
import {MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";

const WorkersTable = () => {
    const workers = useSelector((state: RootState) => state.workers);
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {
            id: 'id',
            numeric: true,
            label: 'Id',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Id")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            },
        } as HeadCell<Worker>,
        {
            id: 'name',
            numeric: false,
            label: 'Name',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Name")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
            },
        } as HeadCell<Worker>,
        {
            id: 'salary',
            numeric: true,
            label: 'Salary',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Salary")
            },
            filterFunction: (cellValue, filterValue) => {
                return Number(cellValue) >= Number(filterValue);
            },
        } as HeadCell<Worker>,
        {
            id: 'status',
            numeric: false,
            label: 'Status',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(Status).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            ),
            filterFunction: (cellValue, filterValue) => {
                return cellValue === filterValue;
            },
        } as HeadCell<Worker>,
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
                updateRef={refUpdateForm}
            />
            <UpdateWorker ref={refUpdateForm}/>
            <Button variant="contained" onClick={() => {
                dispatch(setWorkerFormOpen(true))
                dispatch(setWorkerFormType('create'))
            }}>
                Create Worker
            </Button>
            <WorkerForm></WorkerForm>
        </>
    );
};

export default WorkersTable;