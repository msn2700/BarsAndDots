// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import all the functions we'll use
import { getHaabCoeffList } from '../../Functions/CalendarRound';

// Import all the data arrays that we'll need
import { TZOLKIN_NAMES, HAAB_NAMES } from '../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../Data/Components';

class CRInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // Note that these are index-based not value-based
            tzolkinCoefficient: 0,  // Value of 1
            tzolkinName: 15,        // value of 16, which is Cib 
            haabCoefficient: 1,     // Index of 9 from the list of [4,9,14,19] allowed for Cib
            haabName: 3,            // Value of 4, which is Zotz
        };

        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);

    }

    // Note that how we send the Haab coefficient to this.props is slightly different for each handle() function below
    handleTzolkinCoefficientChange (event) {
        this.setState({
            tzolkinCoefficient: event.target.value,
        }, this.props.calcCR(event.target.value, this.state.tzolkinName, getHaabCoeffList(this.state.tzolkinName, this.state.haabName)[this.state.haabCoefficient], this.state.haabName));
    }

    handleTzolkinNameChange (event) {
        this.setState({
            tzolkinName: event.target.value,
        }, this.props.calcCR(this.state.tzolkinCoefficient, event.target.value, getHaabCoeffList(event.target.value, this.state.haabName)[this.state.haabCoefficient], this.state.haabName));
    }

    handleHaabCoefficientChange (event) {
        this.setState({
            haabCoefficient: event.target.value,
        }, this.props.calcCR(this.state.tzolkinCoefficient, this.state.tzolkinName, getHaabCoeffList(this.state.tzolkinName, this.state.haabName)[event.target.value], this.state.haabName));
    }

    handleHaabNameChange (event) {
        this.setState({
            haabName: event.target.value,
        }, this.props.calcCR(this.state.tzolkinCoefficient, this.state.tzolkinName, getHaabCoeffList(this.state.tzolkinName, event.target.value)[this.state.haabCoefficient], event.target.value));
    }

    render() {

        return(

            <Grid container>

                <Grid item md={2}></Grid>
                <Grid item xs={12} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="TN">Tzolk'in Day Number</InputLabel>
                        <Select 
                            value={this.state.tzolkinCoefficient} 
                            onChange={this.handleTzolkinCoefficientChange}
                            labelid="TN"
                            label="Tzolk'in Day Number"
                        >
                            {/* Only a single value is allowed here */}
                            <MenuItem value={0}>{1}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="TD">Tzolk'in Day Name</InputLabel>
                        <Select 
                            value={this.state.tzolkinName} 
                            onChange={this.handleTzolkinNameChange}
                            labelid="TD"
                            label="Tzolk'in Day Name"
                        >
                            {TZOLKIN_NAMES.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="HD">Haab Day</InputLabel>
                        <Select 
                            value={this.state.haabCoefficient} 
                            onChange={this.handleHaabCoefficientChange}
                            labelid="HD"
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
                <Grid item xs={12} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="HM">Haab Month</InputLabel>
                        <Select 
                            value={this.state.haabName} 
                            onChange={this.handleHaabNameChange}
                            labelid="HM"
                            label="Haab Month"
                        >
                            {/* No restrictions are placed here */}
                            {HAAB_NAMES.map((name, index) => {
                            return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>) 
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={2}></Grid>

            </Grid>
        );
    }
}

CRInput.propTypes = {
    calcCR: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
};

export default CRInput;