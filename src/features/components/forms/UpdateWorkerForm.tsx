import React, {forwardRef, useImperativeHandle} from 'react'
import {State, useAppDispatch} from "../../../store";
import {fetchWorkersThunk, updateWorkerThunk} from '../../slices/workersSlice';
import {PopupTypes, Worker} from '../../../types';
import Button from '@mui/material/Button';
import {Box, Dialog, DialogContent, DialogTitle, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useSelector} from "react-redux";
import {addPopup} from "../../slices/popupSlice";


const UpdateWorkerForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        handleClickOpen(id: number) {
            const worker = workers.find(worker => worker.id === id)
            if (worker !== undefined) {
                setWorker(worker);
                setOpen(true);
            } else {
                dispatch(addPopup({message: `There is no employee with id ${id}`, duration: 5000, type:PopupTypes.ERROR}))
            }
        }
    }));
    const [open, setOpen] = React.useState(false);
    const [worker, setWorker] = React.useState<Worker | null>(null);
    const [coordinatesId, setCoordinatesId] = React.useState(-1);


    const workers = useSelector((state: State) => state.workers);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
    };


    const handleUpdateWorker = (event: React.FormEvent<HTMLFormElement>) => {
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

        // let updatedWorker: Worker = {id: worker!.id, name: name, salary: salary, rating: rating, coordinatesId: coordinatesId};
        // dispatch(updateWorkerThunk(updatedWorker));
        // dispatch(fetchWorkersThunk());
        // handleClose()
    }

    const handleCoordinatesChange = (event: SelectChangeEvent) => {
        setCoordinatesId(parseFloat(event.target.value));
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Update Worker (id:{worker !== null ? worker.id : -1})
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <form onSubmit={handleUpdateWorker}>
                            <TextField defaultValue={worker !== null ? worker.name : ""} name="name" label="Name"
                                       variant="standard" required/>
                            <TextField defaultValue={worker !== null ? worker.salary : -1} name="salary" label="Salary"
                                       variant="standard" type={'number'} required/>
                            <TextField defaultValue={worker !== null ? worker.rating : -1} name="rating" label="Rating"
                                       variant="standard" type={'number'} required/>
                            <InputLabel id="select-coordinates">Coordinates</InputLabel>
                            <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                                <Button variant="contained" type="submit" sx={{marginRight: '2%'}}>Update
                                    Worker</Button>
                                <Button variant="outlined" onClick={handleClose}>Close</Button>
                            </Box>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
});

export default UpdateWorkerForm;