import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import React, {useRef} from "react";
import {Organization, OrganizationType} from "../../../types";
import UniversalTable, {HeadCell, standardFilterField} from "./UniversalTable";
import OrganizationForm from "../forms/OrganizationForm";
import {setOrganizationFormType, setOrganizationFormOpen} from "../../slices/formSlices/organizationFormSlice";
import Button from "@mui/material/Button";
import UpdateOrganization from "../forms/UpdateOrganization";
import {MenuItem, Select} from "@mui/material";
import CreateOrganizationButton from "../buttons/CreateOrganizationButton";

const OrganizationsTable = () => {
    const organizations = useSelector((state: RootState) => state.organizations);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells = [
        {
            id: 'id', numeric: true, label: 'Id',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Id")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            }
        } as HeadCell<Organization>,
        {
            id: 'annualTurnover', numeric: true, label: 'Aannual Turnover',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Aannual Turnover")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            }
        } as HeadCell<Organization>,
        {
            id: 'employeesCount', numeric: true, label: 'Employees Count',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Employees Count")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            },
        } as HeadCell<Organization>,
        {
            id: 'fullName', numeric: false, label: 'Full Name',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Full Name")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            },
        } as HeadCell<Organization>,
        {
            id: 'rating', numeric: true, label: 'Rating',
            filterComponent: ({value, onChange}) => {
                return standardFilterField({value, onChange}, "Filter Rating")
            },
            filterFunction: (cellValue, filterValue) => {
                return String(cellValue).includes(filterValue);
            },
        } as HeadCell<Organization>,
        {
            id: 'type', numeric: false, label: 'Type',
            filterComponent: ({value, onChange}) => (
                <Select
                    variant="standard"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{width: 120}}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(OrganizationType).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            ),
            filterFunction: (cellValue, filterValue) => {
                return cellValue === filterValue;
            },
        } as HeadCell<Organization>,
    ];

    const compareOrganization = (a: Organization, b: Organization, orderBy: keyof Organization) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const formatCellData = (columnId: keyof Organization, data: Organization[keyof Organization]) => {
        return data;
    };

    return (
        <>
            <UniversalTable
                data={organizations}
                headCells={headCells}
                comparator={compareOrganization}
                formatCellData={formatCellData}
                updateRef={refUpdateForm}
            />
            <UpdateOrganization ref={refUpdateForm}/>
            <CreateOrganizationButton/>
            <OrganizationForm></OrganizationForm>
        </>
    );
};

export default OrganizationsTable;