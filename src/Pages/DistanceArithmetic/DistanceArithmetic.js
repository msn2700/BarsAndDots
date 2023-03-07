// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Add, Remove, Undo } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Load the input / selection component pages
// The Long Counts Distance is duplicate below on purpose to recycle components
import JDNKnownStarting from './Inputs/JDNKnownStarting';
import JDNSpecifiedLC from './Inputs/LongCountsDistance';
import LongCountsDistance from './Inputs/LongCountsDistance';

// Load the pop-up dialog screens
import JDNKnownStartingPopUp from './Inputs/JDNKnownStartingPopUp';
import LongCountsDistancePopUp from './Inputs/LongCountsDistancePopUp';

// Import functions that we'll need
import { getLCValues, buildLCString, buildLCDFromLC, parseLCString } from '../../Functions/General';
import { getLCDFromJDN, changeToJDN, getJDNDateString, getJDNFromLCD, jdnToDate } from '../../Functions/JulianDayNumber';
import { lcdToCRInfo, getGodNum, crString } from '../../Functions/CalendarRound';

// Import other code, e.g. components, styles, etc.
import { paperStyle, columnsDataGrid } from '../../Data/Components';

// Create the arrays that hold style properties for <Button>
const calcButtonStyle = {
    backgroundColor: '#ebeb00',
    color: '#000000',
}
const buttonStyle = {
    justifyContent: 'center',
    backgroundColor: '#ebeb00',
    color: '#000000',
}

class DistanceArithmetic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // Start with a default input type
            selectedInput: 'dataLC',

            // Start with using today's date as the default starting date; these are LCDs
            lcd: getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), this.props.correlation),
            lcdAdd: 0,
            lcdSubtract: 0,
            
            // Again, get today's date as the default; these are JDNs
            jdn: changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'),
            jdnAdd: 0,
            jdnSubtract: 0,

            // Lastly, get today's date as an LCD but incremental units as JDNs; these are LCDs
            jdnLC: getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), this.props.correlation),
            jdnLCAdd: 0,
            jdnLCSubtract: 0,

            // Create empty arrays to be filled with data, like object properties
            dataLC: [],
            dataJDN: [],
            dataJDNLC: [],
            
            // Set the initial, unclicked status of the dialog boxes, i.e. closed
            openAdd: false,
            openSubtract: false,         
        };

        // Handle basic operations for the arithmetical steps
        this.getInput = this.getInput.bind(this);
        this.calculate = this.calculate.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.reverse = this.reverse.bind(this);
        
        // Handle the Long Count anchor date actions
        this.changeLC = this.changeLC.bind(this);
        this.changeLCAdd = this.changeLCAdd.bind(this);
        this.changeLCSubtract = this.changeLCSubtract.bind(this);

        // Handle the JDN anchor date actions
        this.changeJDN = this.changeJDN.bind(this);
        this.changeJDNAdd = this.changeJDNAdd.bind(this);
        this.changeJDNSubtract = this.changeJDNSubtract.bind(this);
        
        // Handle the JDN of a specified long count anchor date actions
        this.changeJDNLC = this.changeJDNLC.bind(this);
        this.changeJDNLCAdd = this.changeJDNLCAdd.bind(this);
        this.changeJDNLCSubtract = this.changeJDNLCSubtract.bind(this);
        
        // Handle dialog box actions
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleSubtractOpen = this.handleSubtractOpen.bind(this);
        this.handleAddCancel = this.handleAddCancel.bind(this);
        this.handleSubtractCancel = this.handleSubtractCancel.bind(this);
    }



    // Changes to the LC style of input
    changeLC(lcd)               {this.setState({ lcd: lcd });}
    changeLCAdd(lcd)            {this.setState({ lcdAdd: lcd });}
    changeLCSubtract(lcd)       {this.setState({ lcdSubtract: lcd });}

    // Changes to the JDN style of intput
    changeJDN(jdn)              {this.setState({ jdn: jdn });}
    changeJDNAdd(jdn)           {this.setState({ jdnAdd: jdn });}
    changeJDNSubtract(jdn)      {this.setState({ jdnSubtract: jdn });}

    // Changes to the JDN from a specific LC style of input
    changeJDNLC(jdnLC)          {this.setState({ jdnLC: jdnLC });}
    changeJDNLCAdd(jdnLC)       {this.setState({ jdnLCAdd: jdnLC });}
    changeJDNLCSubtract(jdnLC)  {this.setState({ jdnLCSubtract: jdnLC });}

    // Handle actions and cancels
    handleAddCancel()           {this.setState({ openAdd: false})}
    handleSubtractCancel()      {this.setState({ openSubtract: false })}
    handleAddOpen()             {this.setState({ openAdd: true });}
    handleSubtractOpen()        {this.setState({ openSubtract: true });}


