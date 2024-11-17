import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {addAdmin, deleteAdmin, fetchAdminsQuery} from "../../api";
import {useAppDispatch} from "../../../store";

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const [admins, setAdmins] = useState<string[]>([])
    useEffect(() => {
        async function f() {
            setAdmins(await fetchAdminsQuery())
        }
        const fetchAdmins = () => {
            f();
        };

        const intervalId = setInterval(fetchAdmins, 5000);

        fetchAdmins();

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleDelete = (name:string) => {
        deleteAdmin(name)
    }
    const handleAdd = (name:string) => {
        addAdmin(name)
    }
    return (<Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 2,
    }}>
        <Typography variant="h3">List of requests to join the administrators</Typography>
        <Box sx={{width: 600}}>
            {admins.length > 0 ? admins.map((user) => (
                <Paper key={user} elevation={3}
                       sx={{
                           display: "flex",
                           margin: 1,
                           paddingRight: 1,
                           paddingLeft: 1,
                           width: "94%",
                       }}>
                    <Typography sx={{
                        flexGrow: 1,
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                        paddingTop: "9px",
                        marginBottom: "9px",
                        marginLeft: "15px"
                    }}>
                        Username: {user}
                    </Typography>
                    <Button variant="text" sx={{color: "Green"}} onClick={() => (handleAdd(user))}>Add</Button>
                    <Button variant="text" sx={{color: "red"}} onClick={() => (handleDelete(user))}>Delete</Button>
                </Paper>
            )) : <Typography variant="h6">The queue is empty</Typography>}
        </Box>
    </Box>)
}

export default AdminPage