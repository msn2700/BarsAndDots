// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Import the input pages that we'll need
import NumberInput from './NumberInput';
import LongCountInput from './LongCountInput';

// Import the functions that we'll need to use
import { getLCValues, buildLCString } from '../../Functions/General';
import { getLCDFromJDN, changeToJDN } from '../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { paperStyle } from '../../Data/Components';

// Create the array that holds style properties for <Paper>
const radioStyle = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '15px',
    paddingRight: '5px',
}


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

class TemporalCycles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            input: 'lc',
            lcd: getLCDFromJDN(changeToJDN(new Date().getDate(), 
                new Date().getMonth() + 1, 
                new Date().getFullYear()),
                this.props.correlation),
            number: getLCDFromJDN(changeToJDN(new Date().getDate(), 
                new Date().getMonth() + 1, 
                new Date().getFullYear()),
                this.props.correlation),

        };

        this.handleLCDChange = this.handleLCDChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleLCDChange(lcd)        { this.setState({ lcd: lcd }); }
    handleNumberChange(num)     { this.setState({ number: num }); }
    handleInputChange(input)    { this.setState({ input: input }); }

    // Determine the quotient from the division to fixed decimals
    calcDivision(input, cycle) {
        if (input > cycle) { return (input / cycle).toFixed(3); }
        else { return (cycle / input).toFixed(3); }
    }

    // Find the remainder / modulus from the division to fixed decimals
    calcRemainder(input, cycle) {
        if (input > cycle) { return (input % cycle).toFixed(3); }
        else { return (cycle % input).toFixed(3); }
    }

    render() {

        // Record the value selected depending on the input method
        let value = this.state.input === 'lc' ? Math.abs(this.state.lcd) : this.state.number;

        // Get the long count properties from the LCD
        let lc = getLCValues(this.state.lcd);

        // Create the explanatory label that depends on the input method
        let label = this.state.input === 'num' ? this.state.number : buildLCString(lc) + ' (LCD = ' + this.state.lcd + ')';

        // Create the table to show on the page
        let table = [
            
            {id: 1,  name: 'Lord of the Night',             cycle: 9, divResult: this.calcDivision(value, 9), remainder: this.calcRemainder(value, 9)},
            {id: 2,  name: 'Winals',                        cycle: 20, divResult: this.calcDivision(value, 20), remainder: this.calcRemainder(value, 20)},
            {id: 3,  name: 'Mercury',                       cycle: 116, divResult: this.calcDivision(value, 116), remainder: this.calcRemainder(value, 116)},
            {id: 4,  name: 'Tzolk\'ins (Sacred Year)',      cycle: 260, divResult: this.calcDivision(value, 260), remainder: this.calcRemainder(value, 260)},
            {id: 5,  name: 'Tuns',                          cycle: 360, divResult: this.calcDivision(value, 360), remainder: this.calcRemainder(value, 360)},
            {id: 6,  name: 'Computing Year',                cycle: 364, divResult: this.calcDivision(value, 364), remainder: this.calcRemainder(value, 364)},
            {id: 7,  name: 'Haab (Vague Year)',             cycle: 365, divResult: this.calcDivision(value, 365), remainder: this.calcRemainder(value, 365)},
            {id: 8,  name: 'Saturn',                        cycle: 378, divResult: this.calcDivision(value, 378), remainder: this.calcRemainder(value, 378)},
            {id: 9,  name: 'Jupter',                        cycle: 399, divResult: this.calcDivision(value, 399), remainder: this.calcRemainder(value, 399)},
            {id: 10, name: '2-Tzolk\'in by 3-Nodes',        cycle: 520, divResult: this.calcDivision(value, 520), remainder: this.calcRemainder(value, 520)},
            {id: 11, name: 'Venus',                         cycle: 584, divResult: this.calcDivision(value, 584), remainder: this.calcRemainder(value, 584)},
            {id: 12, name: 'Mars',                          cycle: 780, divResult: this.calcDivision(value, 780), remainder: this.calcRemainder(value, 780)},
            {id: 13, name: '819 Stations',                  cycle: 819, divResult: this.calcDivision(value, 819), remainder: this.calcRemainder(value, 819)},
            {id: 14, name: '7-Tzolk\'in by 5-Computing',    cycle: 1820, divResult: this.calcDivision(value, 1820), remainder: this.calcRemainder(value, 1820)},
            {id: 15, name: '6.9.0',                         cycle: 2340, divResult: this.calcDivision(value, 2340), remainder: this.calcRemainder(value, 2340)},
            {id: 16, name: '81 Lunations',                  cycle: 2392, divResult: this.calcDivision(value, 2392), remainder: this.calcRemainder(value, 2392)},
            {id: 17, name: '5-Venus by 8-Haab',             cycle: 2920, divResult: this.calcDivision(value, 2920), remainder: this.calcRemainder(value, 2920)},
            {id: 18, name: 'Katuns',                        cycle: 7200, divResult: this.calcDivision(value, 7200), remainder: this.calcRemainder(value, 7200)},
            {id: 19, name: 'Eclipse Cycle II',              cycle: 9360, divResult: this.calcDivision(value, 9360), remainder: this.calcRemainder(value, 9360)},
            {id: 20, name: 'Eclipse Cycle I',               cycle: 11960, divResult: this.calcDivision(value, 11960), remainder: this.calcRemainder(value, 11960)},
            {id: 21, name: 'Calendar Round',                cycle: 18980, divResult: this.calcDivision(value, 18980), remainder: this.calcRemainder(value, 18980)},
            {id: 22, name: 'Grand Venus',                   cycle: 37960, divResult: this.calcDivision(value, 37960), remainder: this.calcRemainder(value, 37960)},
            {id: 23, name: 'Baktuns',                       cycle: 144000, divResult: this.calcDivision(value, 144000), remainder: this.calcRemainder(value, 144000)},
            {id: 24, name: 'Moon (Sidereal)',               cycle: 27.3217, divResult: this.calcDivision(value, 27.3217), remainder: this.calcRemainder(value, 27.3217)},
            {id: 25, name: 'Mercury (Sidereal)',            cycle: 87.9694, divResult: this.calcDivision(value, 87.9694), remainder: this.calcRemainder(value, 87.9694)},
            {id: 26, name: 'Venus (Sidereal)',              cycle: 224.7012, divResult: this.calcDivision(value, 224.7012), remainder: this.calcRemainder(value, 224.7012)},
            {id: 27, name: 'Mars (Sidereal)',               cycle: 686.9958, divResult: this.calcDivision(value, 686.9958), remainder: this.calcRemainder(value, 686.9958)},
            {id: 28, name: 'Jupiter (Sidereal)',            cycle: 4332.849, divResult: this.calcDivision(value, 4332.849), remainder: this.calcRemainder(value, 4332.849)},
            {id: 29, name: 'Saturn (Sidereal)',             cycle: 10764.44, divResult: this.calcDivision(value, 10764.44), remainder: this.calcRemainder(value, 10764.44)},
            {id: 30, name: 'Gregorian Year',                cycle: 365.2425, divResult: this.calcDivision(value, 365.2422), remainder: this.calcRemainder(value, 365.2422)},
            {id: 31, name: 'Julian Year',                   cycle: 365.25, divResult: this.calcDivision(value, 365.25), remainder: this.calcRemainder(value, 365.25)},
            {id: 32, name: 'Moon (Synodic)',                cycle: 29.5306, divResult: this.calcDivision(value, 29.5306), remainder: this.calcRemainder(value, 29.5306)},
            {id: 33, name: 'Mercury (Synodic)',             cycle: 115.8775, divResult: this.calcDivision(value, 115.8775), remainder: this.calcRemainder(value, 115.8775)},
            {id: 34, name: 'Venus (Synodic)',               cycle: 583.9217, divResult: this.calcDivision(value, 583.9217), remainder: this.calcRemainder(value, 583.9217)},
            {id: 35, name: 'Mars (Synodic)',                cycle: 779.9365, divResult: this.calcDivision(value, 779.9365), remainder: this.calcRemainder(value, 779.9365)},
            {id: 36, name: 'Jupiter (Synodic)',             cycle: 398.8842, divResult: this.calcDivision(value, 398.8842), remainder: this.calcRemainder(value, 398.8842)},
            {id: 37, name: 'Saturn (Synodic)',              cycle: 378.0921, divResult: this.calcDivision(value, 378.0921), remainder: this.calcRemainder(value, 378.0921)},
            
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
                        <Paper sx={ radioStyle }>
                            <Grid container>

                                <Grid item md={2}>
                                    <FormControl component="fieldset">
                                        <RadioGroup>
                                            <FormControlLabel control={
                                                <Radio checked={this.state.input === 'lc'} 
                                                    onChange={() => this.handleInputChange('lc')} 
                                                    color="primary"
                                                />
                                                } 
                                                label="Maya Long Count"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <LongCountInput 
                                        correlation={this.props.correlation}
                                        calcLCD={this.handleLCDChange}
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <FormControl component="fieldset">
                                        <RadioGroup>
                                            <FormControlLabel control={
                                                <Radio checked={this.state.input === 'num'} 
                                                    onChange={() => this.handleInputChange('num')} 
                                                    color="primary"
                                                />
                                                } 
                                                label="Arbitrary Number" 
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <NumberInput 
                                        correlation={this.props.correlation}
                                        sendNumber={this.handleNumberChange}
                                    />
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
}

TemporalCycles.propTypes = {
    correlation: PropTypes.number.isRequired,
}

export default TemporalCycles;