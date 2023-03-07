// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';

class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // No state variables needed for this
        };
        this.handleClose = this.handleClose.bind(this);
    }

    // Handle closing the dialog window
    handleClose () {
        this.props.changeopen(false);
    }

    // Render the dialog window to show the message with a close button
    render() {

        return(
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center' }}>Help, Assumptions and Insight</DialogTitle>

                    <DialogContent>
                        <p>These are a few of our basic assumptions and parameter values...</p>

                        <p><b>Paradigms</b><br></br>
                        The default correlation is Modified GMT-2 584,283<br></br>
                        The default day/month naming system is Yucatecan<br></br>
                        For Year Bearers, we are using the Tikal/Dresden codex (0 POP) system<br></br>
                        For Lunar Info (Glyphs E,D,C,Y), we use the Period of Uniformity system<br></br>
                        For Determinants, we are using the modern, mean tropical year of 365.2421875... days 
                        (yielding a correction of -201 days for the date 9.15.0.0.0; Teeple and Thompson's original system would yield -200 days)<br></br></p>

                        <p><b>Astronomical Values</b><br></br>
                        For celestial bodies, these are the mean synodic periods (in earth-days):<br></br>
                        Earth's moon: 29.53059028 (New moon on 01/24/2001 CE Greg 13:07:00 UTC)<br></br>
                        Saturn: 378.09 (Zero on 07/26/0934 CE Greg, at opposition) <br></br>
                        Jupiter: 398.88 (Zero on 12/22/0934 CE Greg, at opposition)<br></br>
                        Venus: 583.92 (Zero on 11/19/0934 CE Greg, from Dresden Codex tables)<br></br></p>
                        
                        <p><b>Date Limits</b><br></br>
                        For Gregorian/Julian dates, we only allow input for 4800 BCE to 4800 CE
                        since strict adherance to the current rules of those calendars leads to drift that increases with distance from 0 CE.
                        Using additional, larger-scale corrections to those calendars to limit drift leads to date shifts for events in
                        recorded history. For dates outside that range, therefore, use JDN or LCD where available for best astronomical accuracy<br></br></p>

                        <p><b>Piktun Values</b><br></br>
                        The largest cycle that can be selected is the piktun. In accordance with what little information we have on the piktun
                        value before and after Era Day (e.g. Tikal Stela 10, the Palenque text above Pakal’s tomb, etc.) while also acknowledging the
                        reset of the timeline by the hero twins in the Popol Vuh, our numbering scheme works like this...<br></br>
                        <ul>1st Creation -- Piktun = 17 -- 20 Baktuns total</ul>
                        <ul>2nd Creation -- Piktun = 18 -- 20 Baktuns total</ul>
                        <ul>3rd Creation -- Piktun = 19 -- 13 Baktuns total</ul>
                        <ul>4th Creation -- Piktun = 00 -- 20 Baktuns total</ul>
                        <ul>5th Creation -- Piktun = 01 -- 20 Baktuns total</ul> 
                        Thus our piktun dropdown selection runs in chronological order: 10,11,...,19,0,1,2,...,9 to span a single (shortened) 
                        Kalabtun of time available to the user (or 393 Baktuns total).</p>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

Help.propTypes = {
    open: PropTypes.bool.isRequired,
    changeopen: PropTypes.func.isRequired,
}

export default Help;