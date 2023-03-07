// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the functions that we'll need
import { getTzolkPos } from '../../../Functions/CalendarRound';

// Import the data arrays that we'll need too
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS } from '../../../Data/CalendarRoundData';

class TzolkDiff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tzolkinCoefficient: 1,
            tzolkinName: 0,
            tzolkinCoefficient2: 1,
            tzolkinName2: 0,
        };
        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleTzolkinCoefficientChange2 = this.handleTzolkinCoefficientChange2.bind(this);
        this.handleTzolkinNameChange2 = this.handleTzolkinNameChange2.bind(this);
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

    handleTzolkinCoefficientChange2 (event) {
        this.setState({
            tzolkinCoefficient2: event.target.value,
        });
    }

    handleTzolkinNameChange2 (event) {
        this.setState({
            tzolkinName2: event.target.value,
        });
    }

    render() {

        return(
            <Grid container>

                <Grid item md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TN1">1st Tzolk'in Number</InputLabel>
                                <Select 
                                    value={this.state.tzolkinCoefficient} 
                                    onChange={this.handleTzolkinCoefficientChange}
                                    labelid="TN1"
                                    label="1st Tzolk'in Number"
                                >
                                    {TZOLKIN_COEFFICIENTS.map(number => {
                                        return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TM1">1st Tzolk'in Name</InputLabel>
                                <Select 
                                    value={this.state.tzolkinName} 
                                    onChange={this.handleTzolkinNameChange}
                                    labelid="TM1"
                                    label="1st Tzolk'in Name"
                                >
                                    {TZOLKIN_NAMES.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TN2">2nd Tzolk'in Number</InputLabel>
                                <Select 
                                    value={this.state.tzolkinCoefficient2} 
                                    onChange={this.handleTzolkinCoefficientChange2}
                                    labelid="TN2"
                                    label="2nd Tzolk'in Number"
                                >
                                    {TZOLKIN_COEFFICIENTS.map(number => {
                                        return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TM2">2nd Tzolk'in Name</InputLabel>
                                <Select 
                                    value={this.state.tzolkinName2} 
                                    onChange={this.handleTzolkinNameChange2}
                                    labelid="TM2"
                                    label="2nd Tzolk'in Name"
                                >
                                    {TZOLKIN_NAMES.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>


                </Grid>

                <Grid item md={3}>
                    Distance from {this.state.tzolkinCoefficient + ' ' + TZOLKIN_NAMES[this.state.tzolkinName][this.props.names] + ' '} 
                        to {this.state.tzolkinCoefficient2 + ' ' + TZOLKIN_NAMES[this.state.tzolkinName2][this.props.names] + ' '}
                        is {getTzolkPos(this.state.tzolkinCoefficient2 - 1 , this.state.tzolkinName2) - 
                            getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName) } days
                </Grid>

            </Grid>
        );
    }
}

TzolkDiff.propTypes = {
    names: PropTypes.string.isRequired,
}

export default TzolkDiff;