// ------------------------------------------------------------------------------------------------------------


    // Get the initial input for the anchor date
    getInput() {
        switch(this.state.selectedInput) {
            case 'dataLC':
                return <LongCountsDistance 
                    correlation={this.props.correlation} 
                    lc={getLCValues(this.state.lcd)} 
                    calculateLC={this.changeLC} 
                />;
            case 'dataJDN':
                return <JDNKnownStarting   
                    correlation={this.props.correlation} 
                    jdn={this.state.jdn}
                    calculateJDN={this.changeJDN}
                />;
            case 'dataJDNLC':
                return <JDNSpecifiedLC 
                    correlation={this.props.correlation}
                    lc={getLCValues(this.state.jdnLC)}
                    calculateLC={this.changeJDNLC}
                />;
        }
    }

    // Use the same input setup but in a pop-up box for addition
    // Note that we intentially use JDNKnownStarting twice for the 2nd and 3rd entries
    getInputAdd() {
        switch(this.state.selectedInput) {
            case 'dataLC':    return <LongCountsDistancePopUp calculateLC ={this.changeLCAdd}    />;
            case 'dataJDN':   return <JDNKnownStartingPopUp   calculateJDN={this.changeJDNAdd}   />;
            case 'dataJDNLC': return <JDNKnownStartingPopUp   calculateJDN={this.changeJDNLCAdd} />;
        }
    }

    // Use the same input setup but in a pop-up box for subtraction
    // Note that the we intentially use JDNKnownStarting twice for the 2nd and 3rd entries
    getInputSubtract() {
        switch(this.state.selectedInput) {
            case 'dataLC':    return <LongCountsDistancePopUp calculateLC= {this.changeLCSubtract}    />;
            case 'dataJDN':   return <JDNKnownStartingPopUp   calculateJDN={this.changeJDNSubtract}   />;
            case 'dataJDNLC': return <JDNKnownStartingPopUp   calculateJDN={this.changeJDNLCSubtract} />;
        }
    }


// ------------------------------------------------------------------------------------------------------------

    // SET ANCHOR DATE
    // Set the anchor date from which we will increment forward or backward in time
    // This is defined as line 1, with an arbitrary number of lines to follow
    // After setting the start date, the user will click the button that triggers this function
    calculate() {
        let lc;
        switch(this.state.selectedInput) {
            case 'dataLC':
                lc = getLCValues(this.state.lcd);
                this.setState({
                    dataLC: [{ 
                        id: 1,
                        LCD: this.state.lcd,
                        LongCount: buildLCString(lc),
                        CR: crString(lcdToCRInfo(this.state.lcd), this.props.names),
                        JDN: getJDNFromLCD(this.state.lcd, this.props.correlation),
                        Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(this.state.lcd, this.props.correlation), 'g'), 'g', false),
                        Julian: getJDNDateString(jdnToDate(getJDNFromLCD(this.state.lcd, this.props.correlation), 'j'), 'j', false),
                        Lord: getGodNum(lc.winals, lc.kins),
                    }],
                });
                break;
            case 'dataJDN':
                lc = getLCValues(getLCDFromJDN(this.state.jdn, this.props.correlation));
                this.setState({
                    dataJDN: [{ 
                        id: 1,
                        LCD: getLCDFromJDN(this.state.jdn, this.props.correlation),
                        LongCount: buildLCString(lc),
                        CR: crString(lcdToCRInfo(getLCDFromJDN(this.state.jdn, this.props.correlation)), this.props.names),
                        JDN: this.state.jdn,
                        Gregorian: getJDNDateString(jdnToDate(parseInt(this.state.jdn,10), 'g'), 'g', false),
                        Julian: getJDNDateString(jdnToDate(parseInt(this.state.jdn,10), 'j'), 'j', false),
                        Lord: getGodNum(lc.winals, lc.kins),
                    }],
                });
                break;
            case 'dataJDNLC':
                lc = getLCValues(this.state.jdnLC);
                this.setState({
                    dataJDNLC: [{ 
                        id: 1,
                        LCD: this.state.jdnLC,
                        LongCount: buildLCString(lc),
                        CR: crString(lcdToCRInfo(this.state.jdnLC), this.props.names),
                        JDN: getJDNFromLCD(this.state.jdnLC, this.props.correlation),
                        Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(this.state.jdnLC, this.props.correlation), 'g'), 'g', false),
                        Julian: getJDNDateString(jdnToDate(getJDNFromLCD(this.state.jdnLC, this.props.correlation), 'j'), 'j', false),
                        Lord: getGodNum(lc.winals, lc.kins),
                    }],
                });
                break;
        }
    }


