import React, {useState} from 'react'
import {RootState, useAppDispatch} from "../../../store";
import {
    createWorkerThunk, deleteWorkerByIdThunk, updateWorkerThunk
} from '../../slices/workerSlice';
import {Position, Status, Worker} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useSelector} from "react-redux";
import {
    resetWorkerForm,
    setWorkerFormOpen,
    setWorkerFormValueCoordinatesId,
    setWorkerFormValueName,
    setWorkerFormValueOrganizationId, setWorkerFormValuePersonId,
    setWorkerFormValuePosition,
    setWorkerFormValueRating,
    setWorkerFormValueSalary,
    setWorkerFormValueStartDate,
    setWorkerFormValueStatus
} from "../../slices/formSlices/workerFormSlice";
import CreateCoordinatesButton from "../buttons/CreateCoordinatesButton";
import CreateOrganizationButton from "../buttons/CreateOrganizationButton";
import CreatePersonButton from "../buttons/CreatePersonButton";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {format} from "date-fns";
import dayjs, {Dayjs} from "dayjs";
import SelectField from "./SelectField";


const WorkerForm = () => {
    const workerForm = useSelector((state: RootState) => state.workerForm);
    const [startDateErrorMessage, setStartDateErrorMessage] = useState("")
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);
    const organizations = useSelector((state: RootState) => state.organizations);
    const persons = useSelector((state: RootState) => state.persons);
    const user = useSelector((state: RootState) => state.user);

    const handleChangeStartDate = (newValue: Dayjs | null) => {
        if (newValue === null || !newValue.isValid()) {
            dispatch(setWorkerFormValueStartDate(null))
            return
        }
        dispatch(setWorkerFormValueStartDate(format(newValue.toDate(), 'dd.MM.yyyy')))
    }

    const handleClose = () => {
        dispatch(setWorkerFormOpen(false));
        dispatch(resetWorkerForm())
    };
    const dispatch = useAppDispatch();

    const handleAddWorker = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (workerForm.valueStartDate === null) {
            setStartDateErrorMessage("Specify the correct date")
            return
        }
        setStartDateErrorMessage("")

        let worker: Worker = {
            id: workerForm.currentWorkerId,
            creationDate: '',
            name: workerForm.valueName,
            salary: workerForm.valueSalary,
            rating: workerForm.valueRating,
            coordinatesId: workerForm.valueCoordinatesId,
            status: workerForm.valueStatus,
            position: workerForm.valuePosition,
            organizationId: workerForm.valueOrganizationId,
            personId: workerForm.valuePersonId,
            creatorName: user.name,
            startDate: workerForm.valueStartDate!
        } as Worker;
        if (workerForm.type === 'update') {
            dispatch(updateWorkerThunk(worker))
        } else {
            dispatch(createWorkerThunk(worker));
        }

        dispatch(resetWorkerForm())
        handleClose()
    }

    const handleDeleteWorker = () => {
        dispatch(deleteWorkerByIdThunk(workerForm.currentWorkerId))
        dispatch(resetWorkerForm())
        handleClose()
    }


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
                        are not its creator.</Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleAddWorker}>
                        <TextField name="name" label="Name" variant="standard" required
                                   value={workerForm.valueName}
                                   disabled={!workerForm.canUpdateObject}
                                   onChange={(event) => {
                                       dispatch(setWorkerFormValueName(event.target.value))
                                   }}
                        />
                        <TextField name="salary" label="Salary" variant="standard" type={'number'} required
                                   onChange={(event) => {
                                       const value = parseInt(event.target.value, 10);
                                       if (!isNaN(value)) {
                                           dispatch(setWorkerFormValueSalary(parseInt(event.target.value)))
                                       } else {
                                           dispatch(setWorkerFormValueSalary(null))
                                       }
                                   }}
                                   InputProps={{inputProps: {min: 1}}}
                                   defaultValue={workerForm.valueSalary}
                                   disabled={!workerForm.canUpdateObject}/>
                        <TextField name="rating" label="Rating" variant="standard" type={'number'}
                                   onChange={(event) => {
                                       const value = parseInt(event.target.value, 10);
                                       if (!isNaN(value)) {
                                           dispatch(setWorkerFormValueRating(parseInt(event.target.value)))
                                       } else {
                                           dispatch(setWorkerFormValueRating(null))
                                       }
                                   }}
                                   InputProps={{inputProps: {min: 1}}}
                                   defaultValue={workerForm.valueRating}
                                   disabled={!workerForm.canUpdateObject}/>
                        <Box sx={{display: 'flex', justifyContent: 'center', marginTop:"4%"}}>
                            <SelectField label="Status"
                                         value={workerForm.valueStatus}
                                         changeHandler={(event) => dispatch(setWorkerFormValueStatus(event.target.value as Status))}
                                         options={Object.values(Status).map(status => ({label: status, value: status}))}
                                         disabled={!workerForm.canUpdateObject}
                                         className="select-enum"/>
                            <SelectField label="Position"
                                         value={workerForm.valuePosition}
                                         changeHandler={(event) => dispatch(setWorkerFormValuePosition(event.target.value as Position))}
                                         options={Object.values(Position).map(position => ({
                                             label: position,
                                             value: position
                                         }))}
                                         disabled={!workerForm.canUpdateObject}
                                         className="select-enum"
                                         required={false}/>
                        </Box>
                        <Box className="block-column">
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
                        <Box className="block-column">
                            {workerForm.canUpdateObject ? <CreateCoordinatesButton sx={{width: "40%"}}/> : ""}
                            <Box className="select-object-box">
                                <SelectField label="Coordinates"
                                             value={workerForm.valueCoordinatesId || ''}
                                             changeHandler={(event) => dispatch(setWorkerFormValueCoordinatesId(parseInt(event.target.value as string)))}
                                             options={coordinatesList.filter((coordinates) => coordinates.creatorName === user.name || coordinates.id === workerForm.valueCoordinatesId  || (user.admin && coordinates.creatorName === workerForm.creatorName)).map(coordinates => ({
                                                 label: `${coordinates.x}; ${coordinates.y}`,
                                                 value: coordinates.id
                                             }))}
                                             disabled={!workerForm.canUpdateObject}/>
                            </Box>
                        </Box>
                        <Box className="block-column">
                            {workerForm.canUpdateObject ? <CreateOrganizationButton sx={{width: "40%"}}/> : ""}
                            <Box  className="select-object-box">
                                <SelectField label="Organization"
                                             value={workerForm.valueOrganizationId || ''}
                                             changeHandler={(event) => dispatch(setWorkerFormValueOrganizationId(parseInt(event.target.value as string)))}
                                             options={organizations.filter((organization) => organization.creatorName === user.name || organization.id === workerForm.valueOrganizationId || (user.admin && organization.creatorName === workerForm.creatorName)).map(organization => ({
                                                 label: `${organization.fullName}, rating: ${organization.rating}`,
                                                 value: organization.id
                                             }))}
                                             disabled={!workerForm.canUpdateObject}
                                             required={false}/>
                            </Box>
                        </Box>
                        <Box className="block-column">
                            {workerForm.canUpdateObject ? <CreatePersonButton sx={{width: "40%"}}/> : ""}
                            <Box  className="select-object-box">
                                <SelectField label="Person"
                                             value={workerForm.valuePersonId || ''}
                                             changeHandler={(event) => dispatch(setWorkerFormValuePersonId(parseInt(event.target.value as string)))}
                                             options={persons.filter((person) => person.creatorName === user.name || person.id === workerForm.valuePersonId || (user.admin && person.creatorName === workerForm.creatorName)).map(person => ({
                                                 label: `eyeColor: ${person.eyeColor}, hairColor: ${person.hairColor}, height: ${person.height}, nationality: ${person.nationality}`,
                                                 value: person.id
                                             }))}
                                             disabled={!workerForm.canUpdateObject}
                                             required={false}/>
                            </Box>
                        </Box>

                        <Box className="buttons">
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