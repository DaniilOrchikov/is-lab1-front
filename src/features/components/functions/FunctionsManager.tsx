import React, {useState} from "react";
import {Button, Menu, MenuItem, Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import FunctionDialog from "./FunctionDialog";
import SelectField from "../forms/SelectField";
import {
    deleteByPerson,
    countByPerson,
    hireEmployee,
    adjustEmployeeSalary,
} from "../../api";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";

const FunctionsManager: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const persons = useSelector((state: RootState) => state.persons);
    const workers = useSelector((state: RootState) => state.workers);
    const organizations = useSelector((state: RootState) => state.organizations);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openFunctionsMenu = Boolean(anchorEl);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [countDialogOpen, setCountDialogOpen] = useState(false);
    const [hireDialogOpen, setHireDialogOpen] = useState(false);
    const [adjustSalaryDialogOpen, setAdjustSalaryDialogOpen] = useState(false);

    const [deletePersonId, setDeletePersonId] = useState<number | null>(null);
    const [countPersonId, setCountPersonId] = useState<number | null>(null);
    const [hireWorkerId, setHireWorkerId] = useState<number | null>(null);
    const [hireOrganizationId, setHireOrganizationId] = useState<number | null>(null);
    const [adjustWorkerId, setAdjustWorkerId] = useState<number | null>(null);
    const [salaryCoefficient, setSalaryCoefficient] = useState<number>(1);

    const handleClickFunctions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseFunctionsMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = (dialogType: "delete" | "count" | "hire" | "adjust") => {
        switch (dialogType) {
            case "delete":
                setDeleteDialogOpen(true);
                break;
            case "count":
                setCountDialogOpen(true);
                break;
            case "hire":
                setHireDialogOpen(true);
                break;
            case "adjust":
                setAdjustSalaryDialogOpen(true);
                break;
            default:
                break;
        }
        handleCloseFunctionsMenu();
    };

    const handleCloseAllDialogs = () => {
        setDeleteDialogOpen(false);
        setCountDialogOpen(false);
        setHireDialogOpen(false);
        setAdjustSalaryDialogOpen(false);

        setDeletePersonId(null);
        setCountPersonId(null);
        setHireWorkerId(null);
        setHireOrganizationId(null);
        setAdjustWorkerId(null);
        setSalaryCoefficient(1);
    };

    const handleDeleteSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await deleteByPerson(deletePersonId!);
            dispatch(
                addPopup({
                    message: "Worker successfully deleted.",
                    duration: 5000,
                    type: PopupTypes.SUCCESS,
                })
            );
            handleCloseAllDialogs();
        } catch (error) {
            dispatch(
                addPopup({
                    message: "Error deleting worker.",
                    duration: 5000,
                    type: PopupTypes.ERROR,
                })
            );
        }
    };

    const handleCountSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const count = await countByPerson(countPersonId!);
            dispatch(
                addPopup({
                    message: `Number of workers: ${count}`,
                    duration: 5000,
                    type: PopupTypes.SUCCESS,
                })
            );
            handleCloseAllDialogs();
        } catch (error) {
            dispatch(
                addPopup({
                    message: "Error counting workers.",
                    duration: 5000,
                    type: PopupTypes.ERROR,
                })
            );
        }
    };

    const handleHireSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await hireEmployee(hireWorkerId!, hireOrganizationId!);
            dispatch(
                addPopup({
                    message: "Worker successfully hired.",
                    duration: 5000,
                    type: PopupTypes.SUCCESS,
                })
            );
            handleCloseAllDialogs();
        } catch (error) {
            dispatch(
                addPopup({
                    message: "Error hiring worker.",
                    duration: 5000,
                    type: PopupTypes.ERROR,
                })
            );
        }
    };

    const handleAdjustSalarySubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await adjustEmployeeSalary(adjustWorkerId!, salaryCoefficient!);
            dispatch(
                addPopup({
                    message: "Worker's salary successfully adjusted.",
                    duration: 5000,
                    type: PopupTypes.SUCCESS,
                })
            );
            handleCloseAllDialogs();
        } catch (error) {
            dispatch(
                addPopup({
                    message: "Error adjusting salary.",
                    duration: 5000,
                    type: PopupTypes.ERROR,
                })
            );
        }
    };

    return (
        <>
            <Button
                sx={{my: 2, color: "white", display: "block"}}
                aria-controls={openFunctionsMenu ? "functions-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openFunctionsMenu ? "true" : undefined}
                onClick={handleClickFunctions}
            >
                Functions
            </Button>
            <Menu
                id="functions-menu"
                anchorEl={anchorEl}
                open={openFunctionsMenu}
                onClose={handleCloseFunctionsMenu}
                MenuListProps={{
                    "aria-labelledby": "functions-button",
                }}
            >
                <MenuItem onClick={() => handleOpenDialog("delete")}>Delete by Person</MenuItem>
                <MenuItem onClick={() => handleOpenDialog("count")}>Count by Person</MenuItem>
                <MenuItem onClick={() => handleOpenDialog("hire")}>Hire Employee</MenuItem>
                <MenuItem onClick={() => handleOpenDialog("adjust")}>Adjust Employee Salary</MenuItem>
            </Menu>

            {/* Delete by Person Dialog */}
            <FunctionDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                title="Delete by Person"
                onSubmit={handleDeleteSubmit}
            >
                <Box sx={{minWidth: "40%", marginTop: "2%"}}>
                    <SelectField
                        label="Person"
                        changeHandler={(event) => setDeletePersonId(parseInt(event.target.value as string))}
                        options={persons
                            .filter((person) => person.creatorName === user.name)
                            .map((person) => ({
                                label: `ID: ${person.id}, Eye Color: ${person.eyeColor}, Hair Color: ${person.hairColor}, Height: ${person.height}, Nationality: ${person.nationality}`,
                                value: person.id,
                            }))}
                        value={deletePersonId || ""}
                    />
                </Box>
            </FunctionDialog>

            {/* Count by Person Dialog */}
            <FunctionDialog
                open={countDialogOpen}
                setOpen={setCountDialogOpen}
                title="Count by Person"
                onSubmit={handleCountSubmit}
            >
                <Box sx={{minWidth: "40%", marginTop: "2%"}}>
                    <SelectField
                        label="Person"
                        changeHandler={(event) => setCountPersonId(parseInt(event.target.value as string))}
                        options={persons
                            .map((person) => ({
                                label: `ID: ${person.id}, Eye Color: ${person.eyeColor}, Hair Color: ${person.hairColor}, Height: ${person.height}, Nationality: ${person.nationality}`,
                                value: person.id,
                            }))}
                        value={countPersonId || ""}
                    />
                </Box>
            </FunctionDialog>

            {/* Hire Employee Dialog */}
            <FunctionDialog
                open={hireDialogOpen}
                setOpen={setHireDialogOpen}
                title="Hire Employee"
                onSubmit={handleHireSubmit}
            >
                <Box sx={{minWidth: "40%", marginTop: "2%"}}>
                    <SelectField
                        label="Worker"
                        changeHandler={(event) => setHireWorkerId(parseInt(event.target.value as string))}
                        options={workers.map((worker) => ({
                            label: `ID: ${worker.id}, Name: ${worker.name}`,
                            value: worker.id,
                        }))}
                        value={hireWorkerId || ""}
                    />
                </Box>
                <Box sx={{minWidth: "40%", marginTop: "2%"}}>
                    <SelectField
                        label="Organization"
                        changeHandler={(event) => setHireOrganizationId(parseInt(event.target.value as string))}
                        options={organizations.map((org) => ({
                            label: `ID: ${org.id}, Name: ${org.fullName}`,
                            value: org.id,
                        }))}
                        value={hireOrganizationId || ""}
                    />
                </Box>
            </FunctionDialog>

            {/* Adjust Employee Salary Dialog */}
            <FunctionDialog
                open={adjustSalaryDialogOpen}
                setOpen={setAdjustSalaryDialogOpen}
                title="Adjust Employee Salary"
                onSubmit={handleAdjustSalarySubmit}
            >
                <Box sx={{minWidth: "40%", marginTop: "2%"}}>
                    <SelectField
                        label="Worker"
                        changeHandler={(event) => setAdjustWorkerId(parseInt(event.target.value as string))}
                        options={workers.map((worker) => ({
                            label: `ID: ${worker.id}, Name: ${worker.name}`,
                            value: worker.id,
                        }))}
                        value={adjustWorkerId || ""}
                    />
                </Box>
                <Box sx={{minWidth: "40%", marginTop: "2%"}}>
                    <TextField
                        label="Salary Coefficient"
                        type="number"
                        inputProps={{step: "0.01", min: "0"}}
                        fullWidth
                        value={salaryCoefficient}
                        onChange={(e) => setSalaryCoefficient(parseFloat(e.target.value))}
                    />
                </Box>
            </FunctionDialog>
        </>
    );

};

export default FunctionsManager;