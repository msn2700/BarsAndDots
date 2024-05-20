// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Add, Remove, Undo } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Load the input / selection component pages
// The Long Counts Distance is duplicate below on purpose to recycle components
import JDNKnownStarting   from './Inputs/JDNKnownStarting';
import JDNSpecifiedLC     from './Inputs/LongCountsDistance';
import LongCountsDistance from './Inputs/LongCountsDistance';

// Load the pop-up dialog screens
import JDNKnownStartingPopUp   from './Inputs/JDNKnownStartingPopUp';
import LongCountsDistancePopUp from './Inputs/LongCountsDistancePopUp';

// Import functions that we'll need
import { getLCValues, buildLCString, buildLCDFromLC, parseLCString } from '../../Functions/General';
import { getLCDFromJDN, changeToJDN, getJDNDateString, getJDNFromLCD, jdnToDate } from '../../Functions/JulianDayNumber';
import { lcdToCRInfo, getGodNum, crString } from '../../Functions/CalendarRound';

// Import other code, e.g. components, styles, etc.
import { paperStyle, columnsDataGrid, calcButtonStyle, buttonStyle } from '../../Data/Components';

export default function DistanceArithmetic(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

    // Next, define some local variables and how to set them
    // Start with a default input type
    const [ selectedInput, setSelectedInput ] = useState('dataLC');

    // Start with using today's date as the default starting date; these are LCDs
    const [ lcd, setLCD ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), correlation), );
    const [ lcdAdd, setLCDAdd ] = useState(0);
    const [ lcdSubtract, setLCDSubtract ] = useState(0);

    // Again, get today's date as the default; these are JDNs
    const [ jdn, setJDN ] = useState( changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g') );
    const [ jdnAdd, setJDNAdd ] = useState(0);
    const [ jdnSubtract, setJDNSubtract ] = useState(0);

    // Lastly, get today's date as an LCD but incremental units as JDNs; these are LCDs
    const [ jdnLC, setJDNLC ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), correlation) );
    const [ jdnLCAdd, setJDNLCAdd ] = useState(0);
    const [ jdnLCSubtract, setJDNLCSubtract ] = useState(0);

    // Create empty arrays to be filled with data, like object properties
    const [ dataLC, setDataLC ] = useState([]);
    const [ dataJDN, setDataJDN ] = useState([]);
    const [ dataJDNLC, setDataJDNLC ] = useState([]);

    // Set the initial, unclicked status of the dialog boxes, i.e. closed
    const [ openAdd, setOpenAdd ] = useState(false);
    const [ openSubtract, setOpenSubtract ] = useState(false);

    // Changes to the LC style of input
    function changeLC(lcd)               { setLCD(lcd); }
    function changeLCAdd(lcd)            { setLCDAdd(lcd); }
    function changeLCSubtract(lcd)       { setLCDSubtract(lcd); }

    // Changes to the JDN style of intput
    function changeJDN(jdn)              { setJDN(jdn); }
    function changeJDNAdd(jdn)           { setJDNAdd(jdn); }
    function changeJDNSubtract(jdn)      { setJDNSubtract(jdn); }

    // Changes to the JDN from a specific LC style of input
    function changeJDNLC(jdnLC)          { setJDNLC(jdnLC); }
    function changeJDNLCAdd(jdnLC)       { setJDNLCAdd(jdnLC); }
    function changeJDNLCSubtract(jdnLC)  { setJDNLCSubtract(jdnLC); }

    // Handle actions, cancels and input change
    function handleAddCancel()           { setOpenAdd(false); } 
    function handleSubtractCancel()      { setOpenSubtract(false); }
    function handleAddOpen()             { setOpenAdd(true); }
    function handleSubtractOpen()        { setOpenSubtract(true); }
    function handleInputChange(event)    { setSelectedInput(event.target.value); }

