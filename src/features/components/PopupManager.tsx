import {Alert, Box} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {PopupTypes} from "../../types";
import {deletePopup} from "../slices/popupSlice";

const PopupManager = () => {
    const user = useSelector((state:RootState) => state.user);
    const dispatch = useAppDispatch();

    const popups = useSelector((state: RootState) => state.popups).filter((popup)=>{
        if (!user.authorized){
            dispatch(deletePopup(popup))
            return false
        }
        return true
    })


    return (
        <Box sx={{position: 'absolute', top: '10%', right: '1%', marginRight: '2%', width: '15%'}}>
            {popups.map(popup => <Alert variant="filled" key={popup.id} sx={{margin: '1%', width: '100%'}}
                                        severity={
                                            popup.type === PopupTypes.ERROR ? 'error' :
                                                popup.type === PopupTypes.INFO ? 'info' :
                                                    popup.type === PopupTypes.SUCCESS ? 'success' : 'warning'}
            >{popup.message}</Alert>)}
        </Box>
    );
}

export default PopupManager