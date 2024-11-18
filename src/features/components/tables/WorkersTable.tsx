import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import React, {useRef} from "react";
import {compareCoordinates, Position, Status, Worker} from "../../../types";
import UniversalTable, {HeadCell, standardFilterField} from "./UniversalTable";
import WorkerForm from "../forms/WorkerForm";
import UpdateWorker from "../updates/UpdateWorker"
import {MenuItem, Select} from "@mui/material";
import CreateWorkerButton from "../buttons/CreateWorkerButton";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {compareAsc, format} from "date-fns";


function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
}


const WorkersTable = () => {
    const workers = useSelector((state: RootState) => state.workers);
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);
    const organizations = useSelector((state: RootState) => state.organizations);
    const persons = useSelector((state: RootState) => state.persons);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {
            id: 'id',
            numeric: true,
            label: 'Id',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Id")
            }
        } as HeadCell<Worker>,
        {
            id: 'name',
            numeric: false,
            label: 'Name',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Name")
            }
        } as HeadCell<Worker>,
        {
            id: 'salary',
            numeric: true,
            label: 'Salary',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Salary")
            }
        } as HeadCell<Worker>,
        {
            id: 'creationDate',
            numeric: false,
            label: 'Creation Date',
            filterComponent: ({value, onChange}) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={null}
                        onChange={(newValue) => {
                            onChange(newValue !== null ? newValue.toDate() : null);
                        }}
                        sx={{width: "170px"}}
                    />
                </LocalizationProvider>

            ),
            filterFunction: (cellValue, filterValue) => {
                if (isNaN(filterValue)) {
                    return true
                }
                return cellValue === format(filterValue, "dd.MM.yyyy");
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
            )
        } as HeadCell<Worker>,
        {
            id: 'position',
            numeric: false,
            label: 'Position',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(Position).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Worker>,
        {
            id: 'coordinatesId',
            numeric: false,
            label: 'Coordinates',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {coordinatesList.map((coordinates) => (
                        <MenuItem key={coordinates.id} value={coordinates.id}>
                            {`(${coordinates.x}; ${coordinates.y})`}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Worker>,
        {
            id: 'organizationId',
            numeric: false,
            label: 'Organization',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {organizations.map((organization) => (
                        <MenuItem key={organization.id} value={organization.id}>
                            {`${organization.fullName}, rating: ${organization.rating}`}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Worker>,
        {
            id: 'personId',
            numeric: false,
            label: 'Person',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {persons.map((person) => (
                        <MenuItem key={person.id} value={person.id}>
                            {`eyeColor: ${person.eyeColor}, hairColor: ${person.hairColor}, height: ${person.height}, nationality: ${person.nationality}`}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Worker>,
        {
            id: 'startDate',
            numeric: false,
            label: 'Start Date',
            filterComponent: ({value, onChange}) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={null}
                        onChange={(newValue) => {
                            onChange(newValue !== null ? newValue.toDate() : null);
                        }}
                        sx={{width: "170px"}}
                    />
                </LocalizationProvider>

            ),
            filterFunction: (cellValue, filterValue) => {
                if (isNaN(filterValue)) {
                    return true
                }
                return cellValue === format(filterValue, "dd.MM.yyyy");
            },
        } as HeadCell<Worker>
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
        if (orderBy === 'creationDate') {
            const date1 = parseDate(a.creationDate);
            const date2 = parseDate(b.creationDate);
            const comparisonResult = compareAsc(date1, date2);
            if (comparisonResult > 0) {
                return 1
            } else if (comparisonResult < 0) {
                return -1
            } else {
                return 0
            }
        }
        if (b[orderBy] === null) {
            return -1
        }
        if (a[orderBy] === null) {
            return 1
        }
        if (b[orderBy]! < a[orderBy]!) {
            return -1;
        }
        if (b[orderBy]! > a[orderBy]!) {
            return 1;
        }
        return 0;
    };

    const formatCellData = (columnId: keyof Worker, data: Worker[keyof Worker]) => {
        if (columnId === 'coordinatesId') {
            const coords = coordinatesList.find(coordinates => coordinates.id === data as number);
            return coords ? `(${coords.x}; ${coords.y})` : null;
        }
        if (columnId === 'organizationId') {
            const organization = organizations.find(organization => organization.id === data as number);
            return organization ? `${organization.fullName}, rating: ${organization.rating}` : null;
        }
        if (columnId === 'personId') {
            const person = persons.find(person => person.id === data as number);
            return person ? `nationality: ${person.nationality}` : null;
        }
        return data;
    };

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
            <CreateWorkerButton/>
            <WorkerForm></WorkerForm>
        </>
    );
};

export default WorkersTable;