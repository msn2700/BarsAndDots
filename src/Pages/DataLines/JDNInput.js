// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { changeToJDN} from '../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../Data/Components';

class JDNInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jdn:    changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'),
            endJDN: changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g') + 50,
        }
        this.changeJDN = this.changeJDN.bind(this);
        this.changeEndJDN = this.changeEndJDN.bind(this);
    }

    changeJDN (event) {
        if (event.target.value >= -27207717  && event.target.value <= 29384282) {
            this.setState({
                jdn: event.target.value,
            }, this.props.calcJDN(event.target.value));
        }
    }

    changeEndJDN (event) {
        if (event.target.value >= -27207717  && event.target.value <= 29384282) {
            this.setState({
                endJDN: event.target.value,       
            }, this.props.calcEndJDN(event.target.value));
        }
    }

    render() {

        return(
            <Grid container justifyContent="center">
                <Grid item md={3} sx={textboxStyle}>
                    <TextField
                        id="jdn"
                        label="Starting JDN"
                        value={this.state.jdn}
                        type="number"
                        onChange={this.changeJDN}
                        helperText="Use -27,207,717 to 29,384,282"
                        InputProps={{ inputProps: { min: -27207717, max: 29384282 } }}
                    />
                </Grid>
                <Grid item md={3} sx={textboxStyle}>
                    <TextField
                        id="endJDN"
                        label="Ending JDN"
                        value={this.state.endJDN}
                        type="number"
                        onChange={this.changeEndJDN}
                        helperText="Use -27,207,717 to 29,384,282"
                        InputProps={{ inputProps: { min: -27207717, max: 29384282 } }}
                    />
                </Grid>
            </Grid>
        );
    }
}

JDNInput.propTypes = {
    calcJDN: PropTypes.func.isRequired,
    calcEndJDN: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default JDNInput;