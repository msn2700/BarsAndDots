// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { getLCDFromJDN, changeToJDN} from '../../../Functions/JulianDayNumber';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

class JDN extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jdn: changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'),
        }
        this.changeJDN = this.changeJDN.bind(this);
    }

    changeJDN (event) {
        if (event.target.value >= -27207717 && event.target.value <= 29384282){
            this.setState({
                jdn: event.target.value,
            });
            this.props.calcLCD(getLCDFromJDN(event.target.value, this.props.correlation));
        }
    }

    render() {

        return(
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} sx={textboxStyle}>
                    <TextField
                        id="jdn"
                        label="Enter Julian Day Number"
                        value={this.state.jdn}
                        type="number"
                        onChange={this.changeJDN}
                        helperText="Use -27,207,717 to 29,384,282"
                        InputProps={{ inputProps: { min: -27207717, max: 29384282 } }}
                    />
                </Grid>
                {/*<Grid item md={9}></Grid>*/}
            </Grid>
        );
    }
}

JDN.propTypes = {
    calcLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default JDN;

