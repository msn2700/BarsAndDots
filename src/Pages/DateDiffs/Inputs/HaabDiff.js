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

export default function HaabDiff(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define all the local variables and ways to change them
    const [ haabCoefficient, setHCoeff ] = useState(0);
    const [ haabName, setHName ] = useState(0);
    const [ haabCoefficient2, setHCoeff2 ] = useState(0);
    const [ haabName2, setHName2 ] = useState(0);

    // Handle changes based on user selection 
    function handleHaabCoefficientChange(event) {
        setHCoeff(event.target.value);
    }

    function handleHaabNameChange(event) {
        setHName(event.target.value);
        setHCoeff(ALLOWED_HAAB_COEFFICIENTS[event.target.value].Coefficients[0]);
    }

    function handleHaabCoefficientChange2(event) {
        setHCoeff2(event.target.value);
    }

    function handleHaabNameChange2(event) {
        setHName2(event.target.value);
        setHCoeff2(ALLOWED_HAAB_COEFFICIENTS[event.target.value].Coefficients[0]);
    }

    return(

        <Grid container>

            <Grid item md={9}>

                <Grid container>
                    <Grid item xs={12} md={3}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HD1">1st Haab Day</InputLabel>
                            <Select 
                                value={haabCoefficient} 
                                onChange={(event) => handleHaabCoefficientChange(event)}
                                labelid="HD1"
                                label="1st Haab Day"
                            >
                                {ALLOWED_HAAB_COEFFICIENTS[haabName].Coefficients.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HM1">1st Haab Month</InputLabel>
                            <Select 
                                value={haabName} 
                                onChange={(event) => handleHaabNameChange(event)}
                                labelid="HM1"
                                label="1st Haab Month"
                            >
                                {HAAB_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HD2">2nd Haab Day</InputLabel>
                            <Select 
                                value={haabCoefficient2} 
                                onChange={(event) => handleHaabCoefficientChange2(event)}
                                labelid="HD2"
                                label="2nd Haab Day"
                            >
                                {ALLOWED_HAAB_COEFFICIENTS[haabName2].Coefficients.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HM2">2nd Haab Month</InputLabel>
                            <Select 
                                value={haabName2} 
                                onChange={(event) => handleHaabNameChange2(event)}
                                labelid="HM2"
                                label="2nd Haab Month"
                            >
                                {HAAB_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </Grid>
            
            <Grid item md={3}>
                Distance from {parseInt(haabCoefficient,10) + ' ' + HAAB_NAMES[haabName][names] + ' '} 
                    to {parseInt(haabCoefficient2,10) + ' ' + HAAB_NAMES[haabName2][names] + ' '}
                    is {getHaabPos(parseInt(haabCoefficient2,10), haabName2) - 
                        getHaabPos(parseInt(haabCoefficient,10), haabName)} days
            </Grid>

        </Grid>
    );

}

HaabDiff.propTypes = {
    names: PropTypes.string.isRequired,
}

