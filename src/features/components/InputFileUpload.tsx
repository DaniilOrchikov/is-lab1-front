import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface InputFileUploadProps {
    onChange: (value: File) => void;
}

export default function InputFileUpload({onChange}: InputFileUploadProps) {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon/>}
        >
            Upload file
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                    onChange(event.target.files![0])
                    event.target.value = '';
                }}
                name="file"
                accept=".json"
            />
        </Button>
    );
}
