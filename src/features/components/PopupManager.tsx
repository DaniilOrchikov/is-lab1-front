import {Alert, Box} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {PopupTypes} from "../../types";

const PopupManager = () => {
    const popups = useSelector((state: State) => state.popups);

    return (
        <Box sx={{position: 'absolute', top: '10%', right: '1%', marginRight: '2%', width: '15%'}}>
            {popups.map(popup => <Alert key={popup.message} sx={{margin: '1%', width: '100%'}}
                                        severity={
                                            popup.type === PopupTypes.ERROR ? 'error' :
                                                popup.type === PopupTypes.INFO ? 'info' :
                                                    popup.type === PopupTypes.SUCCESS ? 'success' : 'warning'}
            >{popup.message}</Alert>)}
        </Box>
    );
}

export default PopupManager