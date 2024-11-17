import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import React, {useRef} from "react";
import {Coordinates} from "../../../types";
import UniversalTable, {HeadCell, standardFilterField} from "./UniversalTable";
import CoordinatesForm from "../forms/CoordinatesForm";
import {
    setCoordinatesFormType,
    setCoordinatesFormOpen,
    setCoordinatesFormCanUpdateObject
} from "../../slices/formSlices/coordinatesFormSlice";
import Button from "@mui/material/Button";
import UpdateCoordinates from "../forms/UpdateCoordinates";
import CreateCoordinatesButton from "../buttons/CreateCoordinatesButton";

const CoordinatesTable = () => {
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {id: 'id', numeric: true, label: 'Id',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Id")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            }} as HeadCell<Coordinates>,
        {id: 'x', numeric: true, label: 'X',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter X")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            }} as HeadCell<Coordinates>,
        {id: 'y', numeric: true, label: 'Y',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Y")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            },} as HeadCell<Coordinates>,
    ];

    const compareCoordinates = (a: Coordinates, b: Coordinates, orderBy: keyof Coordinates) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const formatCellData = (columnId: keyof Coordinates, data: Coordinates[keyof Coordinates]) => {
        return data;
    };


    return (
        <>
            <UniversalTable
                data={coordinatesList}
                headCells={headCells}
                comparator={compareCoordinates}
                formatCellData={formatCellData}
                updateRef={refUpdateForm}
            />
            <UpdateCoordinates ref={refUpdateForm}/>
            <CreateCoordinatesButton/>
            <CoordinatesForm></CoordinatesForm>
        </>
    );
};

export default CoordinatesTable;