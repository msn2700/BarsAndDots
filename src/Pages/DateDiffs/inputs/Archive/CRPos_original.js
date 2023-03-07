import { Grid, Select, MenuItem, InputLabel, withStyles } from '@material-ui/core';
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

class CRPos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tzolkinCoefficient: 1,  // Literal value of 1
            tzolkinName: 0,         // Index value of 0 leads to Imix
            haabCoefficient: 4,     // Literal value of 4
            haabName: 0,            // Index value of 0 leads to Pop
        };
        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);
    }

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

    render() {
        const { classes } = this.props;
        return(
            <Grid container>
                <Grid item md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <InputLabel>Tzolk'in Number </InputLabel>
                            <Select value={this.state.tzolkinCoefficient} onChange={this.handleTzolkinCoefficientChange}>
                                {TZOLKIN_COEFFICIENTS.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>Tzolk'in Name </InputLabel>
                            <Select value={this.state.tzolkinName} onChange={this.handleTzolkinNameChange}>
                                {TZOLKIN_NAMES.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>Haab Day </InputLabel>
                            <Select value={this.state.haabCoefficient} onChange={this.handleHaabCoefficientChange}>
                                {POSSIBLE_HAAB_COEFFICIENTS[this.state.tzolkinName].Coefficients.map(number => {
                                    return (<MenuItem value={number} key={number}>{number}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputLabel>Haab Month </InputLabel>
                            <Select value={this.state.haabName} onChange={this.handleHaabNameChange}>
                                {HAAB_NAMES.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>) 
                                })}
                            </Select>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item xs={12} md={3}>
                    {crString({
                        tzolkinName: this.state.tzolkinName,
                        tzolkinCoefficient: this.state.tzolkinCoefficient - 1,
                        haabName: this.state.haabName,
                        haabCoefficient: parseInt(this.state.haabCoefficient,10)
                    }, this.props.names)} is Day {getCRPos(getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName), 
                                         getHaabPos(parseInt(this.state.haabCoefficient,10), this.state.haabName))} of the 18,980 calendar round cycle
                </Grid>
                
            </Grid>
        );
    }
}

CRPos.propTypes = {
    names: PropTypes.string.isRequired,
}

export default withStyles(styles)(CRPos);