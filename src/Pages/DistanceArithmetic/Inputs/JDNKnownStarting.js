// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '5px',
}

export default function JDNKnownStarting(props) {

    // First, import any of the props items we'll need
    const { jdn, calculateJDN } = props;

    // Next, define some local variables and how to set them
    const [ jdnLocal, setJDNlocal ] = useState(jdn);


    function changeJDN (event) {
        if (event.target.value >= 0 && event.target.value <= 9999999) {
            setJDNlocal(event.target.value);
            calculateJDN(event.target.value);
        }
    }

    return(
        <Grid container justifyContent="center">
            <Grid item xs={12} md={12} sx={textboxStyle}>
                <TextField
                    id="jdn"
                    label="Julian Day Number"
                    value={jdnLocal}
                    type="number"
                    helperText="Use 0 - 9,999,999"
                    onChange={(event) => changeJDN(event)}
                />
            </Grid>
        </Grid>
    );

}

JDNKnownStarting.propTypes = {
    calculateJDN: PropTypes.func.isRequired,
    jdn: PropTypes.number.isRequired,
};
