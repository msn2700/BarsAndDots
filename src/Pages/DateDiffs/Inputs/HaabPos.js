// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { getHaabPos } from '../../../Functions/CalendarRound';

// Import data arrays that we'll need
import { HAAB_NAMES, ALLOWED_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

export default function HaabPos(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define all the local variables and ways to change them
    const [ haabCoefficient, setHCoeff ] = useState(0);
    const [ haabName, setHName ] = useState(0);
 
    // Handle changes based on user selection
    function handleHaabCoefficientChange (event) {
        setHCoeff(event.target.value);
    }

    function handleHaabNameChange (event) {
        setHName(event.target.value);
        setHCoeff(ALLOWED_HAAB_COEFFICIENTS[event.target.value].Coefficients[0]);
    }


    return(
        <Grid container>

            <Grid item xs={12} md={9}>

                <Grid container>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HD">Haab Day</InputLabel>
                            <Select 
                                value={haabCoefficient} 
                                onChange={(event) => handleHaabCoefficientChange(event)}
                                labelid="HD"
                                label="Haab Day"
                            >
                                {ALLOWED_HAAB_COEFFICIENTS[haabName].Coefficients.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid> 
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HM">Haab Month</InputLabel>
                            <Select 
                                value={haabName} 
                                onChange={(event) => handleHaabNameChange(event)}
                                labelid="HM"
                                label="Haab Month"
                            >
                                {HAAB_NAMES.map((name, index) => {
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
                {parseInt(haabCoefficient, 10) + ' ' + HAAB_NAMES[haabName][names] + ' '} 
                is Day {getHaabPos(parseInt(haabCoefficient,10), haabName)} of the 365 Haab Day Cycle
            </Grid>

        </Grid>
    );

}

HaabPos.propTypes = {
    names: PropTypes.string.isRequired,
}
