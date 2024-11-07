import {useSelector} from "react-redux";
import {State, useAppDispatch} from "../../store";
import React, {useRef} from "react";
import {compareCoordinates, Coordinates, Worker} from "../../types";
import UpdateWorkerForm from "./UpdateWorkerForm";
import UniversalTable, {HeadCell} from "./UniversalTable";
import CreateCoordinatesForm from "./CreateCoordinatesForm";
import {setCreateCoordinatesOpen} from "../slices/formSlices/createCoordinatesSlice";
import Button from "@mui/material/Button";

const CoordinatesTable = () => {
    const coordinatesList = useSelector((state: State) => state.coordinatesList);

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
                updateFormRef={refUpdateForm}
            />
            {/*<UpdateWorkerForm ref={refUpdateForm}/>*/}
            <Button variant="contained" onClick={() => dispatch(setCreateCoordinatesOpen(true))}>
                Create Coordinates
            </Button>
            <CreateCoordinatesForm></CreateCoordinatesForm>
        </>
    );
};

export default CoordinatesTable;