// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

// Import the input and output components
import LCInput from './LCInput';
import CRInput from './CRInput';
import LCOutput from './LCOutput';
import CROutput from './CROutput';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

// Create the array that holds style properties for <Paper>
const radioStyle = {
    backgroundColor: '#cccccc', 
    textAlign: 'left', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '15px',
    paddingRight: '5px',
}

class DayStations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            open: false,
            selectedInput: 'cr',
            lcd: 1873869,          // This LCD corresponds to 0.13.0.5.3.9, a known 819-day station

            tzolkinCoefficient: 0, // 1
            tzolkinName: 15,       // Kib'
            haabCoefficient: 9,    // 9
            haabName: 3,           // Zotz
            
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getInput = this.getInput.bind(this);
        this.calcLCD = this.calcLCD.bind(this);
        this.calcCR = this.calcCR.bind(this);
        this.getOutput = this.getOutput.bind(this);

    }

    // Get the input components
    getInput() {
        if (this.state.selectedInput === 'cr') {
            return <CRInput
                calcCR={this.calcCR}
                correlation={this.props.correlation}
                names={this.props.names}
                tzolkinCoefficient={this.state.tzolkinCoefficient}
                tzolkinName={this.state.tzolkinName}
                haabCoefficient={this.state.haabCoefficient}
                haabName={this.state.haabName}
            />
        }
        else {
            return <LCInput
                calcLCD={this.calcLCD}
                correlation={this.props.correlation}
            />
        }
    }

    //Get the output components
    getOutput() {
        if (this.state.selectedInput === 'cr') {
            return <CROutput
                correlation={this.props.correlation}
                names={this.props.names}
                tzolkinCoefficient={this.state.tzolkinCoefficient}
                tzolkinName={this.state.tzolkinName}
                haabCoefficient={this.state.haabCoefficient}
                haabName={this.state.haabName}
            />
        }
        else {
            return <LCOutput
                lcd={this.state.lcd}
                names={this.props.names}
            />
        }
    }

    // New version of function to get various properties from CRInput   
    calcCR(tzolkinCoefficient, tzolkinName, haabCoefficient, haabName) {
        this.setState({
            tzolkinCoefficient: tzolkinCoefficient,
            tzolkinName: tzolkinName,
            haabCoefficient: haabCoefficient,
            haabName: haabName,
        });
    }
    
    // Calculate and handle other events
    calcLCD(lcd)             { this.setState({ lcd: lcd,             }); }
    handleInputChange(input) { this.setState({ selectedInput: input, }); }
    handleClickOpen ()       { this.setState({ open: true            }); }
    handleClose ()           { this.setState({ open: false           }); }

    render() {

        return(
            <div>
                <Grid container>
                    
                    <Grid item xs={12}>
                        <Paper sx={ paperStyle }>
                            <h1>Find 819-Cycle Day Stations</h1>
                            <p>Use either of the two modes below to locate 819-day stations with given properties<br></br>
                            Note that only day stations <i>after</i> the Era Day (or after 0.0.0.0.0.0) will be considered for calendar round matching</p>
                        </Paper>
                    </Grid>
                    
                    {/* Show the user radio button options so they can select how they want to proceed */}
                    <Grid item xs={12}>
                        <Paper sx={ radioStyle }>
                            <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset">
                                    <RadioGroup>
                                        <FormControlLabel value="cr" control={<Radio checked={this.state.selectedInput === 'cr'} 
                                                                                    onChange={() => this.handleInputChange('cr')} 
                                                                                    color="primary" />} 
                                            label="Find two 819 day stations with a specified Calendar Round" 
                                            //labelPlacement="start"
                                            
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset">
                                    <RadioGroup>
                                        <FormControlLabel value="lc" control={<Radio checked={this.state.selectedInput === 'lc'} 
                                                                                    onChange={() => this.handleInputChange('lc')} 
                                                                                    color="primary" />} 
                                            label="Find the 819 day station nearest a Long Count input"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Collect some input from the user */}
                    <Grid item xs={12}>
                        <Paper sx={ paperStyle }>
                            {this.getInput()}
                        </Paper>
                    </Grid>

                    {/* Show the corresponding output to the user */}
                    <Grid item xs={12}>
                        <Paper sx={ paperStyle }>
                            {this.getOutput()}
                        </Paper>
                    </Grid>

                    {/* Add some commentary at the bottom of the screen to help explain */}
                    <Grid item xs={12}>
                        <Paper sx={ paperStyle }>
                        <p>Notice that stations with the same CRs occur at intervals of 
                        8.6.1.9.0 (1,195,740 days = 3,276 Haab Years = 1,460 stations). This makes sense since 1,195,740 days is the 
                        least common multiple of 819 and 18,980. The Lord of the Night 
                        in Station #1 was 6 and remains a 6 since 9 is a factor of 819.
                        Also note that the color and direction 
                        repeat every 4 stations (4 is a factor of 1460 since 4 x 365 = 1460)</p>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

DayStations.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
}

export default DayStations;