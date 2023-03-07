// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, Select, InputLabel, MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Load functions that we'll need
import { getLCDFromJDN, changeToJDN, getJDNDateString, jdnToDate, getJDNFromLCD } from '../../Functions/JulianDayNumber';
import { getLCValues, buildLCString } from '../../Functions/General';
import { lcdToCRInfo, getGodNum, crString } from '../../Functions/CalendarRound';

// Load the input component pages
import JDNInput from './JDNInput';
import LongCountInput from './LongCountInput';
import GJInput from './GJInput';

// Import other code, e.g. components, styles, etc.
import { paperStyle, columnsDataGrid } from '../../Data/Components';

class DataLines extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {

            input: 'lc',  // Default, could also be 'jdn' or 'gj'
            interval: 5,  // Days in the interval default

            lcd:    getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation),
            endLCD: getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation) + 100,
            
            jdn:    changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), 
            endJDN: changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()) + 50,
            
            gj:    getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear() - 1), this.props.correlation),
            endGJ: getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation),

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputContent = this.inputContent.bind(this);
        this.changeInterval = this.changeInterval.bind(this);
        this.handleHeader = this.handleHeader.bind(this);

        this.handleLCDChange = this.handleLCDChange.bind(this);
        this.handleEndLCDChange = this.handleEndLCDChange.bind(this);
        this.handleJDNChange = this.handleJDNChange.bind(this);
        this.handleEndJDNChange = this.handleEndJDNChange.bind(this);
        this.handleGJChange = this.handleGJChange.bind(this);
        this.handleEndGJChange = this.handleEndGJChange.bind(this);

    }

    // This changes the nature of the input bar at the top of the page
    inputContent() {
        switch(this.state.input){
            case 'lc':
                return <LongCountInput 
                correlation={this.props.correlation}
                calcLCD={this.handleLCDChange}
                calcEndLCD={this.handleEndLCDChange}
                />;
            case 'jdn':
                return <JDNInput 
                correlation={this.props.correlation}
                calcJDN={this.handleJDNChange}
                calcEndJDN={this.handleEndJDNChange}
                />;  
            case 'gj':
                return <GJInput 
                correlation={this.props.correlation}
                calcLCD={this.handleGJChange}
                calcEndLCD={this.handleEndGJChange}
                />;

        }
    }

    handleLCDChange(lcd)      { this.setState({ lcd:    lcd, }); }
    handleEndLCDChange(lcd)   { this.setState({ endLCD: lcd, }); }
    handleJDNChange(jdn)      { this.setState({ jdn:    jdn, }); }
    handleEndJDNChange(jdn)   { this.setState({ endJDN: jdn, }); }
    handleGJChange(lcd)       { this.setState({ gj:     lcd, }); }
    handleEndGJChange(lcd)    { this.setState({ endGJ:  lcd, }); }
    handleInputChange (event) { this.setState({ input:  event.target.value, }); }


    // This function handles changing of the day interval 
    changeInterval (event) {
        if (event.target.value >= 1 && event.target.value <= 999999) {
            this.setState({
                interval: event.target.value,
            });
        }
    }

    // This determines the middle statement of the header "From [Date1] through [Date2]"
    handleHeader() {
        let lc = getLCValues(this.state.lcd);
        let lcEnd = getLCValues(this.state.endLCD);
        
        switch(this.state.input){
            case 'lc':  return 'from '       + buildLCString(lc) + ' through '       + buildLCString(lcEnd);
            case 'jdn': return 'from JDN '   + this.state.jdn    + ' through JDN '   + this.state.endJDN;
            case 'gj':  return 'from LCD = ' + this.state.gj     + ' through LCD = ' + this.state.endGJ;
        }
    }

    // This function gets the lines of data that will be displayed in the table
    // We need to build in protection against an exorbitant number of lines, e.g. 1,000,000 lines
    // If we calculate that we would show more than 200 lines, it prevents rendering; this is the setLimit
    getLines() {

        // Create an empty array that we will fill with data and return
        let set = [];

        // Ensure that the interval is an integer
        let pInterval = parseInt(this.state.interval, 10);

        // Create the set limit to prevent crashing
        let setLimit = 200;

        // Populate the empty array depending on the input type
        switch(this.state.input){
            
            case 'lc':
                let numLinesLCD = Math.floor((this.state.endLCD - this.state.lcd) / pInterval);
                if (numLinesLCD > 0 && numLinesLCD <= setLimit){
                    for (let i = this.state.lcd; i < this.state.endLCD; i += pInterval) {
                        let lc = getLCValues(i);
                        set.push({
                            id: set.length + 1,
                            LCD: i,
                            JDN: getJDNFromLCD(i, this.props.correlation),
                            LongCount: buildLCString(lc),
                            CR: crString(lcdToCRInfo(i), this.props.names),
                            Lord: getGodNum(lc.winals, lc.kins),
                            Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(i, this.props.correlation), 'g'), 'g', false),
                            Julian:getJDNDateString(jdnToDate(getJDNFromLCD(i, this.props.correlation), 'j'), 'j', false),
                        });
                    }
                }
                break;
            
            case 'jdn':
                let startJDN = parseInt(this.state.jdn,10);
                let finishJDN = parseInt(this.state.endJDN,10);
                let numLinesJDN = Math.floor((finishJDN - startJDN) / pInterval);
                if (numLinesJDN > 0 && numLinesJDN <= setLimit){
                    for (let i = startJDN; i < finishJDN; i += pInterval) {
                        let lc = getLCValues(getLCDFromJDN(i, this.props.correlation));
                        set.push({
                            id: set.length + 1,
                            LCD: getLCDFromJDN(i, this.props.correlation),
                            JDN: i,
                            LongCount: buildLCString(lc),
                            CR: crString(lcdToCRInfo(getLCDFromJDN(i, this.props.correlation)), this.props.names),
                            Lord: getGodNum(lc.winals, lc.kins),
                            Gregorian: getJDNDateString(jdnToDate(i, 'g'), 'g', false),
                            Julian: getJDNDateString(jdnToDate(i, 'j'), 'j', false),
                        });
                    }
                }
                break;
           
            case 'gj':
                let numLinesGJ = Math.floor((this.state.endGJ - this.state.gj) / pInterval);
                if (numLinesGJ > 0 && numLinesGJ <= setLimit){
                    for (let i = this.state.gj; i < this.state.endGJ; i += pInterval) {
                        let lc = getLCValues(i);
                        set.push({
                            id: set.length + 1,
                            LCD: getJDNFromLCD(i, this.props.correlation),
                            JDN: getJDNFromLCD(i, this.props.correlation),
                            LongCount: buildLCString(lc),
                            CR: crString(lcdToCRInfo(i), this.props.names),
                            Lord: getGodNum(lc.winals, lc.kins),
                            Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(i, this.props.correlation), 'g'), 'g', false),
                            Julian:getJDNDateString(jdnToDate(getJDNFromLCD(i, this.props.correlation), 'j'), 'j', false),
                        });
                    }
                }
                break;
        }

        // Now return the set generated by one of the switch blocks
        return set;
    }

    render() {

        return(
            <div>
                <Grid container>

                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <h1>Data Lines</h1>
                            <p>Use the controls below to create a table of Initial Series date information with fixed intervals</p>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <Grid container>
                                <Grid item xs={7} md={2}>

                                    <Grid container direction="column" justifyContent="center" alignItems="center">
                                        <Grid item xs={12} md={12}>
                                            <FormControl sx={{ m: 1, minWidth: 205 }}>
                                                <InputLabel id="input">Choose Input</InputLabel>
                                                <Select 
                                                    value={this.state.input} 
                                                    onChange={this.handleInputChange}
                                                    labelid="input"
                                                    label="Choose Input"
                                                >
                                                    <MenuItem value="lc">Maya Long Count</MenuItem>
                                                    <MenuItem value="jdn">Julian Day Number</MenuItem>
                                                    <MenuItem value="gj">Gregorian / Julian</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={12} sx={ { m: 1, minWidth: 205 } }>
                                            <TextField
                                                id="interval"
                                                label="Interval (Days)"
                                                value={this.state.interval}
                                                type="number"
                                                onChange={this.changeInterval}
                                                InputProps={{ inputProps: { min: 1 } }}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid item md={9}>
                                    {this.inputContent()}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                           <Grid container>
                                <Grid item md={12}>{'Maya Long Counts in ' + this.state.interval + ' day intervals, ' + this.handleHeader() + ', using correlation factor ' + this.props.correlation  }</Grid>
                                <Grid item md={12}>{'NOTE: A maximum of 200 lines can be shown; adjust start/end date and interval accordingly to find the window of data you want'}</Grid>
                           </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Paper sx={ paperStyle }>
                            <div style={{ height: 400, width: '100%', backgroundColor: '#cccccc', borderRadius: 10, border: 0 }}>
                                <DataGrid
                                    rows={this.getLines()}
                                    columns={ columnsDataGrid }
                                    pageSize={40}
                                    rowsPerPageOptions={[40]}
                                    components={{ Toolbar: GridToolbar }}
                                />
                            </div>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

DataLines.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};

export default DataLines;