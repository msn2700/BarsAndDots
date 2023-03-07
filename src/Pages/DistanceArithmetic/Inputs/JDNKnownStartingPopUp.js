// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '5px',
}

class JDNKnownStarting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jdn: 0,
        };
        this.changeJDN = this.changeJDN.bind(this);
    }

    changeJDN (event) {
        if (event.target.value >= 0 && event.target.value <= 9999999) {
            this.setState({
                jdn: event.target.value,
            }, this.props.calculateJDN(event.target.value));
        }
    }

    render() {

        return(
            <Grid container>
                <Grid item md={12} sx={textboxStyle}>
                    <TextField
                        id="jdn"
                        label="Julian Day Number"
                        value={this.state.jdn}
                        type="number"
                        helperText="Use 0 - 9,999,999"
                        onChange={this.changeJDN}
                    />
                </Grid>
            </Grid>
        );
    }
}

JDNKnownStarting.propTypes = {
    calculateJDN: PropTypes.func.isRequired,
};

export default JDNKnownStarting;