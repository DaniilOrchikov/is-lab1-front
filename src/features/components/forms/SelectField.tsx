import React from 'react';
import {FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';

interface SelectFieldProps {
    label: string;
    value: any;
    changeHandler: (event: SelectChangeEvent<any>) => void
    options: { label: string; value: string | number }[];
    disabled?: boolean;
    style?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({label, value, changeHandler, options, disabled = false, style}) => (
    <FormControl variant="outlined" fullWidth sx={style}>
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            onChange={changeHandler}
            label={label}
            required
            disabled={disabled}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default SelectField;
