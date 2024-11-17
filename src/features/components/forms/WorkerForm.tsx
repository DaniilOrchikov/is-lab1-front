import React, {useEffect, useState} from 'react'
import store, {RootState, useAppDispatch} from "../../../store";
import {
    createWorkerThunk, deleteWorkerByIdThunk, updateWorkerThunk
} from '../../slices/workersSlice';
import {PopupTypes, Position, Status, Worker} from '../../../types';
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
import {resetWorkerForm, setWorkerFormOpen, setWorkerFormValueStartDate} from "../../slices/formSlices/workerFormSlice";
import {setOrganizationFormOpen, setOrganizationFormType} from "../../slices/formSlices/organizationFormSlice";
import {setPersonFormOpen, setPersonFormType} from "../../slices/formSlices/personFormSlice";
import CreateCoordinatesButton from "../buttons/CreateCoordinatesButton";
import CreateOrganizationButton from "../buttons/CreateOrganizationButton";
import CreatePersonButton from "../buttons/CreatePersonButton";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {format} from "date-fns";
import dayjs, {Dayjs} from "dayjs";
import {addPopup} from "../../slices/popupSlice";


const WorkerForm = () => {
    const workerForm = useSelector((state: RootState) => state.workerForm);
    const [coordinatesId, setCoordinatesId] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [personId, setPersonId] = useState("");
    const [status, setStatus] = useState<Status>(Status.REGULAR);
    const [position, setPosition] = useState<Position>(Position.BAKER);
    const [startDateErrorMessage, setStartDateErrorMessage] = useState("")
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

    const handleChangeStartDate = (newValue: Dayjs | null) => {
        if (newValue === null || !newValue.isValid()) {
            dispatch(setWorkerFormValueStartDate(null))
            return
        }
        dispatch(setWorkerFormValueStartDate(format(newValue.toDate(), 'dd.MM.yyyy')))
    }
    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };
    const handlePositionChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value as Position);
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
        if (workerForm.valueStartDate === null) {
            setStartDateErrorMessage("Specify the correct date")
            return
        }
        setStartDateErrorMessage("")

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const salary = parseFloat(formData.get("salary") as string);
        const rating = parseFloat(formData.get("rating") as string);

        let worker: Worker = {
            id: workerForm.currentWorkerId,
            creationDate: '',
            name: name,
            salary: salary,
            rating: rating,
            coordinatesId: parseInt(coordinatesId),
            status: status,
            position: position,
            organizationId: parseInt(organizationId),
            personId: parseInt(personId),
            creatorName: user.name,
            startDate: workerForm.valueStartDate!
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
                            <FormControl variant="outlined" fullWidth
                                         sx={{width: 150, marginTop: "3%", marginRight: "3%"}}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    id="status-select"
                                    value={status}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    required
                                    disabled={!workerForm.canUpdateObject}
                                >
                                    {Object.entries(Status).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" fullWidth
                                         sx={{width: 150, marginTop: "3%", marginLeft: "3%"}}>
                                <InputLabel>Position</InputLabel>
                                <Select
                                    id="position-select"
                                    value={position}
                                    onChange={handlePositionChange}
                                    label="Position"
                                    required
                                    disabled={!workerForm.canUpdateObject}
                                >
                                    {Object.entries(Position).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%",
                            marginTop: "3%"
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={dayjs(workerForm.valueStartDate, 'DD.MM.YYYY')}
                                    onChange={(newValue) => {
                                        handleChangeStartDate(newValue)
                                        setStartDateErrorMessage("")
                                    }}
                                    sx={{width: "170px"}}
                                    disabled={!workerForm.canUpdateObject}
                                />
                            </LocalizationProvider>
                            <Typography sx={{color: "red", height: "1em"}}
                                        variant="caption">{startDateErrorMessage}</Typography>
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
                            {workerForm.canUpdateObject ? <CreatePersonButton/> : ""}
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
                                    {persons.filter((person) => person.creatorName === user.name || person.id === workerForm.valuePersonId).map((person) =>
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
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default WorkerForm;