// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the various functions that we'll need
import { getTzolkPos } from '../../../Functions/CalendarRound';

// Import data arrays that we'll need
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS } from '../../../Data/CalendarRoundData';

export default function TzolkPos(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define all the local variables and ways to change them
    const [ tzolkinCoefficient,  setTCoeff  ] = useState(1);
    const [ tzolkinName,         setTName   ] = useState(0);

    // Handle changes based on user selection
    function handleTzolkinCoefficientChange (event) {
        setTCoeff(event.target.value);
    }

    function handleTzolkinNameChange (event) {
        setTName(event.target.value);
    }

    return(

        <Grid container>

            <Grid item xs={12} md={9}>

                <Grid container>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TN">Tzolk'in Number</InputLabel>
                            <Select 
                                value={tzolkinCoefficient} 
                                onChange={(event) => handleTzolkinCoefficientChange(event)}
                                labelid="TN"
                                label="Tzolk'in Number"
                            >
                                {TZOLKIN_COEFFICIENTS.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TM">Tzolk'in Name</InputLabel>
                            <Select 
                                value={tzolkinName} 
                                onChange={(event) => handleTzolkinNameChange(event)}
                                labelid="TM"
                                label="Tzolk'in Name"
                            >
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={false} md={6}>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item md={3}>
                {tzolkinCoefficient + ' ' + TZOLKIN_NAMES[tzolkinName][names] + ' '} 
                    is Day {getTzolkPos(tzolkinCoefficient - 1, tzolkinName)} of the 260 Tzolk'in Day Cycle
            </Grid>

        </Grid>
    );

}

TzolkPos.propTypes = {
    names: PropTypes.string.isRequired,
}
