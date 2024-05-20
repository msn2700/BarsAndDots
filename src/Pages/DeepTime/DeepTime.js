// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

// Import functions that we'll need
import { parseBigLCString, buildBigLCFromLCD, bigLCDToCRInfo } from '../../Functions/DeepTime.js';
import { crString } from '../../Functions/CalendarRound.js';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

export default function DeepTime(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define some local variables and how to set them
    const [ distanceNum, setDistanceNum ] = useState('0.0');
    const [ anchorDate,  setAnchorDate  ] = useState('0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0');
    const [ newDN,       setNewDN       ] = useState(parseBigLCString('0.0'));
    const [ newAnchor,   setNewAnchor   ] = useState(parseBigLCString('0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0'));

    // Using the value from Coba, Stela 1... mostly
    // eraDay:     '13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.0.0.0.0.0',
    // anchorDate: '13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.0.0.0.0.0',

    function changeAnchorDate (event) {
        setAnchorDate(event.target.value);                             // string
        setNewAnchor(parseBigLCString(String(event.target.value)));    // LCD
    }

    function changeDistanceNum (event) {
        setDistanceNum(event.target.value);                        // string
        setNewDN(parseBigLCString(String(event.target.value)));    // LCD
    }

    // Calculate the CR info for the anchor date
    let cr = bigLCDToCRInfo(BigInt(newAnchor));
    let anchorCR = crString(cr, names);

    // Calculate the CR for the anchor + distance date
    let addCR = bigLCDToCRInfo(BigInt(newAnchor) + BigInt(newDN));
    let addCRString = crString(addCR,names);

    // Calculate the CR for the anchor - distance date
    let diffCR = bigLCDToCRInfo(BigInt(newAnchor) - BigInt(newDN));
    let diffCRString = crString(diffCR,names);

    // Calculate the CR info for the era date entered
    let eraCR = bigLCDToCRInfo(BigInt(0));
    let eraCRString = crString(eraCR, names);

    // Find the difference between the era day and anchor day LCD
    let offset = Number(BigInt(newAnchor));

    return(
        <div>
            <Grid container>
                
                <Grid item xs={12}>
                    <Paper sx={ paperStyle } >
                        <h1>Deep Time and (Very) Long Counts</h1>
                        <p>Here we assume that all cycles except winals operate in sets of 20<br></br>
                        Start by entering a long count for an Anchor Date (AD) and a Distance Number (DN)<br></br>
                        For both values, you can enter leading zeroes or not, e.g. 0.0.0.0.0 works as well as 00.00.00.00.00<br></br>
                        Bad input, e.g. characters instead of numbers, will result in an LCD = -1; the smallest input is 0.1 or 1 kin</p>
                    </Paper>
                </Grid>
                
                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    label="Anchor Date (AD)" 
                                    value={anchorDate}
                                    onChange={(event) => changeAnchorDate(event)}
                                    helperText="Enter an anchor date, must be to 24th order..."
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    label="Distance Number (DN)" 
                                    value={distanceNum}
                                    onChange={(event) => changeDistanceNum(event)} 
                                    helperText="Enter a distance number without +/- sign, optional up to 23rd order..."
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <p>The Era day is 0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0 {eraCRString} and defines LCD = 0</p>
                        <p>The starting anchor date is {anchorDate + ' ' + anchorCR} with LCD = {offset}</p>
                        <p>The distance number is {distanceNum}, indicating {newDN} days</p>
                        <p>AD + DN gives LCD = {offset + Number(newDN)} days</p>
                        <p>AD + DN = {buildBigLCFromLCD(BigInt(newAnchor) + BigInt(newDN)) + ' ' + addCRString}</p>
                        <p>AD - DN gives LCD = {offset - Number(newDN)} days</p>
                        <p>AD - DN = {buildBigLCFromLCD(BigInt(newAnchor) - BigInt(newDN)) + ' ' + diffCRString}</p>
                    </Paper>
                </Grid>
                
            </Grid>
        </div>
    );

}

DeepTime.propTypes = {    
    names: PropTypes.string.isRequired,
}

