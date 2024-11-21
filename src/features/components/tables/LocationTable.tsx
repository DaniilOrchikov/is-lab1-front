import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import React, {useRef} from "react";
import {Location} from "../../../types";
import UniversalTable, {HeadCell, standardFilterField} from "./UniversalTable";
import LocationForm from "../forms/LocationForm";
import UpdateLocation from "../updates/UpdateLocation";
import CreateLocationButton from "../buttons/CreateLocationButton";

const LocationTable = () => {
    const locations = useSelector((state: RootState) => state.locations);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {
            id: 'id', numeric: true, label: 'Id',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange})
            }
        } as HeadCell<Location>,
        {
            id: 'x', numeric: true, label: 'X',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange})
            }
        } as HeadCell<Location>,
        {
            id: 'y', numeric: true, label: 'Y',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange})
            }
        } as HeadCell<Location>,
        {
            id: 'z', numeric: true, label: 'Z',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange})
            }
        } as HeadCell<Location>,
        {
            id: 'name', numeric: false, label: 'Name',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange})
            }
        } as HeadCell<Location>,
    ];

    const compareLocation = (a: Location, b: Location, orderBy: keyof Location) => {
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

    const formatCellData = (columnId: keyof Location, data: Location[keyof Location]) => {
        return data;
    };


    return (
        <>
            <UniversalTable
                data={locations}
                headCells={headCells}
                comparator={compareLocation}
                formatCellData={formatCellData}
                updateRef={refUpdateForm}
            />
            <UpdateLocation ref={refUpdateForm}/>
            <CreateLocationButton/>
        </>
    );
};

export default LocationTable;