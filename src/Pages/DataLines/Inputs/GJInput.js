// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, InputLabel, MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

export default function GJInput(props) {

    // First, import any of the props items we'll need
    const { correlation, calcLCD, calcEndLCD } = props;

    // Next, define some local variables and how to set them
    const [ type,  setType ] = useState('g');
    const [ year,  setYear ] = useState( new Date().getFullYear() - 1 );
    const [ month, setMonth ] = useState( new Date().getMonth() + 1 );
    const [ day,   setDay ] = useState( new Date().getDate() );

    const [ type2,  setType2 ] = useState('g');
    const [ year2,  setYear2 ] = useState( new Date().getFullYear() );
    const [ month2, setMonth2 ] = useState( new Date().getMonth() + 1 );
    const [ day2,   setDay2 ] = useState( new Date().getDate() );


    // These handles changes to the first date
    function handleTypeChange (event) {
        setType(event.target.value);
        calcLCD(getLCDFromJDN(changeToJDN( day, month, year, event.target.value), correlation));
    }

    function handleYearChange (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
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

    
    // These handle changes to the end dates

    function handleType2Change (event) {
        setType2(event.target.value);
        calcEndLCD(getLCDFromJDN(changeToJDN( day2, month2, year2, event.target.value), correlation));
    }

    function handleYear2Change (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            setYear2(event.target.value);
            calcEndLCD(getLCDFromJDN(changeToJDN( day2, month2, event.target.value, type2), correlation));
        }
    }

    function handleMonth2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            setMonth2(event.target.value);
            calcEndLCD(getLCDFromJDN(changeToJDN( day2, event.target.value, year2, type2), correlation));
        }
    }

    function handleDay2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            setDay2(event.target.value);
            calcEndLCD(getLCDFromJDN(changeToJDN( event.target.value, month2, year2, type2), correlation));
        }
    }


    return(

        <Grid container justifyContent="center">
            
            <Grid item xs={12} md={2} sx={{ marginTop: '25px', marginBottom: '10px' }}>
                Start:
            </Grid>

            <Grid item xs={12} md={3}>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="GJ1">Select Calendar</InputLabel>
                <Select
                    value={type}
                    onChange={(event) => handleTypeChange(event)}
                    labelid="GJ1"
                    label="Select Calendar"
                >
                    <MenuItem value="g">Gregorian</MenuItem>
                    <MenuItem value="j">Julian</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} md={2} sx={textboxStyle}>
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
            <Grid item xs={3} md={2} sx={textboxStyle}>
                <TextField
                    id="month"
                    label="Month"
                    value={month}
                    type="number"
                    onChange={(event) => handleMonthChange(event)}
                    helperText="1-12"
                    InputProps={{ inputProps: { min: 1, max: 12 } }}
                />
            </Grid>
            <Grid item xs={3} md={2} sx={textboxStyle}>
                <TextField
                    id="day"
                    label="Day"
                    value={day}
                    type="number"
                    onChange={(event) => handleDayChange(event)}
                    helperText="1-31"
                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                />
            </Grid>
            
            <Grid item xs={12} md={2} sx={{ marginTop: '25px', marginBottom: '10px' }}>End:</Grid>

            <Grid item xs={12} md={3}>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="GJ2">Select Calendar</InputLabel>
                <Select
                    value={type2}
                    onChange={(event) => handleType2Change(event)}
                    labelid="GJ2"
                    label="Select Calendar"
                >
                    <MenuItem value="g">Gregorian</MenuItem>
                    <MenuItem value="j">Julian</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} md={2} sx={textboxStyle}>
                <TextField
                    id="year2"
                    label="Year"
                    value={year2}
                    type="number"
                    onChange={(event) => handleYear2Change(event)}
                    helperText="-4800 to 4800"
                    InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                />
            </Grid>
            <Grid item xs={3} md={2} sx={textboxStyle}>
                <TextField
                    id="month2"
                    label="Month"
                    value={month2}
                    type="number"
                    onChange={(event) => handleMonth2Change(event)}
                    helperText="1-12"
                    InputProps={{ inputProps: { min: 1, max: 12 } }}
                />
            </Grid>
            <Grid item xs={3} md={2} sx={textboxStyle}>
                <TextField
                    id="day2"
                    label="Day"
                    value={day2}
                    type="number"
                    onChange={(event) => handleDay2Change(event)}
                    helperText="1-31"
                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                />
            </Grid>


        </Grid>
    );
    
}

GJInput.propTypes = {
    calcLCD: PropTypes.func.isRequired,
    calcEndLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};
