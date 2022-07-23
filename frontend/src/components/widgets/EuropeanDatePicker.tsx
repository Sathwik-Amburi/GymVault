import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';


class EDProps {
    defaultValue?: Date;
    min?: Date;
    max?: Date;
    value?: string;
    setValue?: (p: string) => void;
    validator?: (p: string) => boolean;
}

export default function EuropeanDatePicker(props: EDProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                
                displayStaticWrapperAs="desktop"
                inputFormat="DD/MM/YYYY"
                minDate={props.min}
                maxDate={props.max}
                value={moment(props.value, "DD/MM/YYYY").toDate()}
                onChange={(d) => {
                    if(d !== undefined && d !== null) props.setValue!(moment(d, "DD/MM/YYYY").format("DD/MM/YYYY"))
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
