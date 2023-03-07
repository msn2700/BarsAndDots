// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, InputLabel, MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../Data/Components';

class GJInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            type: 'g',
            year: new Date().getFullYear() - 1,
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),

            type2: 'g',
            year2: new Date().getFullYear(),
            month2: new Date().getMonth() + 1,
            day2: new Date().getDate(),

        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);

        this.handleType2Change = this.handleType2Change.bind(this);
        this.handleYear2Change = this.handleYear2Change.bind(this);
        this.handleMonth2Change = this.handleMonth2Change.bind(this);
        this.handleDay2Change = this.handleDay2Change.bind(this);

    }

    // These handles changes to the first date
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

    
    // These handle changes to the end dates

    handleType2Change (event) {
        this.setState({ type2: event.target.value },
            this.props.calcEndLCD(getLCDFromJDN(changeToJDN(
                    this.state.day2, 
                    this.state.month2, 
                    this.state.year2, 
                    event.target.value), this.props.correlation)
        ));
    }

    handleYear2Change (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            this.setState({ year2: event.target.value },
                this.props.calcEndLCD(getLCDFromJDN(changeToJDN(
                    this.state.day2, 
                    this.state.month2, 
                    event.target.value, 
                    this.state.type2), this.props.correlation)
            ));
        }
    }

    handleMonth2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            this.setState({ month2: event.target.value },
                this.props.calcEndLCD(getLCDFromJDN(changeToJDN(
                    this.state.day2,
                    event.target.value,
                    this.state.year2,
                    this.state.type2), this.props.correlation)
            ));
        }
    }

    handleDay2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            this.setState({ day2: event.target.value },
                this.props.calcEndLCD(getLCDFromJDN(changeToJDN(
                    event.target.value,
                    this.state.month2,
                    this.state.year2,
                    this.state.type2), this.props.correlation)
            ));
        }
    }



    render() {

        return(

            <Grid container justifyContent="center">
                
                <Grid item xs={12} md={2} sx={{ marginTop: '25px', marginBottom: '10px' }}>
                    Start:
                </Grid>

                <Grid item xs={12} md={3}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="GJ1">Select Calendar</InputLabel>
                    <Select
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                        labelid="GJ1"
                        label="Select Calendar"
                    >
                        <MenuItem value="g">Gregorian</MenuItem>
                        <MenuItem value="j">Julian</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
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
                <Grid item xs={3} md={2} sx={textboxStyle}>
                    <TextField
                        id="month"
                        label="Month"
                        value={this.state.month}
                        type="number"
                        onChange={this.handleMonthChange}
                        helperText="1-12"
                        InputProps={{ inputProps: { min: 1, max: 12 } }}
                    />
                </Grid>
                <Grid item xs={3} md={2} sx={textboxStyle}>
                    <TextField
                        id="day"
                        label="Day"
                        value={this.state.day}
                        type="number"
                        onChange={this.handleDayChange}
                        helperText="1-31"
                        InputProps={{ inputProps: { min: 1, max: 31 } }}
                    />
                </Grid>
                
                <Grid item xs={12} md={2} sx={{ marginTop: '25px', marginBottom: '10px' }}>End:</Grid>

                <Grid item xs={12} md={3}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="GJ2">Select Calendar</InputLabel>
                    <Select
                        value={this.state.type2}
                        onChange={this.handleType2Change}
                        labelid="GJ2"
                        label="Select Calendar"
                    >
                        <MenuItem value="g">Gregorian</MenuItem>
                        <MenuItem value="j">Julian</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <TextField
                        id="year2"
                        label="Year"
                        value={this.state.year2}
                        type="number"
                        onChange={this.handleYear2Change}
                        helperText="-4800 to 4800"
                        InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                    />
                </Grid>
                <Grid item xs={3} md={2} sx={textboxStyle}>
                    <TextField
                        id="month2"
                        label="Month"
                        value={this.state.month2}
                        type="number"
                        onChange={this.handleMonth2Change}
                        helperText="1-12"
                        InputProps={{ inputProps: { min: 1, max: 12 } }}
                    />
                </Grid>
                <Grid item xs={3} md={2} sx={textboxStyle}>
                    <TextField
                        id="day2"
                        label="Day"
                        value={this.state.day2}
                        type="number"
                        onChange={this.handleDay2Change}
                        helperText="1-31"
                        InputProps={{ inputProps: { min: 1, max: 31 } }}
                    />
                </Grid>


            </Grid>
        );
    }
}

GJInput.propTypes = {
    calcLCD: PropTypes.func.isRequired,
    calcEndLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default GJInput;