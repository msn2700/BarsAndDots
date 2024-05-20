// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Import the various functions that we'll need
import { getJDNDateString, jdnToDate, getJDNFromLCD } from '../../Functions/JulianDayNumber';
import { getLCValues, buildLCString } from '../../Functions/General';
import { lcdToCRInfo, getGodNum, crString } from '../../Functions/CalendarRound';

// Load the input component page
import InitSeriesInput from './Inputs/InitSeriesInput';

// Import other code, e.g. components, styles, etc.
import { paperStyle, columnsDataGrid } from '../../Data/Components';

export default function Incomplete (props) {

     // First, import any of the props items we'll need
     const { correlation, names } = props;

    // Next, define some local variables and how to set them
    // Begin with initializing an empty array
    const [ lcdSet, setLCDSet ] = useState([]);


    // This changes the nature of the input bar at the top of the page
    function inputContent() {
        return <InitSeriesInput calcSet={handleSetChange} names={names} />;
    }

    // Handle changes to the LCD set
    function handleSetChange(lcdSet)     { setLCDSet(lcdSet); }

    // This determines gives the middle area of the page, which is a message to the user
    function handleHeader() {
        let setLength = lcdSet.length;
        return 'Resulting set of LCDs has ' + setLength + ' elements';
    }

    // This function gets the lines of data that will be displayed in the table
    // We need to build in protection against an exorbitant number of lines, e.g. 1,000,000 lines
    // If we calculate that we would show more than X number of lines, it prevents rendering
    function getLines() {
        
        // Assign the current state set to a local set variable
        let LCDset = lcdSet;
        
        // This set is to hold the reporting lines for the table, to be populated
        let set = [];

        // Adjust the max index to display only up to the line limit regardless of the array size
        let maxIndex = 0;
        let limit = 10000;
        if (LCDset.length >= limit){
            maxIndex = limit - 1;
        } else {
            maxIndex = LCDset.length - 1;
        }
        
        // Start the FOR loop to create the lines we will display in the render() table below
        for (let i = 0; i <= maxIndex; i += 1) {
            let thisLCD = LCDset[i];
            let lc = getLCValues(thisLCD);
            let cr = lcdToCRInfo(thisLCD);
            set.push({
                id: i+1,
                LCD: thisLCD,
                JDN:       getJDNFromLCD(thisLCD, correlation),
                LongCount: buildLCString(lc),
                CR:        crString(cr, names),
                Lord:      getGodNum(lc.winals, lc.kins),
                Gregorian: getJDNDateString(jdnToDate(getJDNFromLCD(thisLCD, correlation), 'g'), 'g', false),
                Julian:    getJDNDateString(jdnToDate(getJDNFromLCD(thisLCD, correlation), 'j'), 'j', false),
            });
        }

        // Return the set of lines we just built with the FOR loop
        return set;
    }

    return(
        <div>
            <Grid container>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <h1>Solve Incomplete Initial Series Dates</h1>
                        <p>Use the controls below to enter as much information as possible and find corresponding date matches<br></br>
                        Select UNK (unknown) where necessary to indicate no selection for that field, which allows for more matches<br></br>
                        Note that if a date part is not possible, e.g. 16 Uayeb for the Haab, the record set will have zero results<br></br>
                        If nothing is selected, no results will be returned; please be patient, some selections will result in large result sets that take 60+ seconds<br></br>
                        </p>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <Grid container>
                            <Grid item xs={12} md={2}>{'Input Initial Series'}</Grid>
                            <Grid item xs={12} md={10}>{inputContent()}</Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <Grid container>
                            <Grid item xs={12}>Searching using the above criteria...</Grid>
                            <Grid item xs={12}><b>{handleHeader()}</b></Grid>
                            <Grid item xs={12}>{'Using correlation factor: ' + correlation }</Grid>
                            <Grid item xs={12}>{'NOTE: If the resulting set has more than 10,000 lines, only the first 10,000 will be shown'}</Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <div style={{ height: 400, width: '100%', backgroundColor: '#cccccc', borderRadius: 10, border: 0 }}>
                            <DataGrid
                                rows={getLines()}
                                columns={ columnsDataGrid }
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );

}

Incomplete.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};
