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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Import the input pages that we'll need
import NumberInput from './Inputs/NumberInput';
import LongCountInput from './Inputs/LongCountInput';

// Import the functions that we'll need to use
import { getLCValues, buildLCString } from '../../Functions/General';
import { getLCDFromJDN, changeToJDN } from '../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { paperStyle, radioStyleTC } from '../../Data/Components';

// Create the column names using the renderHeader() function, or we can us the headerName: property
const columnsFormat = [
    { 
        field: 'id', 
        renderHeader: () => ( <strong>{'ID'}</strong> ),
        type: 'number',
        width: 20, 
      },
    { 
        field: 'name', 
        renderHeader: () => ( <strong>{'Cycle Name'}</strong> ),
        type: 'string',
        width: 200, 
    },
    {
        field: 'cycle',
        renderHeader: () => ( <strong>{'Period (Earth days)'}</strong> ),
        type: 'number',
        width: 150,
    },
    {
        field: 'divResult',
        renderHeader: () => ( <strong>{'Division Result'}</strong> ),
        type: 'number',
        width: 150,
    },
    {
        field: 'remainder',
        renderHeader: () => ( <strong>{'Remainder / Modulus'}</strong> ),
        type: 'number',
        width: 170,
    },
  ];

export default function TemporalCycles(props) {

    // First, import any of the props items we'll need
    const { correlation } = props;

    // Next, define some local variables and how to set them
    const [ input, setInput] = useState('lc');
    const [ lcd, setLCD ] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation), );
    const [ number, setNumber] = useState( getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation), );

    // Handle the change of input when the user uses the radio buttons
    function handleInputChange(input)    { setInput(input); }

    // Determine the quotient from the division to fixed decimals
    function calcDivision(input, cycle) {
        if (input > cycle) { return (input / cycle).toFixed(3); }
        else { return (cycle / input).toFixed(3); }
    }

    // Find the remainder / modulus from the division to fixed decimals
    function calcRemainder(input, cycle) {
        if (input > cycle) { return (input % cycle).toFixed(3); }
        else { return (cycle % input).toFixed(3); }
    }

    // Record the value selected depending on the input method
    let value = input === 'lc' ? Math.abs(lcd) : number;

    // Get the long count properties from the LCD
    let lc = getLCValues(lcd);

    // Create the explanatory label that depends on the input method
    let label = input === 'num' ? number : buildLCString(lc) + ' (LCD = ' + lcd + ')';

    // Create the table to show on the page
    let table = [
        
        {id: 1,  name: 'Lord of the Night',             cycle: 9, divResult: calcDivision(value, 9), remainder: calcRemainder(value, 9)},
        {id: 2,  name: 'Winals',                        cycle: 20, divResult: calcDivision(value, 20), remainder: calcRemainder(value, 20)},
        {id: 3,  name: 'Mercury',                       cycle: 116, divResult: calcDivision(value, 116), remainder: calcRemainder(value, 116)},
        {id: 4,  name: 'Tzolk\'ins (Sacred Year)',      cycle: 260, divResult: calcDivision(value, 260), remainder: calcRemainder(value, 260)},
        {id: 5,  name: 'Tuns',                          cycle: 360, divResult: calcDivision(value, 360), remainder: calcRemainder(value, 360)},
        {id: 6,  name: 'Computing Year',                cycle: 364, divResult: calcDivision(value, 364), remainder: calcRemainder(value, 364)},
        {id: 7,  name: 'Haab (Vague Year)',             cycle: 365, divResult: calcDivision(value, 365), remainder: calcRemainder(value, 365)},
        {id: 8,  name: 'Saturn',                        cycle: 378, divResult: calcDivision(value, 378), remainder: calcRemainder(value, 378)},
        {id: 9,  name: 'Jupter',                        cycle: 399, divResult: calcDivision(value, 399), remainder: calcRemainder(value, 399)},
        {id: 10, name: '2-Tzolk\'in by 3-Nodes',        cycle: 520, divResult: calcDivision(value, 520), remainder: calcRemainder(value, 520)},
        {id: 11, name: 'Venus',                         cycle: 584, divResult: calcDivision(value, 584), remainder: calcRemainder(value, 584)},
        {id: 12, name: 'Mars',                          cycle: 780, divResult: calcDivision(value, 780), remainder: calcRemainder(value, 780)},
        {id: 13, name: '819 Stations',                  cycle: 819, divResult: calcDivision(value, 819), remainder: calcRemainder(value, 819)},
        {id: 14, name: '7-Tzolk\'in by 5-Computing',    cycle: 1820, divResult: calcDivision(value, 1820), remainder: calcRemainder(value, 1820)},
        {id: 15, name: '6.9.0',                         cycle: 2340, divResult: calcDivision(value, 2340), remainder: calcRemainder(value, 2340)},
        {id: 16, name: '81 Lunations',                  cycle: 2392, divResult: calcDivision(value, 2392), remainder: calcRemainder(value, 2392)},
        {id: 17, name: '5-Venus by 8-Haab',             cycle: 2920, divResult: calcDivision(value, 2920), remainder: calcRemainder(value, 2920)},
        {id: 18, name: 'Katuns',                        cycle: 7200, divResult: calcDivision(value, 7200), remainder: calcRemainder(value, 7200)},
        {id: 19, name: 'Eclipse Cycle II',              cycle: 9360, divResult: calcDivision(value, 9360), remainder: calcRemainder(value, 9360)},
        {id: 20, name: 'Eclipse Cycle I',               cycle: 11960, divResult: calcDivision(value, 11960), remainder: calcRemainder(value, 11960)},
        {id: 21, name: 'Calendar Round',                cycle: 18980, divResult: calcDivision(value, 18980), remainder: calcRemainder(value, 18980)},
        {id: 22, name: 'Grand Venus',                   cycle: 37960, divResult: calcDivision(value, 37960), remainder: calcRemainder(value, 37960)},
        {id: 23, name: 'Baktuns',                       cycle: 144000, divResult: calcDivision(value, 144000), remainder: calcRemainder(value, 144000)},
        {id: 24, name: 'Moon (Sidereal)',               cycle: 27.3217, divResult: calcDivision(value, 27.3217), remainder: calcRemainder(value, 27.3217)},
        {id: 25, name: 'Mercury (Sidereal)',            cycle: 87.9694, divResult: calcDivision(value, 87.9694), remainder: calcRemainder(value, 87.9694)},
        {id: 26, name: 'Venus (Sidereal)',              cycle: 224.7012, divResult: calcDivision(value, 224.7012), remainder: calcRemainder(value, 224.7012)},
        {id: 27, name: 'Mars (Sidereal)',               cycle: 686.9958, divResult: calcDivision(value, 686.9958), remainder: calcRemainder(value, 686.9958)},
        {id: 28, name: 'Jupiter (Sidereal)',            cycle: 4332.849, divResult: calcDivision(value, 4332.849), remainder: calcRemainder(value, 4332.849)},
        {id: 29, name: 'Saturn (Sidereal)',             cycle: 10764.44, divResult: calcDivision(value, 10764.44), remainder: calcRemainder(value, 10764.44)},
        {id: 30, name: 'Gregorian Year',                cycle: 365.2425, divResult: calcDivision(value, 365.2422), remainder: calcRemainder(value, 365.2422)},
        {id: 31, name: 'Julian Year',                   cycle: 365.25, divResult: calcDivision(value, 365.25), remainder: calcRemainder(value, 365.25)},
        {id: 32, name: 'Moon (Synodic)',                cycle: 29.5306, divResult: calcDivision(value, 29.5306), remainder: calcRemainder(value, 29.5306)},
        {id: 33, name: 'Mercury (Synodic)',             cycle: 115.8775, divResult: calcDivision(value, 115.8775), remainder: calcRemainder(value, 115.8775)},
        {id: 34, name: 'Venus (Synodic)',               cycle: 583.9217, divResult: calcDivision(value, 583.9217), remainder: calcRemainder(value, 583.9217)},
        {id: 35, name: 'Mars (Synodic)',                cycle: 779.9365, divResult: calcDivision(value, 779.9365), remainder: calcRemainder(value, 779.9365)},
        {id: 36, name: 'Jupiter (Synodic)',             cycle: 398.8842, divResult: calcDivision(value, 398.8842), remainder: calcRemainder(value, 398.8842)},
        {id: 37, name: 'Saturn (Synodic)',              cycle: 378.0921, divResult: calcDivision(value, 378.0921), remainder: calcRemainder(value, 378.0921)},
        
    ];

    return(
        <div>
            <Grid container>
                
                <Grid item md={12}>
                    <Paper sx={ paperStyle }>
                        <h1>Compare An Input Date to Various Temporal Cycles</h1>
                        <p>Select a radio button option and then enter appropriate values to see quotients and remainders</p>
                    </Paper>
                </Grid>
                
                <Grid item md={12}>
                    <Paper sx={ radioStyleTC }>
                        <Grid container>

                            <Grid item md={2}>
                                <FormControl component="fieldset">
                                    <RadioGroup>
                                        <FormControlLabel control={
                                            <Radio checked={input === 'lc'} 
                                                onChange={() => handleInputChange('lc')} 
                                                color="primary"
                                            />
                                            } 
                                            label="Maya Long Count"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LongCountInput correlation={correlation} setLCD={setLCD} />
                            </Grid>
                            <Grid item md={2}>
                                <FormControl component="fieldset">
                                    <RadioGroup>
                                        <FormControlLabel control={
                                            <Radio checked={input === 'num'} 
                                                onChange={() => handleInputChange('num')} 
                                                color="primary"
                                            />
                                            } 
                                            label="Arbitrary Number" 
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <NumberInput number={number} setNumber={setNumber} />
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>

                <Grid item md={12}>
                    <Paper sx={ paperStyle }>
                        <p>Comparing <b>{label}</b> to various cycles (some are larger / smaller in magnitude)</p>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper sx={ paperStyle }>
                        <div style={{ height: 400, width: '100%', backgroundColor: '#cccccc', borderRadius: 10, border: 0 }}>
                            <DataGrid
                                rows={table}
                                columns={columnsFormat}
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

TemporalCycles.propTypes = {
    correlation: PropTypes.number.isRequired,
}