// ------------------------------------------------------------------------------------------------------------

    // This function takes the selected array and returns it for viewing in the main table / x-data-grid
    function returnRows() {
        switch(selectedInput) {
            case 'dataLC':    return dataLC;
            case 'dataJDN':   return dataJDN;
            case 'dataJDNLC': return dataJDNLC;
            default : // Do nothing
        }
    }

    // Get the initial input for the anchor date
    function getInput() {
        switch(selectedInput) {
            case 'dataLC':    return <LongCountsDistance correlation={correlation} lc={getLCValues(lcd)} calculateLC={changeLC} />;
            case 'dataJDN':   return <JDNKnownStarting   jdn={jdn} calculateJDN={changeJDN} />;
            case 'dataJDNLC': return <JDNSpecifiedLC     correlation={correlation} lc={getLCValues(jdnLC)} calculateLC={changeJDNLC} />;
            default : // Do nothing
        }
    }

    // Use the same input setup but in a pop-up box for addition
    // Note that we intentially use JDNKnownStarting twice for the 2nd and 3rd entries
    function getInputAdd() {
        switch(selectedInput) {
            case 'dataLC':    return <LongCountsDistancePopUp calculateLC ={changeLCAdd}    />;
            case 'dataJDN':   return <JDNKnownStartingPopUp   calculateJDN={changeJDNAdd}   />;
            case 'dataJDNLC': return <JDNKnownStartingPopUp   calculateJDN={changeJDNLCAdd} />;
            default : // Do nothing
        }
    }

    // Use the same input setup but in a pop-up box for subtraction
    // Note that the we intentially use JDNKnownStarting twice for the 2nd and 3rd entries
    function getInputSubtract() {
        switch(selectedInput) {
            case 'dataLC':    return <LongCountsDistancePopUp calculateLC= {changeLCSubtract}    />;
            case 'dataJDN':   return <JDNKnownStartingPopUp   calculateJDN={changeJDNSubtract}   />;
            case 'dataJDNLC': return <JDNKnownStartingPopUp   calculateJDN={changeJDNLCSubtract} />;
            default : // Do nothing
        }
    }


// ------------------------------------------------------------------------------------------------------------

    // SET ANCHOR DATE
    // Set the anchor date from which we will increment forward or backward in time
    // This is defined as line 1, with an arbitrary number of lines to follow
    // After setting the start date, the user will click the button that triggers this function
    function calculate() {
        let lc;
        switch(selectedInput) {
            case 'dataLC':
                lc = getLCValues(lcd);
                setDataLC([{ 
                    id: 1,
                    LCD: lcd,
                    LongCount: buildLCString(lc),
                    CR:        crString(lcdToCRInfo(lcd), names),
                    JDN:       getJDNFromLCD(lcd, correlation),
                    Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(lcd, correlation), 'g'), 'g', false),
                    Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(lcd, correlation), 'j'), 'j', false),
                    Lord:      getGodNum(lc.winals, lc.kins),
                }]);
                break;
            case 'dataJDN':
                lc = getLCValues(getLCDFromJDN(jdn, correlation));
                setDataJDN([{ 
                    id: 1,
                    LCD:       getLCDFromJDN(jdn, correlation),
                    LongCount: buildLCString(lc),
                    CR:        crString(lcdToCRInfo(getLCDFromJDN(jdn, correlation)), names),
                    JDN: jdn,
                    Gregorian: getJDNDateString(jdnToDate(parseInt(jdn,10), 'g'), 'g', false),
                    Julian:    getJDNDateString(jdnToDate(parseInt(jdn,10), 'j'), 'j', false),
                    Lord:      getGodNum(lc.winals, lc.kins),
                }]);
                break;
            case 'dataJDNLC':
                lc = getLCValues(jdnLC);
                setDataJDNLC([{ 
                    id: 1,
                    LCD: jdnLC,
                    LongCount: buildLCString(lc),
                    CR:        crString(lcdToCRInfo(jdnLC), names),
                    JDN:       getJDNFromLCD(jdnLC, correlation),
                    Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(jdnLC, correlation), 'g'), 'g', false),
                    Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(jdnLC, correlation), 'j'), 'j', false),
                    Lord:      getGodNum(lc.winals, lc.kins),
                }]);
                break;
            default : // Do nothing
        }
    }


// ------------------------------------------------------------------------------------------------------------

    // UNDO THE ACTION
    // This will reverse the user's action by removing the most recent record from the stack
    // If there is only one record in the stack, it will return the user to set the anchor date
    function reverse() {
        let numRemove = 0;
        switch(selectedInput) {
            case 'dataLC':
                numRemove = dataLC.length > 1 ? 2 : (dataLC.length === 1 ? 1 : 0);
                setDataLC(dataLC.slice(0, dataLC.length - numRemove));
                break;
            case 'dataJDN':
                numRemove = dataJDN.length > 1 ? 2 : (dataJDN.length === 1 ? 1 : 0);
                setDataJDN(dataJDN.slice(0, dataJDN.length - numRemove));
                break;
            case 'dataJDNLC':
                numRemove = dataJDNLC.length > 1 ? 2 : (dataJDNLC.length === 1 ? 1 : 0);
                setDataJDNLC(dataJDNLC.slice(0, dataJDNLC.length - numRemove));
                break;
            default : // Do nothing
        }
    }


