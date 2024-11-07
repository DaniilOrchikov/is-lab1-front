import React from 'react'
import {State, useAppDispatch} from "../../store";
import {
    fetchWorkersThunk,
    createWorkerThunk
} from '../slices/workersSlice';
import {Status, Worker} from '../../types';
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
import CreateCoordinatesForm from "./CreateCoordinatesForm";
import {setCreateCoordinatesOpen} from "../slices/formSlices/createCoordinatesSlice";
import {setCreateWorkerOpen} from "../slices/formSlices/createWorkerSlice";


const CreateWorkerForm = () => {
    const createWorkerFormOpen = useSelector((state: State) => state.createWorkerFormOpen);
    const [coordinatesId, setCoordinatesId] = React.useState("");
    const [status, setStatus] = React.useState<Status>(Status.REGULAR);
    const coordinatesList = useSelector((state: State) => state.coordinatesList);
    const handleCoordinatesChange = (event: SelectChangeEvent) => {
        setCoordinatesId(event.target.value);
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };

    const handleClose = () => {
        dispatch(setCreateWorkerOpen(false));
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
            id: -1,
            name: name,
            salary: salary,
            rating: rating,
            coordinatesId: parseInt(coordinatesId),
            status:status
        };
        dispatch(createWorkerThunk(worker));
        handleClose()
        setCoordinatesId("")
    }


    return (
        <Box>
            <Dialog
                open={createWorkerFormOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create Worker
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <form onSubmit={handleAddWorker}>
                            <TextField name="name" label="Name" variant="standard" required/>
                            <TextField name="salary" label="Salary" variant="standard" type={'number'} required
                                       InputProps={{inputProps: {min: 1}}}/>
                            <TextField name="rating" label="Rating" variant="standard" type={'number'} required
                                       InputProps={{inputProps: {min: 1}}}/>
                            <FormControl variant="outlined" fullWidth sx={{width: 150, marginTop:"3%"}}>
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
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
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
                                <Button variant="contained" onClick={()=>dispatch(setCreateCoordinatesOpen(true))}>
                                    Create Coordinates
                                </Button>
                            </Box>

                            <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                                <Button variant="contained" type="submit" sx={{marginRight: '2%'}}>Create
                                    Worker</Button>
                                <Button variant="outlined" onClick={handleClose}>Close</Button>
                            </Box>
                        </form>
                        <CreateCoordinatesForm></CreateCoordinatesForm>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CreateWorkerForm;