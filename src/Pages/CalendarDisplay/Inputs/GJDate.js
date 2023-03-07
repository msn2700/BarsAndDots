// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

class GJDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'g',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
        }
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    handleTypeChange (event) {
        this.setState({ type: event.target.value },
            this.props.calcLCD(getLCDFromJDN(changeToJDN(
                this.state.day, 
                this.state.month, 
                this.state.year, 
                event.target.value), this.props.correlation)
        ));
    }

    handleYearChange (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            this.setState({ year: event.target.value },
                this.props.calcLCD(getLCDFromJDN(changeToJDN(
                    this.state.day, 
                    this.state.month, 
                    event.target.value, 
                    this.state.type), this.props.correlation)
            ));
        }
    }

    handleMonthChange (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            this.setState({ month: event.target.value },
                this.props.calcLCD(getLCDFromJDN(changeToJDN(
                    this.state.day,
                    event.target.value,
                    this.state.year,
                    this.state.type), this.props.correlation)
            ));
        }
    }

    handleDayChange (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            this.setState({ day: event.target.value },
                this.props.calcLCD(getLCDFromJDN(changeToJDN(
                    event.target.value,
                    this.state.month,
                    this.state.year,
                    this.state.type), this.props.correlation)
            ));
        }
    }

    render() {

        return(
            <Grid container justifyContent="center">

                <Grid item xs={12} md={12}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="GJ">Select Calendar</InputLabel>
                    <Select
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                        labelid="GJ"
                        label="Select Calendar"
                    >
                        <MenuItem value="g">Gregorian</MenuItem>
                        <MenuItem value="j">Julian</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={4} md={12} sx={textboxStyle}>
                    <TextField
                        id="year"
                        label="Year"
                        value={this.state.year}
                        type="number"
                        onChange={this.handleYearChange}
                        helperText="-4800 to 4800"
                        InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                    />
                </Grid>
                <Grid item xs={4} md={12} sx={textboxStyle}>
                    <TextField
                        id="month"
                        label="Month"
                        value={this.state.month}
                        type="number"
                        onChange={this.handleMonthChange}
                        helperText="1 to 12"
                        InputProps={{ inputProps: { min: 1, max: 12 } }}
                    />
                </Grid>
                <Grid item xs={4} md={12} sx={textboxStyle}>
                    <TextField
                        id="day"
                        label="Day"
                        value={this.state.day}
                        type="number"
                        onChange={this.handleDayChange}
                        helperText="1 to 31"
                        InputProps={{ inputProps: { min: 1, max: 31 } }}
                    />
                </Grid>
            </Grid>
        );
    }
}

GJDate.propTypes = {
    correlation: PropTypes.number.isRequired,
    calcLCD: PropTypes.func.isRequired,
};

export default GJDate;