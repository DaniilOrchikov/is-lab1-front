import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import React, {useRef} from "react";
import {Coordinates} from "../../types";
import UniversalTable, {HeadCell} from "./UniversalTable";
import CoordinatesForm from "./forms/CoordinatesForm";
import {setCoordinatesFormType, setCoordinatesFormOpen} from "../slices/formSlices/coordinatesFormSlice";
import Button from "@mui/material/Button";
import UpdateCoordinates from "./forms/UpdateCoordinates";

const CoordinatesTable = () => {
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {id: 'id', numeric: true, label: 'Id'} as HeadCell<Coordinates>,
        {id: 'x', numeric: true, label: 'X'} as HeadCell<Coordinates>,
        {id: 'y', numeric: true, label: 'Y'} as HeadCell<Coordinates>,
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

    const dispatch = useAppDispatch();

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
            <Button variant="contained" onClick={() => {
                dispatch(setCoordinatesFormType('create'))
                dispatch(setCoordinatesFormOpen(true))
            }}>
                Create Coordinates
            </Button>
            <CoordinatesForm></CoordinatesForm>
        </>
    );
};

export default CoordinatesTable;