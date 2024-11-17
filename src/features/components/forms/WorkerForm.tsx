import React, {useEffect, useState} from 'react'
import {RootState, useAppDispatch} from "../../../store";
import {
    createWorkerThunk, deleteWorkerByIdThunk, updateWorkerThunk
} from '../../slices/workersSlice';
import {Status, Worker} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    InputLabel, MenuItem,
    Select,
    SelectChangeEvent, Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import {useSelector} from "react-redux";
import {setCoordinatesFormOpen, setCoordinatesFormType} from "../../slices/formSlices/coordinatesFormSlice";
import {resetWorkerForm, setWorkerFormOpen} from "../../slices/formSlices/workerFormSlice";
import {setOrganizationFormOpen, setOrganizationFormType} from "../../slices/formSlices/organizationFormSlice";
import {setPersonFormOpen, setPersonFormType} from "../../slices/formSlices/personFormSlice";
import CreateCoordinatesButton from "../buttons/CreateCoordinatesButton";
import CreateOrganizationButton from "../buttons/CreateOrganizationButton";
import CreatePersonButton from "../buttons/CreatePersonButton";


const WorkerForm = () => {
    const workerForm = useSelector((state: RootState) => state.workerForm);
    const [coordinatesId, setCoordinatesId] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [personId, setPersonId] = useState("");
    const [status, setStatus] = useState<Status>(Status.REGULAR);
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);
    const organizations = useSelector((state: RootState) => state.organizations);
    const persons = useSelector((state: RootState) => state.persons);
    const user = useSelector((state: RootState) => state.user);
    const handleCoordinatesChange = (event: SelectChangeEvent) => {
        setCoordinatesId(event.target.value);
    };
    const handlePersonChange = (event: SelectChangeEvent) => {
        setPersonId(event.target.value);
    };
    const handleOrganizationChange = (event: SelectChangeEvent) => {
        setOrganizationId(event.target.value);
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };

    const handleClose = () => {
        dispatch(setWorkerFormOpen(false));
        dispatch(resetWorkerForm())
        setPersonId("")
        setOrganizationId("")
        setCoordinatesId("")
    };
    const dispatch = useAppDispatch();

    const handleAddWorker = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const salary = parseFloat(formData.get("salary") as string);
        const rating = parseFloat(formData.get("rating") as string);

        if (salary <= 0) {
            alert("salary");
            return;
        }
        if (rating <= 0) {
            alert("rating");
            return;
        }

        let worker: Worker = {
            id: workerForm.currentWorkerId,
            name: name,
            salary: salary,
            rating: rating,
            coordinatesId: parseInt(coordinatesId),
            status: status,
            organizationId: parseInt(organizationId),
            personId: parseInt(personId),
            creatorName: user.name
        };
        if (workerForm.type === 'update') {
            dispatch(updateWorkerThunk(worker))
        } else {
            dispatch(createWorkerThunk(worker));
        }

        dispatch(resetWorkerForm())
        handleClose()
        setCoordinatesId("")
    }

    const handleDeleteWorker = () => {
        dispatch(deleteWorkerByIdThunk(workerForm.currentWorkerId))
        dispatch(resetWorkerForm())
        handleClose()
        setCoordinatesId("")
    }

    useEffect(() => {
        if (workerForm.valueStatus !== null) {
            setStatus(workerForm.valueStatus);
        }
    }, [workerForm.valueStatus]);
    useEffect(() => {
        if (workerForm.valueCoordinatesId !== null) {
            setCoordinatesId(workerForm.valueCoordinatesId.toString())
        }
    }, [workerForm.valueCoordinatesId]);
    useEffect(() => {
        if (workerForm.valueOrganizationId !== null) {
            setOrganizationId(workerForm.valueOrganizationId.toString())
        }
    }, [workerForm.valueOrganizationId]);
    useEffect(() => {
        if (workerForm.valuePersonId !== null) {
            setPersonId(workerForm.valuePersonId.toString())
        }
    }, [workerForm.valuePersonId]);


    return (
        <Box>
            <Dialog
                open={workerForm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {workerForm.type === 'update' ? "Update " : "Create "} Worker
                </DialogTitle>
                {!workerForm.canUpdateObject ?
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">You cannot modify an object because you
                        are not
                        its creator.</Typography> : ""}
                <DialogContent>
                    <Box>
                        <form onSubmit={handleAddWorker}>
                            <TextField name="name" label="Name" variant="standard" required
                                       defaultValue={workerForm.valueName !== null ? workerForm.valueName : ''}
                                       disabled={!workerForm.canUpdateObject}
                            />
                            <TextField name="salary" label="Salary" variant="standard" type={'number'} required
                                       InputProps={{inputProps: {min: 1}}}
                                       defaultValue={workerForm.valueSalary !== null ? workerForm.valueSalary : ''}
                                       disabled={!workerForm.canUpdateObject}/>
                            <TextField name="rating" label="Rating" variant="standard" type={'number'} required
                                       InputProps={{inputProps: {min: 1}}}
                                       defaultValue={workerForm.valueRating !== null ? workerForm.valueRating : ''}
                                       disabled={!workerForm.canUpdateObject}/>
                            <Box sx={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                                <FormControl variant="outlined" fullWidth sx={{width: 150, marginTop: "3%"}}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        id="status-select"
                                        value={status}
                                        onChange={handleStatusChange}
                                        label="Status"
                                        disabled={!workerForm.canUpdateObject}
                                    >
                                        {Object.entries(Status).map(([key, value]) => (
                                            <MenuItem key={key} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <br></br>
                            <br></br>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "100%",
                                flexDirection: "column",
                            }}>
                                {workerForm.canUpdateObject ? <CreateCoordinatesButton/> : ""}
                                <FormControl sx={{minWidth: "40%", marginTop: "2%"}}>
                                    <InputLabel>Coordinates</InputLabel>
                                    <Select
                                        id="select-coordinates"
                                        label="Coordinates"
                                        onChange={handleCoordinatesChange}
                                        required
                                        value={coordinatesId}
                                        disabled={!workerForm.canUpdateObject}
                                    >
                                        {coordinatesList.filter((coordinates) => coordinates.creatorName === user.name || coordinates.id === workerForm.valueCoordinatesId).map((coordinates) =>
                                            <MenuItem key={coordinates.id}
                                                      value={coordinates.id}>({coordinates.x}; {coordinates.y})</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <br></br>
                            <br></br>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "100%",
                                flexDirection: "column",
                            }}>
                                {workerForm.canUpdateObject ? <CreateOrganizationButton/> : ""}
                                <FormControl sx={{minWidth: "40%", marginTop: "2%"}}>
                                    <InputLabel>Organization</InputLabel>
                                    <Select
                                        id="select-organization"
                                        label="Organization"
                                        onChange={handleOrganizationChange}
                                        required
                                        value={organizationId}
                                        disabled={!workerForm.canUpdateObject}
                                    >
                                        {organizations.filter((organization) => organization.creatorName === user.name || organization.id === workerForm.valueOrganizationId).map((organization) =>
                                            <MenuItem key={organization.id}
                                                      value={organization.id}>{organization.fullName},
                                                rating: {organization.rating}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <br></br>
                            <br></br>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "100%",
                                flexDirection: "column",
                            }}>
                                <CreatePersonButton/>
                                <FormControl sx={{minWidth: "40%", marginTop: "2%"}}>
                                    <InputLabel>Person</InputLabel>
                                    <Select
                                        id="select-person"
                                        label="Person"
                                        onChange={handlePersonChange}
                                        required
                                        value={personId}
                                        disabled={!workerForm.canUpdateObject}
                                    >
                                        {persons.filter((person) => person.creatorName === user.name || person.id === workerForm.valueOrganizationId).map((person) =>
                                            <MenuItem key={person.id}
                                                      value={person.id}>
                                                eyeColor: {person.eyeColor}, hairColor: {person.hairColor},
                                                height: {person.height}, nationality: {person.nationality}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                                {workerForm.type === 'update' && workerForm.canUpdateObject ?
                                    (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                             onClick={handleDeleteWorker}>Delete</Button>) : ""}
                                {workerForm.canUpdateObject ?
                                    <Button variant="contained" type="submit"
                                            sx={{marginRight: '2%'}}>{workerForm.type === 'update' ? "Update " : "Create "}</Button>
                                    : ""}
                                <Button variant="outlined" onClick={handleClose}>Close</Button>
                            </Box>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default WorkerForm;