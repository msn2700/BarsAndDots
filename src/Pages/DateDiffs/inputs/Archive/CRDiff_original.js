import { Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { getTzolkPos, getHaabPos, getCRPos, crString } from '../../../Functions/CalendarRound';
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS, HAAB_NAMES, POSSIBLE_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

const React = require('react');
const PropTypes = require('prop-types');
const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    }
});

class CRDiff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            tzolkinCoefficient: 1,
            tzolkinName: 0,
            haabCoefficient: 4,
            haabName: 0,

            tzolkinCoefficient2: 1,
            tzolkinName2: 0,
            haabCoefficient2: 4,
            haabName2: 0,
        };
        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);
        this.handleTzolkinCoefficientChange2 = this.handleTzolkinCoefficientChange2.bind(this);
        this.handleTzolkinNameChange2 = this.handleTzolkinNameChange2.bind(this);
        this.handleHaabCoefficientChange2 = this.handleHaabCoefficientChange2.bind(this);
        this.handleHaabNameChange2 = this.handleHaabNameChange2.bind(this);
    }

    // Handle changes on the first set of date part dropdowns
    handleTzolkinCoefficientChange (event) {
        this.setState({
            tzolkinCoefficient: event.target.value,
        });
    }

    handleTzolkinNameChange (event) {
        this.setState({
            tzolkinName: event.target.value,
            haabCoefficent: POSSIBLE_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    handleHaabCoefficientChange (event) {
        this.setState({
            haabCoefficient: event.target.value,
        });
    }

    handleHaabNameChange (event) {
        this.setState({
            haabName: event.target.value,
        });
    }

    // Now handle the changes to the 2nd set of date parts
    handleTzolkinCoefficientChange2 (event) {
        this.setState({
            tzolkinCoefficient2: event.target.value,
        });
    }

    handleTzolkinNameChange2 (event) {
        this.setState({
            tzolkinName2: event.target.value,
            haabCoefficent2: POSSIBLE_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    handleHaabCoefficientChange2 (event) {
        this.setState({
            haabCoefficient2: event.target.value,
        });
    }

    handleHaabNameChange2 (event) {
        this.setState({
            haabName2: event.target.value,
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container>
                <Grid item md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <InputLabel>1st Tzolk'in Number </InputLabel>
                            <Select value={this.state.tzolkinCoefficient} onChange={this.handleTzolkinCoefficientChange}>
                                {TZOLKIN_COEFFICIENTS.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>1st Tzolk'in Name </InputLabel>
                            <Select value={this.state.tzolkinName} onChange={this.handleTzolkinNameChange}>
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>1st Haab Day </InputLabel>
                            <Select value={this.state.haabCoefficient} onChange={this.handleHaabCoefficientChange}>
                                {POSSIBLE_HAAB_COEFFICIENTS[this.state.tzolkinName].Coefficients.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>1st Haab Month </InputLabel>
                            <Select value={this.state.haabName} onChange={this.handleHaabNameChange}>
                                {HAAB_NAMES.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>) 
                                })}
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <InputLabel>2nd Tzolk'in Number </InputLabel>
                            <Select value={this.state.tzolkinCoefficient2} onChange={this.handleTzolkinCoefficientChange2}>
                                {TZOLKIN_COEFFICIENTS.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>2nd Tzolk'in Name </InputLabel>
                            <Select value={this.state.tzolkinName2} onChange={this.handleTzolkinNameChange2}>
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>2nd Haab Day </InputLabel>
                            <Select value={this.state.haabCoefficient2} onChange={this.handleHaabCoefficientChange2}>
                                {POSSIBLE_HAAB_COEFFICIENTS[this.state.tzolkinName2].Coefficients.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>2nd Haab Month </InputLabel>
                            <Select value={this.state.haabName2} onChange={this.handleHaabNameChange2}>
                                {HAAB_NAMES.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>) 
                                })}
                            </Select>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item md={3}>
                    
                    Distance from {crString({
                        tzolkinName: this.state.tzolkinName,
                        tzolkinCoefficient: this.state.tzolkinCoefficient - 1,
                        haabName: this.state.haabName,
                        haabCoefficient: parseInt(this.state.haabCoefficient,10),
                    }, this.props.names)} to {crString({
                        tzolkinName: this.state.tzolkinName2,
                        tzolkinCoefficient: this.state.tzolkinCoefficient2 - 1,
                        haabName: this.state.haabName2,
                        haabCoefficient: parseInt(this.state.haabCoefficient2,10),
                    }, this.props.names)} is {Number(getCRPos(getTzolkPos(this.state.tzolkinCoefficient2 - 1, this.state.tzolkinName2), 
                    getHaabPos(parseInt(this.state.haabCoefficient2,10), this.state.haabName2))) - Number(getCRPos(getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName), 
                        getHaabPos(parseInt(this.state.haabCoefficient,10), this.state.haabName)))} days

                </Grid>
            </Grid>
        );
    }
}
CRDiff.propTypes = {
    names: PropTypes.string.isRequired,
}

export default withStyles(styles)(CRDiff);