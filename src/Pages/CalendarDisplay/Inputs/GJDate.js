// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

export default function  GJDate(props) {

    // First, import any of the props items we'll need
    const { correlation, calcLCD } = props;

    // Next, define some local variables and how to set them
    const [ type,  setType  ] = useState('g');
    const [ year,  setYear  ] = useState( new Date().getFullYear());
    const [ month, setMonth ] = useState( new Date().getMonth() + 1);
    const [ day,   setDay   ] = useState( new Date().getDate() );

    // Handle changes triggered by user selection of inputs
    function handleTypeChange (event) {
        setType(event.target.value);
        calcLCD(getLCDFromJDN(changeToJDN( day, month, year, event.target.value), correlation));
    }

    function handleYearChange (event) {
        if (event.target.value >= -3113 && event.target.value <= 4772) {
            setYear(event.target.value);
            calcLCD(getLCDFromJDN(changeToJDN( day, month, event.target.value, type), correlation));
        }
    }

    function handleMonthChange (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            setMonth(event.target.value);
            calcLCD(getLCDFromJDN(changeToJDN( day, event.target.value, year, type), correlation));
        }
    }

    function handleDayChange (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            setDay(event.target.value);
            calcLCD(getLCDFromJDN(changeToJDN( event.target.value, month, year, type), correlation));
        }
    }

    return(

        <Grid container justifyContent="center">

            <Grid item xs={12} md={12}>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="GJ">Select Calendar</InputLabel>
                <Select
                    value={type}
                    onChange={(event) => handleTypeChange(event)}
                    labelid="GJ"
                    label="Select Calendar"
                >
                    <MenuItem value="g">Gregorian</MenuItem>
                    <MenuItem value="j">Julian</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} md={12} sx={textboxStyle}>
                <TextField
                    id="year"
                    label="Year"
                    value={year}
                    type="number"
                    onChange={(event) => handleYearChange(event)}
                    helperText="-4800 to 4800"
                    InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                />
            </Grid>
            <Grid item xs={4} md={12} sx={textboxStyle}>
                <TextField
                    id="month"
                    label="Month"
                    value={month}
                    type="number"
                    onChange={(event) => handleMonthChange(event)}
                    helperText="1 to 12"
                    InputProps={{ inputProps: { min: 1, max: 12 } }}
                />
            </Grid>
            <Grid item xs={4} md={12} sx={textboxStyle}>
                <TextField
                    id="day"
                    label="Day"
                    value={day}
                    type="number"
                    onChange={(event) => handleDayChange(event)}
                    helperText="1 to 31"
                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                />
            </Grid>
        </Grid>
    );
}

GJDate.propTypes = {
    correlation: PropTypes.number.isRequired,
    calcLCD: PropTypes.func.isRequired,
};
