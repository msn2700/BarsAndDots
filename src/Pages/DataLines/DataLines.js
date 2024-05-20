// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
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
import JDNInput       from './Inputs/JDNInput';
import LongCountInput from './Inputs/LongCountInput';
import GJInput        from './Inputs/GJInput';

// Import other code, e.g. components, styles, etc.
import { paperStyle, columnsDataGrid } from '../../Data/Components';

export default function DataLines(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

    // Next, define some local variables and how to set them
    const [ input,    setInput    ] = useState('lc');
    const [ interval, setInterval ] = useState(5);
    const [ lcd,      setLCD      ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation) );
    const [ endLCD,   setEndLCD   ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation) + 100 );
    const [ jdn,      setJDN      ] = useState( changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()) );
    const [ endJDN,   setEndJDN   ] = useState( changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()) + 50 );
    const [ gj,       setGJ       ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear() - 1), correlation) );
    const [ endGJ,    setEndGJ    ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation) );

    // This changes the nature of the input bar at the top of the page
    function inputContent() {
        switch(input){
            case 'lc':  return <LongCountInput correlation={correlation} calcLCD={handleLCDChange} calcEndLCD={handleEndLCDChange} />;
            case 'jdn': return <JDNInput calcJDN={handleJDNChange} calcEndJDN={handleEndJDNChange} />;  
            case 'gj':  return <GJInput correlation={correlation} calcLCD={handleGJChange} calcEndLCD={handleEndGJChange} />;
            default : // Do nothing
        }
    }

    function handleLCDChange(lcd)      { setLCD(lcd); }
    function handleEndLCDChange(lcd)   { setEndLCD(lcd); }
    function handleJDNChange(jdn)      { setJDN(jdn); }
    function handleEndJDNChange(jdn)   { setEndJDN(jdn); }
    function handleGJChange(lcd)       { setGJ(lcd); }
    function handleEndGJChange(lcd)    { setEndGJ(lcd); }
    function handleInputChange (event) { setInput(event.target.value); }


    // This function handles changing of the day interval 
    function changeInterval (event) {
        if (event.target.value >= 1 && event.target.value <= 999999) {
            setInterval(event.target.value);
        }
    }

    // This determines the middle statement of the header "From [Date1] through [Date2]"
    function handleHeader() {

        let lc = getLCValues(lcd);
        let lcEnd = getLCValues(endLCD);
        
        switch(input){
            case 'lc':  return 'from '       + buildLCString(lc) + ' through '       + buildLCString(lcEnd);
            case 'jdn': return 'from JDN '   + jdn    + ' through JDN '   + endJDN;
            case 'gj':  return 'from LCD = ' + gj     + ' through LCD = ' + endGJ;
            default : // Do nothing
        }
    }

    // This function gets the lines of data that will be displayed in the table
    // We need to build in protection against an exorbitant number of lines, e.g. 1,000,000 lines
    // If we calculate that we would show more than 200 lines, it prevents rendering; this is the setLimit
    function getLines() {

        // Create an empty array that we will fill with data and return
        let set = [];

        // Ensure that the interval is an integer
        let pInterval = parseInt(interval, 10);

        // Create the set limit to prevent crashing
        let setLimit = 200;

        // Populate the empty array depending on the input type
        switch(input){
            
            case 'lc':
                let numLinesLCD = Math.floor((endLCD - lcd) / pInterval);
                if (numLinesLCD > 0 && numLinesLCD <= setLimit){
                    for (let i = lcd; i < endLCD; i += pInterval) {
                        let lc = getLCValues(i);
                        set.push({
                            id: set.length + 1,
                            LCD:       i,
                            JDN:       getJDNFromLCD(i, correlation),
                            LongCount: buildLCString(lc),
                            CR:        crString(lcdToCRInfo(i), names),
                            Lord:      getGodNum(lc.winals, lc.kins),
                            Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(i, correlation), 'g'), 'g', false),
                            Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(i, correlation), 'j'), 'j', false),
                        });
                    }
                }
                break;
            
            case 'jdn':
                let startJDN = parseInt(jdn,10);
                let finishJDN = parseInt(endJDN,10);
                let numLinesJDN = Math.floor((finishJDN - startJDN) / pInterval);
                if (numLinesJDN > 0 && numLinesJDN <= setLimit){
                    for (let i = startJDN; i < finishJDN; i += pInterval) {
                        let lc = getLCValues(getLCDFromJDN(i, correlation));
                        set.push({
                            id: set.length + 1,
                            LCD:       getLCDFromJDN(i, correlation),
                            JDN:       i,
                            LongCount: buildLCString(lc),
                            CR:        crString(lcdToCRInfo(getLCDFromJDN(i, correlation)), names),
                            Lord:      getGodNum(lc.winals, lc.kins),
                            Gregorian: getJDNDateString(jdnToDate(i, 'g'), 'g', false),
                            Julian:    getJDNDateString(jdnToDate(i, 'j'), 'j', false),
                        });
                    }
                }
                break;
           
            case 'gj':
                let numLinesGJ = Math.floor((endGJ - gj) / pInterval);
                if (numLinesGJ > 0 && numLinesGJ <= setLimit){
                    for (let i = gj; i < endGJ; i += pInterval) {
                        let lc = getLCValues(i);
                        set.push({
                            id: set.length + 1,
                            LCD:       getJDNFromLCD(i, correlation),
                            JDN:       getJDNFromLCD(i, correlation),
                            LongCount: buildLCString(lc),
                            CR:        crString(lcdToCRInfo(i), names),
                            Lord:      getGodNum(lc.winals, lc.kins),
                            Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(i, correlation), 'g'), 'g', false),
                            Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(i, correlation), 'j'), 'j', false),
                        });
                    }
                }
                break;

            default : // Do nothing
        }

        // Now return the set generated by one of the switch blocks
        return set;
    }

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
                                                value={input} 
                                                onChange={(event) => handleInputChange(event)}
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
                                            value={interval}
                                            type="number"
                                            onChange={(event) => changeInterval(event)}
                                            InputProps={{ inputProps: { min: 1 } }}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item md={9}>
                                {inputContent()}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <Grid container>
                            <Grid item md={12}>{'Maya Long Counts in ' + interval + ' day intervals, ' + handleHeader() + ', using correlation factor ' + correlation  }</Grid>
                            <Grid item md={12}>{'NOTE: A maximum of 200 lines can be shown; adjust start/end date and interval accordingly to find the window of data you want'}</Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <div style={{ height: 400, width: '100%', backgroundColor: '#cccccc', borderRadius: 10, border: 0 }}>
                            <DataGrid
                                rows={getLines()}
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

DataLines.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};
