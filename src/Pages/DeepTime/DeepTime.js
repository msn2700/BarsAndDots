// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

// Import functions that we'll need
import { parseBigLCString, buildBigLCFromLCD, bigLCDToCRInfo } from '../../Functions/DeepTime.js';
import { crString } from '../../Functions/CalendarRound.js';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

class DeepTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // These are long count strings, e.g. 13.0.9.8.7, that the user enters
            distanceNum: '0.0',
            anchorDate: '0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0',

            // Using the value from Coba, Stela 1... mostly
            //eraDay:    '13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.0.0.0.0.0',
            //anchorDate: '13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.13.0.0.0.0.0',

            // These are LCD or big integer values, using the function to ensure the startup shows accurately
            newDN: parseBigLCString('0.0'),
            newAnchor: parseBigLCString('0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0'), 
            
        };

        this.changeAnchorDate = this.changeAnchorDate.bind(this);
        this.changeDistanceNum = this.changeDistanceNum.bind(this);
    }


    changeAnchorDate (event) {
        this.setState({ 
            anchorDate: event.target.value,                             // string
            newAnchor: parseBigLCString(String(event.target.value)),    // LCD
        });
    }

    changeDistanceNum (event) {
        this.setState({ 
            distanceNum: event.target.value,                        // string
            newDN: parseBigLCString(String(event.target.value)),    // LCD
        });
    }

    render() {

        // Calculate the CR info for the anchor date
        let cr = bigLCDToCRInfo(BigInt(this.state.newAnchor));
        let anchorCR = crString(cr, this.props.names);

        // Calculate the CR for the anchor + distance date
        let addCR = bigLCDToCRInfo(BigInt(this.state.newAnchor) + BigInt(this.state.newDN));
        let addCRString = crString(addCR,this.props.names);

        // Calculate the CR for the anchor - distance date
        let diffCR = bigLCDToCRInfo(BigInt(this.state.newAnchor) - BigInt(this.state.newDN));
        let diffCRString = crString(diffCR,this.props.names);

        // Calculate the CR info for the era date entered
        let eraCR = bigLCDToCRInfo(BigInt(0));
        let eraCRString = crString(eraCR, this.props.names);

        // Find the difference between the era day and anchor day LCD
        let offset = Number(BigInt(this.state.newAnchor));


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
                                        value={this.state.anchorDate}
                                        onChange={this.changeAnchorDate}
                                        helperText="Enter an anchor date, must be to 24th order..."
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        label="Distance Number (DN)" 
                                        value={this.state.distanceNum}
                                        onChange={this.changeDistanceNum} 
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
                            <p>The starting anchor date is {this.state.anchorDate + ' ' + anchorCR} with LCD = {offset}</p>
                            <p>The distance number is {this.state.distanceNum}, indicating {this.state.newDN} days</p>
                            <p>AD + DN gives LCD = {offset + Number(this.state.newDN)} days</p>
                            <p>AD + DN = {buildBigLCFromLCD(BigInt(this.state.newAnchor) + BigInt(this.state.newDN)) + ' ' + addCRString}</p>
                            <p>AD - DN gives LCD = {offset - Number(this.state.newDN)} days</p>
                            <p>AD - DN = {buildBigLCFromLCD(BigInt(this.state.newAnchor) - BigInt(this.state.newDN)) + ' ' + diffCRString}</p>
                        </Paper>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}

DeepTime.propTypes = {    
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
}

export default DeepTime;