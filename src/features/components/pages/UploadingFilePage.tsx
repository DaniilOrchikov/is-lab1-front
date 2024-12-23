import React, {useEffect, useState} from "react";
import Header from "../Header";
import Paper from "@mui/material/Paper";
import {Box, Typography} from "@mui/material";
import {useAppDispatch} from "../../../store";
import {fetchHistory, uploadFile} from "../../api/uploadingFileApi";
import InputFileUpload from "../InputFileUpload";

const UploadingFilePage = () => {
    const dispatch = useAppDispatch();
    const [applications, setApplications] = useState<{
        id: number,
        status: string,
    }[]>([])
    useEffect(() => {
        async function f() {
            setApplications(await fetchHistory())
        }

        const fetchHistoryFunction = () => {
            f();
        };

        const intervalId = setInterval(fetchHistoryFunction, 10000);

        fetchHistoryFunction();

        return () => clearInterval(intervalId);
    }, [dispatch]);


    const uploadingFile = (file:File) => {
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData).then(res => {
            console.log("OK")
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <>
            <Header/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 2,
            }}>
                <Paper elevation={3} sx={{padding: '1%', width: 'max-content'}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <InputFileUpload onChange={uploadingFile}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop:20}}>
                        <Typography variant="h4">History</Typography>
                    </div>
                    <Box sx={{width: 600}}>
                        {applications.length > 0 ? applications.map(({id, status}) => (
                            <Paper key={id} elevation={3}
                                   sx={{
                                       display: "flex",
                                       margin: 1,
                                       paddingRight: 1,
                                       paddingLeft: 1,
                                       width: "94%",
                                       backgroundColor: status === "OK" ? "rgb(0, 255, 0, 0.3)" : "rgb(255, 0, 0, 0.3)",
                                   }}>
                                <Typography sx={{
                                    flexGrow: 1,
                                    wordWrap: 'break-word',
                                    overflow: 'hidden',
                                    paddingTop: "9px",
                                    marginBottom: "9px",
                                    marginLeft: "15px"
                                }}>
                                    ID: {id}, Status: {status}
                                </Typography>
                            </Paper>
                        )) : <Typography variant="h6">The list is empty</Typography>}
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
export default UploadingFilePage;