// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the functions that we'll need
import { getTzolkPos, getHaabPos, getCRPos, crString, getHaabCoeffList } from '../../../Functions/CalendarRound';

// Import the various data arrays that we'll need
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS, ALLOWED_HAAB_NAMES, POSSIBLE_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

class CRDiff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            tzolkinCoefficient: 1,
            tzolkinName: 0,
            haabCoefficient: 0,
            haabName: 0,

            tzolkinCoefficient2: 1,
            tzolkinName2: 0,
            haabCoefficient2: 0,
            haabName2: 0,
        };

        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);

        this.handleTzolkinCoefficientChange2 = this.handleTzolkinCoefficientChange2.bind(this);
        this.handleTzolkinNameChange2 = this.handleTzolkinNameChange2.bind(this);
        this.handleHaabCoefficientChange2 = this.handleHaabCoefficientChange2.bind(this);
        this.handleHaabNameChange2 = this.handleHaabNameChange2.bind(this);
    }

    // Handle changes on the first set of date part dropdowns
    handleTzolkinCoefficientChange (event) {
        this.setState({
            tzolkinCoefficient: event.target.value,
        });
    }

    handleTzolkinNameChange (event) {
        this.setState({
            tzolkinName: event.target.value,
            haabCoefficent: POSSIBLE_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    handleHaabCoefficientChange (event) {
        this.setState({
            haabCoefficient: event.target.value,
        });
    }

    handleHaabNameChange (event) {
        this.setState({
            haabName: event.target.value,
        });
    }

    // Now handle the changes to the 2nd set of date parts
    handleTzolkinCoefficientChange2 (event) {
        this.setState({
            tzolkinCoefficient2: event.target.value,
        });
    }

    handleTzolkinNameChange2 (event) {
        this.setState({
            tzolkinName2: event.target.value,
            haabCoefficent2: POSSIBLE_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    handleHaabCoefficientChange2 (event) {
        this.setState({
            haabCoefficient2: event.target.value,
        });
    }

    handleHaabNameChange2 (event) {
        this.setState({
            haabName2: event.target.value,
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
                                    {/* These coefficients have no dependency on the others: no restrictions */}
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
                                    {/* We could restrict these based on Haab coefficient, but it would lead to a loop: no restrictions */}
                                    {TZOLKIN_NAMES.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="HD1">1st Haab Day</InputLabel>
                                <Select 
                                    value={this.state.haabCoefficient} 
                                    onChange={this.handleHaabCoefficientChange}
                                    labelid="HD1"
                                    label="1st Haab Day"
                                >
                                    {/* Here we need to restrict Haab coefficients depending on Tzolkin day name, if one is chosen
                                        We also need to restrict Haab coefficients depending on Haab month name, i.e. Uayeb */}
                                    {getHaabCoeffList(this.state.tzolkinName, this.state.haabName).map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="HM1">1st Haab Month</InputLabel>
                                <Select 
                                    value={this.state.haabName} 
                                    onChange={this.handleHaabNameChange}
                                    labelid="HM1"
                                    label="1st Haab Month"
                                >
                                    {/* Here we need to restrict Haab month name based on coefficient
                                        If the coefficient is known and >4, then Uayeb is not an option */}
                                    {ALLOWED_HAAB_NAMES[this.state.haabCoefficient].Coefficients.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>





                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TN2">2nd Tzolk'in Number</InputLabel>
                                <Select 
                                    value={this.state.tzolkinCoefficient2} 
                                    onChange={this.handleTzolkinCoefficientChange2}
                                    labelid="TN2"
                                    label="2nd Tzolk'in Number"
                                >
                                    {/* These coefficients have no dependency on the others: no restrictions */}
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
                                    {/* We could restrict these based on Haab coefficient, but it would lead to a loop: no restrictions */}
                                    {TZOLKIN_NAMES.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="HD2">2nd Haab Day</InputLabel>
                                <Select 
                                    value={this.state.haabCoefficient2} 
                                    onChange={this.handleHaabCoefficientChange2}
                                    labelid="HD2"
                                    label="2nd Haab Day"
                                >
                                    {/* Here we need to restrict Haab coefficients depending on Tzolkin day name, if one is chosen
                                        We also need to restrict Haab coefficients depending on Haab month name, i.e. Uayeb */}
                                    {getHaabCoeffList(this.state.tzolkinName2, this.state.haabName2).map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="HM2">2nd Haab Month</InputLabel>
                                <Select 
                                    value={this.state.haabName2} 
                                    onChange={this.handleHaabNameChange2}
                                    labelid="HM2"
                                    label="2nd Haab Month"
                                >
                                    {/* Here we need to restrict Haab month name based on coefficient
                                        If the coefficient is known and >4, then Uayeb is not an option */}
                                    {ALLOWED_HAAB_NAMES[this.state.haabCoefficient2].Coefficients.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>




                </Grid>

                <Grid item md={3}>
                    
                    Distance from 
                    {' ' + crString({
                        tzolkinName: this.state.tzolkinName,
                        tzolkinCoefficient: this.state.tzolkinCoefficient - 1,
                        haabName: this.state.haabName,
                        haabCoefficient: getHaabCoeffList(this.state.tzolkinName, this.state.haabName)[this.state.haabCoefficient],
                    }, this.props.names) + ' '} 
                    to 
                    {' ' + crString({
                        tzolkinName: this.state.tzolkinName2,
                        tzolkinCoefficient: this.state.tzolkinCoefficient2 - 1,
                        haabName: this.state.haabName2,
                        haabCoefficient: getHaabCoeffList(this.state.tzolkinName2, this.state.haabName2)[this.state.haabCoefficient2],
                    }, this.props.names) + ' '} 
                    is {' ' + Number(getCRPos(getTzolkPos(this.state.tzolkinCoefficient2 - 1, this.state.tzolkinName2), getHaabPos(getHaabCoeffList(this.state.tzolkinName2, this.state.haabName2)[this.state.haabCoefficient2], this.state.haabName2))) 
                    - Number(getCRPos(getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName), getHaabPos(getHaabCoeffList(this.state.tzolkinName, this.state.haabName)[this.state.haabCoefficient], this.state.haabName))) + ' '} days

                </Grid>
            </Grid>
        );
    }
}

CRDiff.propTypes = {
    names: PropTypes.string.isRequired,
}

export default CRDiff;