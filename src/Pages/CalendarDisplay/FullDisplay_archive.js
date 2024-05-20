// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, Select, InputLabel, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the main calendar display with all tiles
import CalendarCore from './CalendarCore.js';

// Import the input pages
import DatePop from './Inputs/DatePop';
import GJDate from './Inputs/GJDate';
import JDN from './Inputs/JDN';
import LCD from './Inputs/LCD';
import LCPop from './Inputs/LCPop.js';
import MayaLC from './Inputs/MayaLC';

// Import all necessary functions
import { getLCDFromJDN, changeToJDN } from '../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

export default function FullDisplay(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

    // Next, define some local variables and how to set them
    const [ selectedInput, setSelectedInput ] = useState('lc');
    const [ lcdPort, setLCDPort ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation) );

    // Handle changes caused by user selection
    function handleInputChange (event) {
        setSelectedInput(event.target.value);
    }

    function handleLCDChange(lcd) {
        setLCDPort(Number(lcd));
    }

    function inputContent() {
        switch(selectedInput) {
            case 'lc':      return <MayaLC  calcLCD={handleLCDChange} correlation={correlation} />;
            case 'date':    return <GJDate  calcLCD={handleLCDChange} correlation={correlation} />;
            case 'jdn':     return <JDN     calcLCD={handleLCDChange} correlation={correlation} />;
            case 'lcd':     return <LCD     calcLCD={handleLCDChange} correlation={correlation} />;
            case 'lcPop':   return <LCPop   calcLCD={handleLCDChange} correlation={correlation} />;
            case 'datePop': return <DatePop calcLCD={handleLCDChange} correlation={correlation} />;
            default: // Do nothing
        }
    }



    return(
        <div>
            <Grid container>

                <Grid item xs={12} md={1}></Grid>

                <Grid item style={{width: '330px'}}>
                    <Paper sx={ paperStyle }>
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={12}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="age-simple">Choose Input</InputLabel>
                                    <Select
                                        value={selectedInput}
                                        onChange={(event) => handleInputChange(event)}
                                        labelid="age-simple"
                                        label="Choose Input"
                                    >
                                        <MenuItem value="lc">Maya Long Count Input</MenuItem>
                                        <MenuItem value="date">Gregorian/Julian Date Input</MenuItem>
                                        <MenuItem value="jdn">Julian Day Number Input</MenuItem>
                                        <MenuItem value="lcd">Long Count Decimal Input</MenuItem>
                                        <MenuItem value="datePop">Display 1 POP Nearest a Date Input</MenuItem>
                                        <MenuItem value="lcPop">Display 1 POP Nearest an LC Input</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {inputContent()}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <CalendarCore lcd={Number(lcdPort)} correlation={correlation} names={names} />
                </Grid>

                <Grid item md={12}>
                    <Paper sx={ paperStyle }>
                        <h1>Interactive Calendar Display</h1>
                        <p>Use the controls on the left to select an input method and then fill in the desired values<br></br> 
                        Hover over a glyph to read a description when viewing this site on a laptop/desktop</p>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );

}

FullDisplay.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};

