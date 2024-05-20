// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { getLCDFromJDN, changeToJDN} from '../../../Functions/JulianDayNumber';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

export default function JDN(props) {

   // First, import any of the props items we'll need
   const { correlation, calcLCD } = props;

   // Next, define some local variables and how to set them
    const [ jdn, setJDN ] = useState( changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g') );

    // Handle changes to the user input
    function changeJDN (event) {
        if (event.target.value >= -27207717 && event.target.value <= 29384282){
            setJDN(event.target.value);
            calcLCD(getLCDFromJDN(event.target.value, correlation));
        }
    }

    return(
        <Grid container justifyContent="center">
            <Grid item xs={12} md={12} sx={textboxStyle}>
                <TextField
                    id="jdn"
                    label="Enter Julian Day Number"
                    value={jdn}
                    type="number"
                    onChange={(event) => changeJDN(event)}
                    helperText="Use -27,207,717 to 29,384,282"
                    InputProps={{ inputProps: { min: -27207717, max: 29384282 } }}
                />
            </Grid>
            {/*<Grid item md={9}></Grid>*/}
        </Grid>
    );

}

JDN.propTypes = {
    calcLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};


