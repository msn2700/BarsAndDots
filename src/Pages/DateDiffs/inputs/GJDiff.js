// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, MenuItem, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

class GJDiff extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          
            type: 'g',
            year: new Date().getFullYear(),
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


    handleTypeChange (event) {
        this.setState({ type: event.target.value });
    }

    handleYearChange (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            this.setState({ year: event.target.value });
        }
    }

    handleMonthChange (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            this.setState({ month: event.target.value });
        }
    }

    handleDayChange (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            this.setState({ day: event.target.value });
        }
    }

    




    handleType2Change (event) {
        this.setState({ type2: event.target.value });
    }

    handleYear2Change (event) {
        if (event.target.value >= -4800 && event.target.value <= 4800) {
            this.setState({ year2: event.target.value });
        }
    }

    handleMonth2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 12) {
            this.setState({ month2: event.target.value });
        }
    }

    handleDay2Change (event) {
        if (event.target.value >= 1 && event.target.value <= 31) {
            this.setState({ day2: event.target.value });
        }
    }



    render() {

        return(
            <Grid container>

                <Grid item md={9}>

                    <Grid container >
                        <Grid item xs={12} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="GJ1">Select Calendar 1</InputLabel>
                                <Select
                                    value={this.state.type}
                                    onChange={this.handleTypeChange}
                                    labelId="GJ1"
                                    label="Select Calendar 1"
                                >
                                    <MenuItem value="g">Gregorian</MenuItem>
                                    <MenuItem value="j">Julian</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <TextField
                                id="year"
                                label="Year1"
                                value={this.state.year}
                                type="number"
                                onChange={this.handleYearChange}
                                helperText="-4800 to 4800"
                                InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                            />
                        </Grid>
                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <TextField
                                id="month"
                                label="Month1"
                                value={this.state.month}
                                type="number"
                                onChange={this.handleMonthChange}
                                helperText="1-12"
                                InputProps={{ inputProps: { min: 1, max: 12 } }}
                            />
                        </Grid>
                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <TextField
                                id="day"
                                label="Day1"
                                value={this.state.day}
                                type="number"
                                onChange={this.handleDayChange}
                                helperText="1-31"
                                InputProps={{ inputProps: { min: 1, max: 31 } }}
                            />
                        </Grid>
                    </Grid>
                    
                    
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="GJ2">Select Calendar 2</InputLabel>
                                <Select
                                    value={this.state.type2}
                                    onChange={this.handleType2Change}
                                    labelId="GJ2"
                                    label="Select Calendar 2"
                                >
                                    <MenuItem value="g">Gregorian</MenuItem>
                                    <MenuItem value="j">Julian</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <TextField
                                id="year2"
                                label="Year2"
                                value={this.state.year2}
                                type="number"
                                onChange={this.handleYear2Change}
                                helperText="-4800 to 4800"
                                InputProps={{ inputProps: { min: -4800, max: 4800 } }}
                            />
                        </Grid>
                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <TextField
                                id="month2"
                                label="Month2"
                                value={this.state.month2}
                                type="number"
                                onChange={this.handleMonth2Change}
                                helperText="1-12"
                                InputProps={{ inputProps: { min: 1, max: 12 } }}
                            />
                        </Grid>
                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <TextField
                                id="day2"
                                label="Day2"
                                value={this.state.day2}
                                type="number"
                                onChange={this.handleDay2Change}
                                helperText="1-31"
                                InputProps={{ inputProps: { min: 1, max: 31 } }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                    
                <Grid item md={3}>
                    The distance between the two dates is {Number(getLCDFromJDN(changeToJDN(this.state.day2,
                                                                        this.state.month2,
                                                                        this.state.year2,
                                                                        this.state.type2), this.props.correlation)) - 
                                                           Number(getLCDFromJDN(changeToJDN(this.state.day,
                                                                        this.state.month,
                                                                        this.state.year,
                                                                        this.state.type), this.props.correlation))} days
                </Grid>

            </Grid>
        );
    }
}

GJDiff.propTypes = {
    correlation: PropTypes.number.isRequired,
};

export default GJDiff;