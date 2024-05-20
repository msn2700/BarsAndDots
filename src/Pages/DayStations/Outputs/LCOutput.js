// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

// Import the functions that we'll need for this
import { getLCValues, buildLCString } from '../../../Functions/General';
import { getNext819Station, getPlaceIn819Cycle, getLast819Station, getNumStations } from '../../../Functions/819DayStation';
import { lcdToCRInfo, getDirectionColorIndex, crString } from '../../../Functions/CalendarRound';

// Import the data arrays that we'll need too
import { DIRECTIONS, COLORS } from '../../../Data/CalendarRoundData';

export default function LCOutput(props) {

    // First, import any of the props items we'll need
    const { lcd, names } = props;

    let lc = getLCValues(lcd);
    if (getPlaceIn819Cycle(lcd) === 1) {

        let cr = lcdToCRInfo(lcd);
        return (
            <Grid container>
                <Grid item xs={12} md={12}>{buildLCString(lc) + ' ' + crString(cr, names) + ' is an 819 day station'}</Grid>
                <Grid item xs={false} md={3}></Grid>
                <Grid item xs={12} md={2}>{'Station ' + getNumStations(lcd)}</Grid>
                <Grid item xs={12} md={2}>{'Color: ' + COLORS[getDirectionColorIndex(cr.tzolkinName)]}</Grid>
                <Grid item xs={12} md={2}>{'Direction: ' + DIRECTIONS[getDirectionColorIndex(cr.tzolkinName)]}</Grid>
                <Grid item xs={false} md={3}></Grid>
            </Grid>
        );
    }
    else {

        // Let's define some station information that will help keep things organized
        // First, find the station ahead of and behind the current date
        let priorStation = getLast819Station(lcd);
        let forwardStation = getNext819Station(lcd);

        // Now calculate the number of days forward and backward to reach those dates from this one
        let daysBackward = Math.abs(lcd - getLast819Station(lcd));
        let daysForward = getNext819Station(lcd) - lcd;

        // Find the long count and calendar round info for the station prior to this date
        let lcPrior = getLCValues(priorStation);
        let crPrior = lcdToCRInfo(priorStation);

        // Now find the long count / calendar round info for the station ahead of this date
        let crForward = lcdToCRInfo(forwardStation);
        let lcForward = getLCValues(forwardStation);
            
        return (
            <Grid container>

                <Grid item xs={12} md={12}>{buildLCString(lc) + ' ' + crString(lcdToCRInfo(lcd), names) + ' is NOT an 819 day station'}</Grid>
                
                <Grid item xs={12} md={12}><div><br></br></div></Grid>
                <Grid item xs={12} md={12}>The nearest 819 Day Stations are {daysBackward} day(s) prior at:</Grid>
                <Grid item xs={12} md={12}><div><br></br></div></Grid>

                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={6} md={2}>{buildLCString(lcPrior)}</Grid>
                <Grid item xs={6} md={2}>{crString(crPrior, names)}</Grid>
                <Grid item xs={6} md={2}>Station {getNumStations(priorStation)}</Grid>
                <Grid item xs={6} md={2}>{ DIRECTIONS[getDirectionColorIndex(crPrior.tzolkinName)] + ' ' + COLORS[getDirectionColorIndex(crPrior.tzolkinName)] }</Grid>
                
                <Grid item xs={12} md={12}><div><br></br></div></Grid>
                <Grid item xs={12} md={12}>And {daysForward} day(s) forward at:</Grid>
                <Grid item xs={12} md={12}><div><br></br></div></Grid>

                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={6} md={2}>{buildLCString(lcForward)}</Grid>
                <Grid item xs={6} md={2}>{crString(crForward, names)}</Grid>
                <Grid item xs={6} md={2}>Station {getNumStations(forwardStation)}</Grid>
                <Grid item xs={6} md={2}>{ DIRECTIONS[getDirectionColorIndex(crForward.tzolkinName)] + ' ' + COLORS[getDirectionColorIndex(crForward.tzolkinName)] }</Grid>

            </Grid>
        )
    }

}

LCOutput.propTypes = {
    lcd: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};