// ------------------------------------------------------------------------------------------------------------

    // UNDO THE ACTION
    // This will reverse the user's action by removing the most recent record from the stack
    // If there is only one record in the stack, it will return the user to set the anchor date
    reverse() {
        let numRemove = 0;
        switch(this.state.selectedInput) {
            case 'dataLC':
                numRemove = this.state.dataLC.length > 1 ? 2 : (this.state.dataLC.length === 1 ? 1 : 0);
                this.setState({ dataLC: this.state.dataLC.slice(0, this.state.dataLC.length - numRemove) });
                break;
            case 'dataJDN':
                numRemove = this.state.dataJDN.length > 1 ? 2 : (this.state.dataJDN.length === 1 ? 1 : 0);
                this.setState({ dataJDN: this.state.dataJDN.slice(0, this.state.dataJDN.length - numRemove) });
                break;
            case 'dataJDNLC':
                numRemove = this.state.dataJDNLC.length > 1 ? 2 : (this.state.dataJDNLC.length === 1 ? 1 : 0);
                this.setState({ dataJDNLC: this.state.dataJDNLC.slice(0, this.state.dataJDNLC.length - numRemove) });
                break;
        }
    }


// ------------------------------------------------------------------------------------------------------------

    // INCREMENT OR DECREMENT
    // Here we add/subtract a value or take a step forward/backward in time a specific number of days based on the cycle selected
    changeValue(changeFlag) {

        // First, close all dialog pop-ups as no longer needed
        this.setState({ openSubtract: false, openAdd: false, });

        // Declare a variable common to all three input methods
        let newLCD = 0;

        // Decide how to act based on the style of input selected 
        switch(this.state.selectedInput) {
            case 'dataLC':

                // Convert the number of days to add/subtract into long count format (does not include sign)
                let changeLCD = changeFlag > 0 ? this.state.lcdAdd : this.state.lcdSubtract;
                let changeLC = getLCValues(changeLCD);

                // Convert the topmost record of the stack into a long count format, then convert to LCD
                let lastLC = parseLCString(this.state.dataLC[this.state.dataLC.length - 1].LongCount);
                let lastLCD = buildLCDFromLC(lastLC);
        
                // Find the LCD / long count expression of the new date post-change
                newLCD = changeFlag > 0 ? lastLCD + changeLCD : lastLCD - changeLCD;
                let newLC = getLCValues(newLCD);

                // Update the record set with the change amount and the new value
                this.setState({ 
                    dataLC: this.state.dataLC.concat([{
                        id: this.state.dataLC.length + 1,
                        LCD:       (changeFlag > 0 ? '+' : '-') + changeLCD,
                        LongCount: (changeFlag > 0 ? '+' : '-') + buildLCString(changeLC),
                        CR: '-',
                        JDN: '-',
                        Gregorian: '-',
                        Julian: '-',
                        Lord: '-',
                    },
                    {
                        id: this.state.dataLC.length + 2,
                        LCD: newLCD,
                        LongCount: buildLCString(newLC),
                        CR: crString(lcdToCRInfo(newLCD), this.props.names),
                        JDN: getJDNFromLCD(newLCD, this.props.correlation),
                        Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, this.props.correlation), 'g'), 'g', false),
                        Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, this.props.correlation), 'j'), 'j', false),
                        Lord: getGodNum(newLC.winals, newLC.kins),
                    }])
                });
                break;

            case 'dataJDN':

                // Get the JDN of the topmost record in the record set
                let lastJDN = this.state.dataJDN[this.state.dataJDN.length - 1].JDN;

                // Get the amount of the change we will perform
                let changeJDN = changeFlag > 0 ? this.state.jdnAdd : this.state.jdnSubtract;

                // Find the new JDN post-change
                let newJDN = changeFlag > 0 ? lastJDN + changeJDN : lastJDN - changeJDN;

                // Find the LCD of the resulting date post-subtraction
                newLCD = getLCDFromJDN(newJDN, this.props.correlation);

                // Update the record set with the change amount and the new value
                this.setState({
                    dataJDN: this.state.dataJDN.concat([{
                        id: this.state.dataJDN.length + 1,
                        LCD: '-',
                        LongCount: '-',
                        CR: '-',
                        JDN: (changeFlag > 0 ? '+' : '-') + changeJDN,
                        Gregorian: '-',
                        Julian: '-',
                        Lord: '-',
                    },
                    {
                        id: this.state.dataJDN.length + 2,
                        LCD: newLCD,
                        LongCount: buildLCString(getLCValues(newLCD)),
                        CR: crString(lcdToCRInfo(newLCD), this.props.names),
                        JDN: getJDNFromLCD(newLCD, this.props.correlation),
                        Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, this.props.correlation), 'g'), 'g', false),
                        Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, this.props.correlation), 'j'), 'j', false),
                        Lord: getGodNum(getLCValues(newLCD).winals, getLCValues(newLCD).kins),
                    }])
                });
                break;

            case 'dataJDNLC':

                // Get the JDN of the topmost record in the record set
                let lastJDNLC = this.state.dataJDNLC[this.state.dataJDNLC.length - 1].JDN;

                // Get the amount of the change we will perform
                let changeJDNLC = changeFlag > 0 ? this.state.jdnLCAdd : this.state.jdnLCSubtract;

                // Find the new JDN post-change
                let newJDNLC = changeFlag > 0 ? lastJDNLC + changeJDNLC : lastJDNLC - changeJDNLC;

                // Find the JDN for the new date post-subtraction
                newLCD = getLCDFromJDN(newJDNLC, this.props.correlation);

                // Update the record set with the change amount and the new value
                this.setState({ 
                    dataJDNLC: this.state.dataJDNLC.concat([{
                        id: this.state.dataJDNLC.length + 1,
                        LCD: '-',
                        LongCount: '-',
                        CR: '-',
                        JDN: (changeFlag > 0 ? '+' : '-') + changeJDNLC,
                        Gregorian: '-',
                        Julian: '-',
                        Lord: '-',
                    },
                    {
                        id: this.state.dataJDNLC.length + 2,
                        LCD: newLCD,
                        LongCount: buildLCString(getLCValues(newLCD)),
                        CR: crString(lcdToCRInfo(newLCD), this.props.names),
                        JDN: getJDNFromLCD(newLCD, this.props.correlation),
                        Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, this.props.correlation), 'g'), 'g', false),
                        Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(newLCD, this.props.correlation), 'j'), 'j', false),
                        Lord: getGodNum(getLCValues(newLCD).winals, getLCValues(newLCD).kins),
                    }])
                });
                break;
        }

    }

