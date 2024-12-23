import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import store, {useAppDispatch} from "../../../store";
import Header from "../Header";
import {approveAdminApplication, fetchAdminApplications, rejectAdminApplication} from "../../api/adminApi";
import {addPopup} from "../../slices/popupSlice";
import {PopupTypes} from "../../../types";

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const [applications, setApplications] = useState<{ id: number, userName: string }[]>([])
    useEffect(() => {
        async function f() {
            setApplications(await fetchAdminApplications())
        }

        const fetchAdmins = () => {
            f();
        };

        const intervalId = setInterval(fetchAdmins, 1000);

        fetchAdmins();

        return () => clearInterval(intervalId);
    }, [dispatch]);

    async function handleDelete(applicationId: number) {
        rejectAdminApplication(applicationId).then((status) => {
            if (status === 200) {
                setApplications(applications.filter(application => application.id !== applicationId))
                store.dispatch(addPopup({message: `The application was rejected`, duration: 5000, type: PopupTypes.SUCCESS}))
            }
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
                store.dispatch(addPopup({
                    message: `The application is no longer in the queue`,
                    duration: 5000,
                    type: PopupTypes.ERROR
                }))
            } else {
                store.dispatch(addPopup({message: `Unexpected error`, duration: 5000, type: PopupTypes.ERROR}))
            }
        });
    }

    async function handleAdd(applicationId: number) {
        approveAdminApplication(applicationId).then((status) => {
            if (status === 200) {
                store.dispatch(addPopup({message: `The application has been confirmed`, duration: 5000, type: PopupTypes.SUCCESS}))
            }
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
                store.dispatch(addPopup({
                    message: `The application is no longer in the queue`,
                    duration: 5000,
                    type: PopupTypes.ERROR
                }))
            } else {
                store.dispatch(addPopup({message: `Unexpected error`, duration: 5000, type: PopupTypes.ERROR}))
            }
        });
        setApplications(await fetchAdminApplications())
    }

    return (<>
        <Header/>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 2,
        }}>
            <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                <Typography variant="h4">List of requests to join the administrators</Typography>
                <Box sx={{width: 600}}>
                    {applications.length > 0 ? applications.map(({id, userName}) => (
                        <Paper key={id} elevation={3}
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
                                ApplicationId: {id}, Username: {userName}
                            </Typography>
                            <Button variant="text" sx={{color: "Green"}} onClick={() => (handleAdd(id))}>Add</Button>
                            <Button variant="text" sx={{color: "red"}}
                                    onClick={() => (handleDelete(id))}>Delete</Button>
                        </Paper>
                    )) : <Typography variant="h6">The list is empty</Typography>}
                </Box>
            </Paper>
        </Box>
    </>)
}

export default AdminPage