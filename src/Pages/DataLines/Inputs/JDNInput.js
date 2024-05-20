// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { changeToJDN} from '../../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

export default function JDNInput(props) {

    // First, import any of the props items we'll need
    const { calcJDN, calcEndJDN } = props;

    // Next, define some local variables and how to set them
    const [ jdn,    setJDN    ] = useState( changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g') );
    const [ endJDN, setEndJDN ] = useState( changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g') + 50 ); 

    function changeJDN (event) {
        if (event.target.value >= -27207717  && event.target.value <= 29384282) {
            setJDN(event.target.value);
            calcJDN(event.target.value);
        }
    }

    function changeEndJDN (event) {
        if (event.target.value >= -27207717  && event.target.value <= 29384282) {
            setEndJDN(event.target.value);       
            calcEndJDN(event.target.value);
        }
    }

    return(
        <Grid container justifyContent="center">
            <Grid item md={3} sx={textboxStyle}>
                <TextField
                    id="jdn"
                    label="Starting JDN"
                    value={jdn}
                    type="number"
                    onChange={(event) => changeJDN(event)}
                    helperText="Use -27,207,717 to 29,384,282"
                    InputProps={{ inputProps: { min: -27207717, max: 29384282 } }}
                />
            </Grid>
            <Grid item md={3} sx={textboxStyle}>
                <TextField
                    id="endJDN"
                    label="Ending JDN"
                    value={endJDN}
                    type="number"
                    onChange={(event) => changeEndJDN(event)}
                    helperText="Use -27,207,717 to 29,384,282"
                    InputProps={{ inputProps: { min: -27207717, max: 29384282 } }}
                />
            </Grid>
        </Grid>
    );
    
}

JDNInput.propTypes = {
    calcJDN: PropTypes.func.isRequired,
    calcEndJDN: PropTypes.func.isRequired,
};