// ------------------------------------------------------------------------------------------------------------

    // INCREMENT OR DECREMENT
    // Here we add/subtract a value or take a step forward/backward in time a specific number of days based on the cycle selected
    function changeValue(changeFlag) {

        // First, close all dialog pop-ups as no longer needed
        setOpenSubtract(false);
        setOpenAdd(false);

        // Declare a variable common to all three input methods
        let newLCD = 0;

        // Decide how to act based on the style of input selected 
        switch(selectedInput) {
            case 'dataLC':

                // Convert the number of days to add/subtract into long count format (does not include sign)
                let changeLCD = changeFlag > 0 ? lcdAdd : lcdSubtract;
                let changeLC = getLCValues(changeLCD);

                // Convert the topmost record of the stack into a long count format, then convert to LCD
                let lastLC = parseLCString(dataLC[dataLC.length - 1].LongCount);
                let lastLCD = buildLCDFromLC(lastLC);
        
                // Find the LCD / long count expression of the new date post-change
                newLCD = changeFlag > 0 ? lastLCD + changeLCD : lastLCD - changeLCD;
                let newLC = getLCValues(newLCD);

                // Update the record set with the change amount and the new value
                setDataLC(dataLC.concat([{
                    id: dataLC.length + 1,
                    LCD:       (changeFlag > 0 ? '+' : '-') + changeLCD,
                    LongCount: (changeFlag > 0 ? '+' : '-') + buildLCString(changeLC),
                    CR: '-',
                    JDN: '-',
                    Gregorian: '-',
                    Julian: '-',
                    Lord: '-',
                },
                {
                    id: dataLC.length + 2,
                    LCD: newLCD,
                    LongCount: buildLCString(newLC),
                    CR:        crString(lcdToCRInfo(newLCD), names),
                    JDN:       getJDNFromLCD(newLCD, correlation),
                    Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, correlation), 'g'), 'g', false),
                    Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, correlation), 'j'), 'j', false),
                    Lord:      getGodNum(newLC.winals, newLC.kins),
                }]));
                break;

            case 'dataJDN':

                // Get the JDN of the topmost record in the record set
                let lastJDN = dataJDN[dataJDN.length - 1].JDN;

                // Get the amount of the change we will perform
                let changeJDN = changeFlag > 0 ? jdnAdd : jdnSubtract;

                // Find the new JDN post-change
                let newJDN = changeFlag > 0 ? lastJDN + changeJDN : lastJDN - changeJDN;

                // Find the LCD of the resulting date post-subtraction
                newLCD = getLCDFromJDN(newJDN, correlation);

                // Update the record set with the change amount and the new value
                setDataJDN(dataJDN.concat([{
                    id: dataJDN.length + 1,
                    LCD: '-',
                    LongCount: '-',
                    CR: '-',
                    JDN: (changeFlag > 0 ? '+' : '-') + changeJDN,
                    Gregorian: '-',
                    Julian: '-',
                    Lord: '-',
                },
                {
                    id: dataJDN.length + 2,
                    LCD: newLCD,
                    LongCount: buildLCString(getLCValues(newLCD)),
                    CR:        crString(lcdToCRInfo(newLCD), names),
                    JDN:       getJDNFromLCD(newLCD, correlation),
                    Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, correlation), 'g'), 'g', false),
                    Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, correlation), 'j'), 'j', false),
                    Lord:      getGodNum(getLCValues(newLCD).winals, getLCValues(newLCD).kins),
                }]));
                break;

            case 'dataJDNLC':

                // Get the JDN of the topmost record in the record set
                let lastJDNLC = dataJDNLC[dataJDNLC.length - 1].JDN;

                // Get the amount of the change we will perform
                let changeJDNLC = changeFlag > 0 ? jdnLCAdd : jdnLCSubtract;

                // Find the new JDN post-change
                let newJDNLC = changeFlag > 0 ? lastJDNLC + changeJDNLC : lastJDNLC - changeJDNLC;

                // Find the JDN for the new date post-subtraction
                newLCD = getLCDFromJDN(newJDNLC, correlation);

                // Update the record set with the change amount and the new value
                setDataJDNLC(dataJDNLC.concat([{
                    id: dataJDNLC.length + 1,
                    LCD: '-',
                    LongCount: '-',
                    CR: '-',
                    JDN: (changeFlag > 0 ? '+' : '-') + changeJDNLC,
                    Gregorian: '-',
                    Julian: '-',
                    Lord: '-',
                },
                {
                    id: dataJDNLC.length + 2,
                    LCD: newLCD,
                    LongCount: buildLCString(getLCValues(newLCD)),
                    CR:        crString(lcdToCRInfo(newLCD), names),
                    JDN:       getJDNFromLCD(newLCD, correlation),
                    Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, correlation), 'g'), 'g', false),
                    Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, correlation), 'j'), 'j', false),
                    Lord:      getGodNum(getLCValues(newLCD).winals, getLCValues(newLCD).kins),
                }]));
                break;
            
            default : // Do nothing
        }

    }

