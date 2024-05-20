// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the functions that we'll need
import { getTzolkPos } from '../../../Functions/CalendarRound';

// Import the data arrays that we'll need too
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS } from '../../../Data/CalendarRoundData';

export default function TzolkDiff(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define all the local variables and ways to change them
    const [ tzolkinCoefficient,  setTCoeff  ] = useState(1);
    const [ tzolkinName,         setTName   ] = useState(0);
    const [ tzolkinCoefficient2, setTCoeff2 ] = useState(1);
    const [ tzolkinName2,        setTName2  ] = useState(0);

    // Handle changes based on user selection
    function handleTzolkinCoefficientChange (event) {
        setTCoeff(event.target.value);
    }

    function handleTzolkinNameChange (event) {
        setTName(event.target.value);
    }

    function handleTzolkinCoefficientChange2 (event) {
        setTCoeff2(event.target.value);
    }

    function handleTzolkinNameChange2 (event) {
        setTName2(event.target.value);
    }

    return(

        <Grid container>

            <Grid item md={9}>

                <Grid container>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TN1">1st Tzolk'in Number</InputLabel>
                            <Select 
                                value={tzolkinCoefficient} 
                                onChange={(event) => handleTzolkinCoefficientChange(event)}
                                labelid="TN1"
                                label="1st Tzolk'in Number"
                            >
                                {TZOLKIN_COEFFICIENTS.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TM1">1st Tzolk'in Name</InputLabel>
                            <Select 
                                value={tzolkinName} 
                                onChange={(event) => handleTzolkinNameChange(event)}
                                labelid="TM1"
                                label="1st Tzolk'in Name"
                            >
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TN2">2nd Tzolk'in Number</InputLabel>
                            <Select 
                                value={tzolkinCoefficient2} 
                                onChange={(event) => handleTzolkinCoefficientChange2(event)}
                                labelid="TN2"
                                label="2nd Tzolk'in Number"
                            >
                                {TZOLKIN_COEFFICIENTS.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TM2">2nd Tzolk'in Name</InputLabel>
                            <Select 
                                value={tzolkinName2} 
                                onChange={(event) => handleTzolkinNameChange2(event)}
                                labelid="TM2"
                                label="2nd Tzolk'in Name"
                            >
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


            </Grid>

            <Grid item md={3}>
                Distance from {tzolkinCoefficient + ' ' + TZOLKIN_NAMES[tzolkinName][names] + ' '} 
                    to {tzolkinCoefficient2 + ' ' + TZOLKIN_NAMES[tzolkinName2][names] + ' '}
                    is {getTzolkPos(tzolkinCoefficient2 - 1 , tzolkinName2) - 
                        getTzolkPos(tzolkinCoefficient - 1, tzolkinName) } days
            </Grid>

        </Grid>
    );

}

TzolkDiff.propTypes = {
    names: PropTypes.string.isRequired,
}

