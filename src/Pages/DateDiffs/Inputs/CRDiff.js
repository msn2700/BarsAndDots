// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the functions that we'll need
import { getTzolkPos, getHaabPos, getCRPos, crString, getHaabCoeffList } from '../../../Functions/CalendarRound';

// Import the various data arrays that we'll need
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS, ALLOWED_HAAB_NAMES, POSSIBLE_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

export default function CRDiff(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define all the local variables and ways to change them
    const [ tzolkinCoefficient,  setTCoeff ] = useState(1);
    const [ tzolkinName,         setTName  ] = useState(0);
    const [ haabCoefficient,     setHCoeff ] = useState(0);
    const [ haabName,            setHName  ] = useState(0);

    const [ tzolkinCoefficient2, setTCoeff2 ] = useState(1);
    const [ tzolkinName2,        setTName2  ] = useState(0);
    const [ haabCoefficient2,    setHCoeff2 ] = useState(0);
    const [ haabName2,           setHName2  ] = useState(0);

    // Handle changes on the first set of date part dropdowns
    function handleTzolkinCoefficientChange(event) {
        setTCoeff(event.target.value);
    }

    function handleTzolkinNameChange (event) {
        setTName(event.target.value);
        setHCoeff(POSSIBLE_HAAB_COEFFICIENTS[event.target.value].Coefficients[0]);
    }

    function handleHaabCoefficientChange (event) {
        setHCoeff(event.target.value)
    }

    function handleHaabNameChange (event) {
        setHName(event.target.value);
    }


    // Now handle the changes to the 2nd set of date parts
    function handleTzolkinCoefficientChange2 (event) {
        setTCoeff2(event.target.value);
    }

    function handleTzolkinNameChange2 (event) {
        setTName2(event.target.value);
        setHCoeff2(POSSIBLE_HAAB_COEFFICIENTS[event.target.value].Coefficients[0]);
    }

    function handleHaabCoefficientChange2 (event) {
        setHCoeff2(event.target.value);
    }

    function handleHaabNameChange2 (event) {
        setHName2(event.target.value);
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
                                {/* These coefficients have no dependency on the others: no restrictions */}
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
                                {/* We could restrict these based on Haab coefficient, but it would lead to a loop: no restrictions */}
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="HD1">1st Haab Day</InputLabel>
                            <Select 
                                value={haabCoefficient} 
                                onChange={(event) => handleHaabCoefficientChange(event)}
                                labelid="HD1"
                                label="1st Haab Day"
                            >
                                {/* Here we need to restrict Haab coefficients depending on Tzolkin day name, if one is chosen
                                    We also need to restrict Haab coefficients depending on Haab month name, i.e. Uayeb */}
                                {getHaabCoeffList(tzolkinName, haabName).map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
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
                                {/* Here we need to restrict Haab month name based on coefficient
                                    If the coefficient is known and >4, then Uayeb is not an option */}
                                {ALLOWED_HAAB_NAMES[haabCoefficient].Coefficients.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>


                <Grid container>
                    <Grid item xs={12} md={3}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="TN2">2nd Tzolk'in Number</InputLabel>
                            <Select 
                                value={tzolkinCoefficient2} 
                                onChange={(event) => handleTzolkinCoefficientChange2(event)}
                                labelid="TN2"
                                label="2nd Tzolk'in Number"
                            >
                                {/* These coefficients have no dependency on the others: no restrictions */}
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
                                {/* We could restrict these based on Haab coefficient, but it would lead to a loop: no restrictions */}
                                {TZOLKIN_NAMES.map((name, index) => {
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
                                {/* Here we need to restrict Haab coefficients depending on Tzolkin day name, if one is chosen
                                    We also need to restrict Haab coefficients depending on Haab month name, i.e. Uayeb */}
                                {getHaabCoeffList(tzolkinName2, haabName2).map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
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
                                {/* Here we need to restrict Haab month name based on coefficient
                                    If the coefficient is known and >4, then Uayeb is not an option */}
                                {ALLOWED_HAAB_NAMES[haabCoefficient2].Coefficients.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


            </Grid>

            <Grid item md={3}>
                
                Distance from 
                {' ' + crString({
                    tzolkinName: tzolkinName,
                    tzolkinCoefficient: tzolkinCoefficient - 1,
                    haabName: haabName,
                    haabCoefficient: getHaabCoeffList(tzolkinName, haabName)[haabCoefficient],
                }, names) + ' '} 
                to 
                {' ' + crString({
                    tzolkinName: tzolkinName2,
                    tzolkinCoefficient: tzolkinCoefficient2 - 1,
                    haabName: haabName2,
                    haabCoefficient: getHaabCoeffList(tzolkinName2, haabName2)[haabCoefficient2],
                }, names) + ' '} is {' ' + Number(getCRPos(getTzolkPos(tzolkinCoefficient2 - 1, tzolkinName2), getHaabPos(getHaabCoeffList(tzolkinName2, haabName2)[haabCoefficient2],haabName2))) 
                        - Number(getCRPos(getTzolkPos(tzolkinCoefficient  - 1, tzolkinName),  getHaabPos(getHaabCoeffList(tzolkinName, haabName)[haabCoefficient], haabName))) + ' '} days

            </Grid>
        </Grid>
    );

}

CRDiff.propTypes = {
    names: PropTypes.string.isRequired,
}
