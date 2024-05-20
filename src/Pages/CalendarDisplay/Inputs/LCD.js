// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

export default function LCD (props) {

   // First, import any of the props items we'll need
   const { correlation, calcLCD } = props;

   // Next, define some local variables and how to set them
    const [ lcd, setLCD ] = useState( getLCDFromJDN( changeToJDN( new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), correlation) );

    // Handle user input selection events
    function handleLCDChange (event) {
        if (event.target.value >= -27792000 && event.target.value <= 28799999){
            setLCD(event.target.value);
            calcLCD(event.target.value);
        }
        
    }

    return(
        <Grid container justifyContent="center">
            <Grid item xs={12} md={12} sx={textboxStyle}>
                <TextField
                    id="lcd"
                    label="Enter Long Count Decimal"
                    value={lcd}
                    type="number"
                    onChange={(event) => handleLCDChange(event)}
                    helperText="Use -27,792,000 to 28,799,999"
                    InputProps={{ inputProps: { min:-27792000, max: 28799999 } }}
                />
            </Grid>
            {/*<Grid item md={9}></Grid>*/}
        </Grid>
    );

}

LCD.propTypes = {
    correlation: PropTypes.number.isRequired,
    calcLCD: PropTypes.func.isRequired,
};

