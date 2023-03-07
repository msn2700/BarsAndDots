// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import all the functions we'll use
import { getTzolkPos, getHaabPos, getCRPos, crString, getHaabCoeffList } from '../../../Functions/CalendarRound';

// Import all the data arrays that we'll need
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS, ALLOWED_HAAB_NAMES, POSSIBLE_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

class CRPos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tzolkinCoefficient: 1,  // Literal value of 1
            tzolkinName: 0,         // Index value of 0 leads to Imix
            haabCoefficient: 0,     // Index value of 0 chooses the first item on the dropdown list
            haabName: 0,            // Index value of 0 leads to Pop
        };
        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);
    }

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

    render() {

        return(
            <Grid container>
                <Grid item md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="TNID">Tzolk'in Number </InputLabel>
                                <Select 
                                    value={this.state.tzolkinCoefficient} 
                                    onChange={this.handleTzolkinCoefficientChange}
                                    labelid="TNID"
                                    label="Tzolk'in Number"
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
                                <InputLabel id="TMID">Tzolk'in Name </InputLabel>
                                <Select 
                                    value={this.state.tzolkinName} 
                                    onChange={this.handleTzolkinNameChange}
                                    labelid="TMID"
                                    label="Tzolk'in Name"
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
                                <InputLabel id="HDID">Haab Day </InputLabel>
                                <Select 
                                    value={this.state.haabCoefficient} 
                                    onChange={this.handleHaabCoefficientChange}
                                    labelid="HDID"
                                    label="Haab Day"
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
                                <InputLabel id="HMID">Haab Month </InputLabel>
                                <Select 
                                    value={this.state.haabName} 
                                    onChange={this.handleHaabNameChange}
                                    labelid="HMID"
                                    label="Haab Month"
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

                </Grid>

                <Grid item xs={12} md={3}>
                    {crString({
                        tzolkinCoefficient: this.state.tzolkinCoefficient - 1,
                        tzolkinName: this.state.tzolkinName,
                        haabCoefficient: getHaabCoeffList(this.state.tzolkinName, this.state.haabName)[this.state.haabCoefficient],
                        haabName: this.state.haabName,
                    }, this.props.names)} is Day {getCRPos(getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName), 
                                         getHaabPos(getHaabCoeffList(this.state.tzolkinName, this.state.haabName)[this.state.haabCoefficient], this.state.haabName))} of the 18,980 calendar round cycle
                </Grid>
                
            </Grid>
        );
    }
}

CRPos.propTypes = {
    names: PropTypes.string.isRequired,
}

export default CRPos;