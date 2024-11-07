import React, {useEffect} from 'react'
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
    SelectChangeEvent
} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import {useSelector} from "react-redux";
import CoordinatesForm from "./CoordinatesForm";
import {setCoordinatesFormOpen} from "../../slices/formSlices/coordinatesFormSlice";
import {resetWorkerForm, setWorkerFormOpen} from "../../slices/formSlices/workerFormSlice";


const WorkerForm = () => {
    const workerForm = useSelector((state: RootState) => state.workerForm);
    const [coordinatesId, setCoordinatesId] = React.useState("");
    const [status, setStatus] = React.useState<Status>(Status.REGULAR);
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);
    const handleCoordinatesChange = (event: SelectChangeEvent) => {
        setCoordinatesId(event.target.value);
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };

    const handleClose = () => {
        dispatch(setWorkerFormOpen(false));
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
            status: status
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


    return (
        <Box>
            <Dialog
                open={workerForm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create Worker
                </DialogTitle>
                <DialogContent >
                    <Box>
                        <form onSubmit={handleAddWorker}>
                            <TextField name="name" label="Name" variant="standard" required
                                       defaultValue={workerForm.valueName !== null ? workerForm.valueName : ''}
                            />
                            <TextField name="salary" label="Salary" variant="standard" type={'number'} required
                                       InputProps={{inputProps: {min: 1}}}
                                       defaultValue={workerForm.valueSalary !== null ? workerForm.valueSalary : ''}/>
                            <TextField name="rating" label="Rating" variant="standard" type={'number'} required
                                       InputProps={{inputProps: {min: 1}}}
                                       defaultValue={workerForm.valueRating !== null ? workerForm.valueRating : ''}/>
                            <FormControl variant="outlined" fullWidth sx={{width: 150, marginTop: "3%"}}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    id="status-select"
                                    value={status}
                                    onChange={handleStatusChange}
                                    label="Status"
                                >
                                    {Object.entries(Status).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br></br>
                            <br></br>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button variant="contained" onClick={() => dispatch(setCoordinatesFormOpen(true))}>
                                    Create Coordinates
                                </Button>
                                <FormControl>
                                    <InputLabel>Coordinates</InputLabel>
                                    <Select
                                        id="select-coordinates"
                                        label="Coordinates"
                                        onChange={handleCoordinatesChange}
                                        required
                                        value={coordinatesId}
                                        sx={{width: 150}}
                                    >
                                        {coordinatesList.map((coordinates) =>
                                            <MenuItem key={coordinates.id}
                                                      value={coordinates.id}>({coordinates.x}; {coordinates.y})</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                                {workerForm.type === 'update' ?
                                    (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                             onClick={handleDeleteWorker}>Delete</Button>) : ""}
                                <Button variant="contained" type="submit"
                                        sx={{marginRight: '2%'}}>{workerForm.type === 'update' ? "Update " : "Create "}</Button>
                                <Button variant="outlined" onClick={handleClose}>Close</Button>
                            </Box>
                        </form>
                        <CoordinatesForm></CoordinatesForm>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default WorkerForm;