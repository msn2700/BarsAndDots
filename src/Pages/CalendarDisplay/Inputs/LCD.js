// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

class LCD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lcd: getLCDFromJDN( changeToJDN( new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), this.props.correlation),
        }
        this.handleLCDChange = this.handleLCDChange.bind(this);
    }

    handleLCDChange (event) {
        if (event.target.value >= -27792000 && event.target.value <= 28799999){
            this.setState({
                lcd: event.target.value
            });
            this.props.calcLCD(event.target.value);
        }
        
    }

    render() {

        return(
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} sx={textboxStyle}>
                    <TextField
                        id="lcd"
                        label="Enter Long Count Decimal"
                        value={this.state.lcd}
                        type="number"
                        onChange={this.handleLCDChange}
                        helperText="Use -27,792,000 to 28,799,999"
                        InputProps={{ inputProps: { min:-27792000, max: 28799999 } }}
                    />
                </Grid>
                {/*<Grid item md={9}></Grid>*/}
            </Grid>
        );
    }
}

LCD.propTypes = {
    correlation: PropTypes.number.isRequired,
    calcLCD: PropTypes.func.isRequired,
};

export default LCD;
