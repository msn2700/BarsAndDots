// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

// Import the functions that we'll need to use
import { getLCValues, buildLCString } from '../../../Functions/General';
import { lcdToCRInfo, crString, getDirectionColorIndex, getFirst819fromCR } from '../../../Functions/CalendarRound';
import { getNumStations } from '../../../Functions/819DayStation';

// Import data arrays that we'll need
import { DIRECTIONS, COLORS } from '../../../Data/CalendarRoundData';

export default function CROutput(props) {

    // First, import any of the props items we'll need
    const { tzolkinCoefficient, tzolkinName, haabCoefficient, haabName, names,  } = props;

    // Create a function that will return the relevant statements / values
    function getStations() {

        // Define the first station object that matches this configuration
        let station1 = getFirst819fromCR(parseInt(tzolkinCoefficient,10), 
                                        parseInt(tzolkinName,10), 
                                        parseInt(haabCoefficient,10), 
                                        parseInt(haabName,10));

        // Now define the next station, which is 1,195,740 days forward (and backward)
        let station2 = station1 + 1195740;

        // Now get the long counts and calendar rounds for these two dates in time
        let station1LC = getLCValues(station1);
        let station2LC = getLCValues(station2);
        let station1CR = lcdToCRInfo(station1);
        let station2CR = lcdToCRInfo(station2);

        return (
            <Grid container>
                <Grid item xs={12} md={2}>{'LCD = ' + station1}</Grid>
                <Grid item xs={12} md={2}>{buildLCString(station1LC)}</Grid>
                <Grid item xs={12} md={3}>{crString(lcdToCRInfo(station1), names)}</Grid>
                <Grid item xs={12} md={3}>{'Station ' + getNumStations(station1)}</Grid>
                <Grid item xs={12} md={2}>{ DIRECTIONS[getDirectionColorIndex(station1CR.tzolkinName)] + ' ' + COLORS[getDirectionColorIndex(station1CR.tzolkinName)] }</Grid>
                <Grid item xs={12} md={12}><div><br></br></div></Grid>
                <Grid item xs={12} md={2}>{'LCD = ' + station2}</Grid>
                <Grid item xs={12} md={2}>{buildLCString(station2LC)}</Grid>
                <Grid item xs={12} md={3}>{crString(lcdToCRInfo(station2), names)}</Grid>
                <Grid item xs={12} md={3}>{'Station ' + getNumStations(station2)}</Grid>
                <Grid item xs={12} md={2}>{ DIRECTIONS[getDirectionColorIndex(station2CR.tzolkinName)] + ' ' + COLORS[getDirectionColorIndex(station2CR.tzolkinName)] }</Grid>
            
            </Grid>
        );
    }



        return(
            <Grid container>
                <Grid item md={12}>{getStations()}</Grid>
                <Grid item md={12}>
                    <p>Select all four calendar round values before reviewing the results; if only three are set the output will be LCD=0 and LCD=1,195,740.<br></br>
                    Note that day stations should always have a Tzolkin coefficient of 1 (hence the single option in the dropdown).</p>
                </Grid>
            </Grid>
        );

}

CROutput.propTypes = {
    //correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
    tzolkinCoefficient: PropTypes.number.isRequired,
    tzolkinName: PropTypes.number.isRequired,
    haabCoefficient: PropTypes.number.isRequired,
    haabName: PropTypes.number.isRequired,
};
