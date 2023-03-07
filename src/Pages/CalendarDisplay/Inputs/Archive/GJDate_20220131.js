
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';
import FormHelperText from '@material-ui/core/FormHelperText';

const React = require('react');
const PropTypes = require('prop-types');
const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    }
});

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
        const { classes } = this.props;
        return(
            <Grid container>
                <Grid item xs={4} md={4}>
                <FormControl>
                    <InputLabel>Gregorian/Julian</InputLabel>
                    <Select
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                    >
                        <MenuItem value="g">Gregorian</MenuItem>
                        <MenuItem value="j">Julian</MenuItem>
                    </Select>
                    <FormHelperText>Calendar Type</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={4} md={3}>
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
                <Grid item xs={2} md={2}>
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
                <Grid item xs={2} md={2}>
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
    classes: PropTypes.object.isRequired,
    correlation: PropTypes.number.isRequired,
    calcLCD: PropTypes.func.isRequired,
};

export default withStyles(styles)(GJDate);