// ------------------------------------------------------------------------------------------------------------

    // RENDER THE PAGE
    // Start the actual rendering of the page now that we have all the functions / input we need
    render() {

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
                                            value={this.state.selectedInput} 
                                            onChange={event => this.setState({ selectedInput: event.target.value })}
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
                                    {this.getInput()}
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button sx={calcButtonStyle} onClick={() => this.calculate()}>Set Anchor Date</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper sx={paperStyle}>
                            <div style={{ height: 400, width: '100%', backgroundColor: '#cccccc', borderRadius: 10, border: 0 }}>
                                <DataGrid
                                    rows={this.state[this.state.selectedInput]}
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
                                <Button sx={buttonStyle} variant="contained" onClick={() => this.handleSubtractOpen()}
                                    disabled={!this.state[this.state.selectedInput].length > 0}
                                >
                                    <Remove />
                                </Button>
                            </Grid>
                            <Grid item xs={3} md={2}></Grid>
                            <Grid item xs={1} md={1}>
                                <Button sx={buttonStyle} variant="contained" onClick={this.reverse}
                                    disabled={!this.state[this.state.selectedInput].length > 0}
                                >
                                    <Undo />
                                </Button>
                            </Grid>
                            <Grid item xs={3} md={2}></Grid>
                            <Grid item xs={1} md={1}>
                                <Button sx={buttonStyle} variant="contained" aria-label="Add" onClick={() => this.handleAddOpen()}
                                    disabled={!this.state[this.state.selectedInput].length > 0}
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
                    open={this.state.openAdd}
                    onClose={() => this.handleAddCancel()}
                    aria-labelledby="form-dialog"
                >
                    <DialogTitle id="form-dialog" sx={{ textAlign: 'center' }}>Add Value</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            {this.getInputAdd()}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleAddCancel()} color="primary">Cancel</Button>
                        <Button onClick={() => this.changeValue(1)} color="primary">Add</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.openSubtract}
                    onClose={() => this.handleSubtractCancel()}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center' }}>Subtract Value</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            {this.getInputSubtract()}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleSubtractCancel()} color="primary">Cancel</Button>
                        <Button onClick={() => this.changeValue(-1)} color="primary">Subtract</Button>
                    </DialogActions>
                </Dialog>
                
                
            </div>
        );
    }
}

DistanceArithmetic.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};

export default DistanceArithmetic;