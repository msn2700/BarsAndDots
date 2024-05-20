// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import all the functions we'll use
import { getHaabCoeffList } from '../../../Functions/CalendarRound';

// Import all the data arrays that we'll need
import { TZOLKIN_NAMES, HAAB_NAMES } from '../../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

export default function CRInput(props) {

    // First, import any of the props items we'll need
    const { calcCR, names } = props;

    // Next, define all the local variables and ways to change them
    const [ tzolkinCoefficient,  setTCoeff ] = useState(0);
    const [ tzolkinName,         setTName  ] = useState(15);
    const [ haabCoefficient,     setHCoeff ] = useState(1);
    const [ haabName,            setHName  ] = useState(3);

    // Note that how we send the Haab coefficient to this.props is slightly different for each handle() function below
    function handleTzolkinCoefficientChange (event) {
        setTCoeff(event.target.value);
        calcCR(event.target.value, tzolkinName, getHaabCoeffList(tzolkinName, haabName)[haabCoefficient], haabName);
    }

    function handleTzolkinNameChange (event) {
        setTName(event.target.value);
        calcCR(tzolkinCoefficient, event.target.value, getHaabCoeffList(event.target.value, haabName)[haabCoefficient], haabName);
    }

    function handleHaabCoefficientChange (event) {
        setHCoeff(event.target.value);
        calcCR(tzolkinCoefficient, tzolkinName, getHaabCoeffList(tzolkinName, haabName)[event.target.value], haabName);
    }

    function handleHaabNameChange (event) {
        setHName(event.target.value);
        calcCR(tzolkinCoefficient, tzolkinName, getHaabCoeffList(tzolkinName, event.target.value)[haabCoefficient], event.target.value);
    }

    return(

        <Grid container>

            <Grid item md={2}></Grid>
            <Grid item xs={12} md={2} sx={textboxStyle}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="TN">Tzolk'in Day Number</InputLabel>
                    <Select 
                        value={tzolkinCoefficient} 
                        onChange={(event) => handleTzolkinCoefficientChange(event)}
                        labelid="TN"
                        label="Tzolk'in Day Number"
                    >
                        {/* Only a single value is allowed here */}
                        <MenuItem value={0}>{1}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={textboxStyle}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="TD">Tzolk'in Day Name</InputLabel>
                    <Select 
                        value={tzolkinName} 
                        onChange={(event) => handleTzolkinNameChange(event)}
                        labelid="TD"
                        label="Tzolk'in Day Name"
                    >
                        {TZOLKIN_NAMES.map((name, index) => {
                            return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={textboxStyle}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="HD">Haab Day</InputLabel>
                    <Select 
                        value={haabCoefficient} 
                        onChange={(event) => handleHaabCoefficientChange(event)}
                        labelid="HD"
                        label="Haab Day"
                    >

                        {/* Here we need to restrict Haab coefficients depending on Tzolkin day name, if one is chosen
                            We also need to restrict Haab coefficients depending on Haab month name, i.e. Uayeb */}
                        {getHaabCoeffList(tzolkinName, haabName).map((name, index) => {
                            return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                        })}

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={textboxStyle}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="HM">Haab Month</InputLabel>
                    <Select 
                        value={haabName} 
                        onChange={(event) => handleHaabNameChange(event)}
                        labelid="HM"
                        label="Haab Month"
                    >
                        {/* No restrictions are placed here */}
                        {HAAB_NAMES.map((name, index) => {
                        return (<MenuItem value={index} key={index}>{name[names]}</MenuItem>) 
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={2}></Grid>

        </Grid>
    );

}

CRInput.propTypes = {
    calcCR: PropTypes.func.isRequired,
    names: PropTypes.string.isRequired,
};
