import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import React, {useRef} from "react";
import {Color, Country, Person} from "../../../types";
import UniversalTable, {HeadCell, standardFilterField} from "./UniversalTable";
import PersonForm from "../forms/PersonForm";
import {setPersonFormType, setPersonFormOpen} from "../../slices/formSlices/personFormSlice";
import Button from "@mui/material/Button";
import UpdatePerson from "../updates/UpdatePerson";
import {MenuItem, Select} from "@mui/material";
import CreatePersonButton from "../buttons/CreatePersonButton";

const PersonTable = () => {
    const persons = useSelector((state: RootState) => state.persons);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {
            id: 'id', numeric: true, label: 'Id',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Id")
            }
        } as HeadCell<Person>,
        {
            id: 'eyeColor', numeric: false, label: 'EyeColor',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(Color).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Person>,
        {
            id: 'hairColor', numeric: false, label: 'HairColor',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(Color).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Person>,
        {
            id: 'height',
            numeric: true,
            label: 'Height',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Height")
            }
        } as HeadCell<Person>,
        {
            id: 'nationality', numeric: false, label: 'Nationality',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(Country).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            )
        } as HeadCell<Person>,
    ];

    const comparePerson = (a: Person, b: Person, orderBy: keyof Person) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const formatCellData = (columnId: keyof Person, data: Person[keyof Person]) => {
        return data;
    };

    const dispatch = useAppDispatch();

    return (
        <>
            <UniversalTable
                data={persons}
                headCells={headCells}
                comparator={comparePerson}
                formatCellData={formatCellData}
                updateRef={refUpdateForm}
            />
            <UpdatePerson ref={refUpdateForm}/>
            <CreatePersonButton/>
            <PersonForm></PersonForm>
        </>
    );
};

export default PersonTable;