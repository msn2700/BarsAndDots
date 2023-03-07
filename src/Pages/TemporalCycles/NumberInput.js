// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { getLCDFromJDN, changeToJDN } from '../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../Data/Components';

class NumberInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation),
        };
        this.changeNumber = this.changeNumber.bind(this);
    }

    changeNumber (event) {
        if (event.target.value >= 0 && event.target.value <= 9999999) {
            this.setState({
                number: event.target.value,
            }, this.props.sendNumber(event.target.value));
        }
    }

    render() {

        return(
            <Grid container justifyContent="center">
                <Grid item xs={1} md={1}></Grid>
                <Grid item xs={6} md={8} sx={textboxStyle}>
                    <TextField
                        id="number"
                        label="Number of Days"
                        value={this.state.number}
                        type="number"
                        helperText="Use 0-9999999"
                        onChange={this.changeNumber}
                    />
                </Grid>
                <Grid item xs={5} md={5}></Grid>
            </Grid>
        );
    }
}

NumberInput.propTypes = {

    sendNumber: PropTypes.func.isRequired,
    //number: PropTypes.number.isRequired,
};

export default NumberInput;