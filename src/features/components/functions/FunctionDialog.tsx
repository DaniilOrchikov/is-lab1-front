import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface FunctionDialogProps {
    open: boolean;
    setOpen: (f: boolean) => void;
    title: string;
    onSubmit: (event: React.FormEvent) => void;
}

const FunctionDialog: React.FC<FunctionDialogProps & { children: React.ReactNode }> = ({
                                                                                           open,
                                                                                           setOpen,
                                                                                           children,
                                                                                           title,
                                                                                           onSubmit,
                                                                                       }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    {children}
                    <Box sx={{ display: "flex", justifyContent: "right", marginTop: "4%" }}>
                        <Button variant="contained" sx={{ marginRight: "2%" }} type="submit">
                            Send
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FunctionDialog;