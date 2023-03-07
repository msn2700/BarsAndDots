// Import all the components and packages that we'll need
import * as React from 'react';
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

class FullDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // The default input component and LCD value
            selectedInput: 'lc',
            lcdPort: getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation),
            
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputContent = this.inputContent.bind(this);
        this.handleLCDChange = this.handleLCDChange.bind(this);

    }

    handleInputChange (event) {
        this.setState({
            selectedInput: event.target.value,
        });
    }

    handleLCDChange(lcd) {
        this.setState({
            lcdPort: Number(lcd)
        });
    }

    inputContent() {
        switch(this.state.selectedInput) {
            case 'lc':      return <MayaLC  calcLCD={this.handleLCDChange} correlation={this.props.correlation} />;
            case 'date':    return <GJDate  calcLCD={this.handleLCDChange} correlation={this.props.correlation} />;
            case 'jdn':     return <JDN     calcLCD={this.handleLCDChange} correlation={this.props.correlation} />;
            case 'lcd':     return <LCD     calcLCD={this.handleLCDChange} correlation={this.props.correlation} />;
            case 'lcPop':   return <LCPop   calcLCD={this.handleLCDChange} correlation={this.props.correlation} />;
            case 'datePop': return <DatePop calcLCD={this.handleLCDChange} correlation={this.props.correlation} />;
        }
    }

    render() {

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
                                            value={this.state.selectedInput}
                                            onChange={this.handleInputChange}
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
                                    {this.inputContent()}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <CalendarCore 
                            lcd={Number(this.state.lcdPort)}
                            correlation={this.props.correlation}
                            names={this.props.names}
                        />
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
}

FullDisplay.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};

export default FullDisplay;