// ------------------------------------------------------------------------------------------------------------

    // RETURN THE PAGE
    // Start the actual rendering of the page now that we have all the functions / input we need

    return(

        <div>
            <Grid container justifyContent="space-evenly">
                
                <Grid item md={12}>
                    <Paper sx={paperStyle}>
                        <h1>Distance Arithmetic</h1>
                        <p>Set an anchor date and then add/subtract arbitrary numbers of days in incremental steps<br></br>
                        Different quantities can be added/subtracted in a single step, e.g. 0.0.0.1.5 + 1 Tzolkin + 5 Haabs, etc.<br></br>
                        Each step can be undone in the order they were executed; scroll down for - / undo / + buttons</p>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper sx={paperStyle}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="choose">Choose Input</InputLabel>
                                    <Select 
                                        value={selectedInput} 
                                        onChange={(event) => handleInputChange(event)}
                                        labelid="choose"
                                        label="Choose Input"
                                    >
                                        <MenuItem value="dataLC">Long Count anchor, Long Count increments</MenuItem>
                                        <MenuItem value="dataJDN">JDN anchor, JDN increments</MenuItem>
                                        <MenuItem value="dataJDNLC">Long Count anchor, JDN increments</MenuItem>
                                    </Select>
                                    {/*<FormHelperText>Choose Input Style</FormHelperText>*/}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {getInput()}
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button sx={calcButtonStyle} onClick={() => calculate()}>Set Anchor Date</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Create data table that will show all of our arithmetical steps */}

                <Grid item xs={12} md={12}>
                    <Paper sx={paperStyle}>
                        <div style={{ height: 400, width: '100%', backgroundColor: '#cccccc', borderRadius: 10, border: 0 }}>
                            <DataGrid
                                rows={ returnRows() }
                                columns={ columnsDataGrid }
                                pageSize={40}
                                rowsPerPageOptions={[40]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </Paper>
                </Grid>

                {/* Create the permanent buttons at the bottom to Undo, Add or Subtract */}

                <Grid item xs={12} md={12}><p></p></Grid>
                <Grid item xs={12} md={12}>
                    <Grid container>
                        <Grid item xs={1} md={3}></Grid>
                        <Grid item xs={1} md={1}>
                            <Button sx={buttonStyle} variant="contained" onClick={() => handleSubtractOpen()}
                                disabled={!returnRows().length > 0}
                            >
                                <Remove />
                            </Button>
                        </Grid>
                        <Grid item xs={3} md={2}></Grid>
                        <Grid item xs={1} md={1}>
                            <Button sx={buttonStyle} variant="contained" onClick={() => reverse()}
                                disabled={!returnRows().length > 0}
                            >
                                <Undo />
                            </Button>
                        </Grid>
                        <Grid item xs={3} md={2}></Grid>
                        <Grid item xs={1} md={1}>
                            <Button sx={buttonStyle} variant="contained" aria-label="Add" onClick={() => handleAddOpen()}
                                disabled={!returnRows().length > 0}
                            >
                                <Add />
                            </Button>
                        </Grid>
                        <Grid item xs={1} md={2}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}><p></p></Grid>
            </Grid>


            {/* Now create the dialog boxes that appear when we want to add/subtract */}

            <Dialog
                open={openAdd}
                onClose={() => handleAddCancel()}
                aria-labelledby="form-dialog"
            >
                <DialogTitle id="form-dialog" sx={{ textAlign: 'center' }}>Add Value</DialogTitle>
                <DialogContent>
                    <FormControl>
                        {getInputAdd()}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAddCancel()} color="primary">Cancel</Button>
                    <Button onClick={() => changeValue(1)} color="primary">Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openSubtract}
                onClose={() => handleSubtractCancel()}
                aria-labelledby="form-dialog-title"
            >

                <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center' }}>Subtract Value</DialogTitle>
                <DialogContent>
                    <FormControl>
                        {getInputSubtract()}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubtractCancel()} color="primary">Cancel</Button>
                    <Button onClick={() => changeValue(-1)} color="primary">Subtract</Button>
                </DialogActions>
            </Dialog>
            
            
        </div>
    );

}

DistanceArithmetic.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};
