// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

export default function GJDiff(props) {

    // First, import any of the props items we'll need
    const { correlation } = props;

    // Next, define all the local variables and ways to change them
    const [ type,  setType    ] = useState('g');
    const [ year,  setYear    ] = useState(new Date().getFullYear());
    const [ month, setMonth   ] = useState(new Date().getMonth() + 1);
    const [ day,   setDay     ] = useState(new Date().getDate());

    const [ type2,  setType2  ] = useState('g');
    const [ year2,  setYear2  ] = useState(new Date().getFullYear());
    const [ month2, setMonth2 ] = useState(new Date().getMonth() + 1);
    const [ day2,   setDay2   ] = useState(new Date().getDate());


    // Handle selection changes related to the 2nd date
    function handleTypeChange (event) {
        setType(event.target.value);
    }

    function handleYearChange (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            setYear(event.target.value);
        }
    }

    function handleMonthChange (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            setMonth(event.target.value);
        }
    }

    function handleDayChange (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            setDay(event.target.value);
        }
    }

    
    // Handle selection changes related to the 2nd date
    function handleType2Change (event) {
        setType2(event.target.value);
    }

    function handleYear2Change (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            setYear2(event.target.value);
        }
    }

    function handleMonth2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            setMonth2(event.target.value);
        }
    }

    function handleDay2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            setDay2(event.target.value);
        }
    }

    return(

        <Grid container>

            <Grid item md={9}>

                <Grid container >
                    <Grid item xs={12} md={2}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="GJ1">Select Calendar 1</InputLabel>
                            <Select
                                value={type}
                                onChange={(event) => handleTypeChange(event)}
                                labelId="GJ1"
                                label="Select Calendar 1"
                            >
                                <MenuItem value="g">Gregorian</MenuItem>
                                <MenuItem value="j">Julian</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <TextField
                            id="year"
                            label="Year1"
                            value={year}
                            type="number"
                            onChange={(event) => handleYearChange(event)}
                            helperText="-4800 to 4800"
                            InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                        />
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <TextField
                            id="month"
                            label="Month1"
                            value={month}
                            type="number"
                            onChange={(event) => handleMonthChange(event)}
                            helperText="1-12"
                            InputProps={{ inputProps: { min: 1, max: 12 } }}
                        />
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <TextField
                            id="day"
                            label="Day1"
                            value={day}
                            type="number"
                            onChange={(event) => handleDayChange(event)}
                            helperText="1-31"
                            InputProps={{ inputProps: { min: 1, max: 31 } }}
                        />
                    </Grid>
                </Grid>
                
                
                <Grid container>
                    <Grid item xs={12} md={2}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="GJ2">Select Calendar 2</InputLabel>
                            <Select
                                value={type2}
                                onChange={(event) => handleType2Change(event)}
                                labelId="GJ2"
                                label="Select Calendar 2"
                            >
                                <MenuItem value="g">Gregorian</MenuItem>
                                <MenuItem value="j">Julian</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <TextField
                            id="year2"
                            label="Year2"
                            value={year2}
                            type="number"
                            onChange={(event) => handleYear2Change(event)}
                            helperText="-4800 to 4800"
                            InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                        />
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <TextField
                            id="month2"
                            label="Month2"
                            value={month2}
                            type="number"
                            onChange={(event) => handleMonth2Change(event)}
                            helperText="1-12"
                            InputProps={{ inputProps: { min: 1, max: 12 } }}
                        />
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <TextField
                            id="day2"
                            label="Day2"
                            value={day2}
                            type="number"
                            onChange={(event) => handleDay2Change(event)}
                            helperText="1-31"
                            InputProps={{ inputProps: { min: 1, max: 31 } }}
                        />
                    </Grid>
                </Grid>
            </Grid>

                
            <Grid item md={3}>
                The distance between the two dates is {Number(getLCDFromJDN(changeToJDN(day2, month2, year2, type2), correlation)) - 
                Number(getLCDFromJDN(changeToJDN(  day,  month,  year, type), correlation))} days
            </Grid>

        </Grid>
    );

}

GJDiff.propTypes = {
    correlation: PropTypes.number.isRequired,
};

