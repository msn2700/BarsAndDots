// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

// Import the input and output components
import LCInput from './Inputs/LCInput';
import CRInput from './Inputs/CRInput';
import LCOutput from './Outputs/LCOutput';
import CROutput from './Outputs/CROutput';

// Import other code, e.g. components, styles, etc.
import { paperStyle, radioStyleDS } from '../../Data/Components';

export default function DayStations(props) {

    // First, import any of the props items we'll need
    const { names } = props;

    // Next, define all the local variables and ways to change them
    // Next, define all the local variables and ways to change them
    const [ tzolkinCoefficient, setTCoeff ] = useState(0);
    const [ tzolkinName,        setTName  ] = useState(15);
    const [ haabCoefficient,    setHCoeff ] = useState(9);
    const [ haabName,           setHName  ] = useState(3);
    const [ selectedInput,      setSelectedInput ] = useState('cr');
    const [ lcd,                setLCD           ] = useState(1873869);

    // Get the input components
    function getInput() {
        if (selectedInput === 'cr') { return <CRInput calcCR={calcCR} names={names} /> }
        else { return <LCInput calcLCD={calcLCD} /> }
    }

    //Get the output components
    function getOutput() {
        if (selectedInput === 'cr') {
            return <CROutput names={names} tzolkinCoefficient={tzolkinCoefficient} tzolkinName={tzolkinName} 
                haabCoefficient={haabCoefficient} haabName={haabName} />
        }
        else {
            return <LCOutput lcd={lcd} names={names} />
        }
    }

    // New version of function to get various properties from CRInput   
    function calcCR(tzolkinCoefficient, tzolkinName, haabCoefficient, haabName) {
        setTCoeff(tzolkinCoefficient);
        setTName(tzolkinName);
        setHCoeff(haabCoefficient);
        setHName(haabName);
    }
    
    // Calculate and handle other events
    function calcLCD(lcd)             { setLCD(lcd);             }
    function handleInputChange(input) { setSelectedInput(input); }

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
                    <Paper sx={ radioStyleDS }>
                        <Grid container>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <RadioGroup>
                                    <FormControlLabel value="cr" control={
                                        <Radio 
                                            checked={selectedInput === 'cr'} 
                                            onChange={() => handleInputChange('cr')} 
                                            color="primary" />} 
                                        label="Find two 819 day stations with a specified Calendar Round"   
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <RadioGroup>
                                    <FormControlLabel value="lc" control={
                                        <Radio 
                                            checked={selectedInput === 'lc'} 
                                            onChange={() => handleInputChange('lc')} 
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
                        {getInput()}
                    </Paper>
                </Grid>

                {/* Show the corresponding output to the user */}
                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        {getOutput()}
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

DayStations.propTypes = {
    names: PropTypes.string.isRequired,
}
