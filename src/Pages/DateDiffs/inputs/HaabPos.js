// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { getHaabPos } from '../../../Functions/CalendarRound';

// Import data arrays that we'll need
import { HAAB_NAMES, ALLOWED_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

class HaabPos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            haabCoefficient: "0",
            haabName: 0,
        };
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);
    }

    handleHaabCoefficientChange (event) {
        this.setState({
            haabCoefficient: event.target.value,
        });
    }

    handleHaabNameChange (event) {
        this.setState({
            haabName: event.target.value,
            haabCoefficent: ALLOWED_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    render() {

        return(
            <Grid container>

                <Grid item xs={12} md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="HD">Haab Day</InputLabel>
                                <Select 
                                    value={this.state.haabCoefficient} 
                                    onChange={this.handleHaabCoefficientChange}
                                    labelid="HD"
                                    label="Haab Day"
                                >
                                    {ALLOWED_HAAB_COEFFICIENTS[this.state.haabName].Coefficients.map(number => {
                                        return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid> 
                        <Grid item xs={12} md={3}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="HM">Haab Month</InputLabel>
                                <Select 
                                    value={this.state.haabName} 
                                    onChange={this.handleHaabNameChange}
                                    labelid="HM"
                                    label="Haab Month"
                                >
                                    {HAAB_NAMES.map((name, index) => {
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
                    {parseInt(this.state.haabCoefficient, 10) + ' ' + HAAB_NAMES[this.state.haabName][this.props.names] + ' '} 
                        is Day {getHaabPos(parseInt(this.state.haabCoefficient,10), this.state.haabName)} of the 365 Haab Day Cycle
                </Grid>

            </Grid>
        );
    }
}

HaabPos.propTypes = {
    names: PropTypes.string.isRequired,
}

export default HaabPos;