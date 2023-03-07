// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the various functions that we'll need
import { getTzolkPos } from '../../../Functions/CalendarRound';

// Import data arrays that we'll need
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS } from '../../../Data/CalendarRoundData';

class TzolkPos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tzolkinCoefficient: 1,
            tzolkinName: 0,
        };
        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
    }

    handleTzolkinCoefficientChange (event) {
        this.setState({
            tzolkinCoefficient: event.target.value,
        });
    }

    handleTzolkinNameChange (event) {
        this.setState({
            tzolkinName: event.target.value,
        });
    }

    render() {

        return(
            <Grid container>

                <Grid item xs={12} md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TN">Tzolk'in Number</InputLabel>
                                <Select 
                                    value={this.state.tzolkinCoefficient} 
                                    onChange={this.handleTzolkinCoefficientChange}
                                    labelid="TN"
                                    label="Tzolk'in Number"
                                >
                                    {TZOLKIN_COEFFICIENTS.map(number => {
                                        return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TM">Tzolk'in Name</InputLabel>
                                <Select 
                                    value={this.state.tzolkinName} 
                                    onChange={this.handleTzolkinNameChange}
                                    labelid="TM"
                                    label="Tzolk'in Name"
                                >
                                    {TZOLKIN_NAMES.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={false} md={6}>
                        </Grid>
                    </Grid>

                </Grid>


                <Grid item md={3}>
                    {this.state.tzolkinCoefficient + ' ' + TZOLKIN_NAMES[this.state.tzolkinName][this.props.names] + ' '} 
                        is Day {getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName)} of the 260 Tzolk'in Day Cycle
                </Grid>

            </Grid>
        );
    }
}

TzolkPos.propTypes = {
    names: PropTypes.string.isRequired,
}

export default TzolkPos;