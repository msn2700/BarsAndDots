import { Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { getTzolkPos } from '../../../Functions/CalendarRound';
import { TZOLKIN_NAMES, TZOLKIN_COEFFICIENTS } from '../../../Data/CalendarRoundData';

const React = require('react');
const PropTypes = require('prop-types');
const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    }
});

class TzolkPos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tzolkinCoefficient: 1,
            tzolkinName: 0,
        };
        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
    }

    handleTzolkinCoefficientChange (event) {
        this.setState({
            tzolkinCoefficient: event.target.value,
        });
    }

    handleTzolkinNameChange (event) {
        this.setState({
            tzolkinName: event.target.value,
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container>

                <Grid item xs={12} md={9}>

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
                        <Grid item xs={false} md={6}>
                        </Grid>
                    </Grid>

                </Grid>


                <Grid item md={3}>
                    {this.state.tzolkinCoefficient + ' ' + TZOLKIN_NAMES[this.state.tzolkinName][this.props.names] + ' '} 
                        is Day {getTzolkPos(this.state.tzolkinCoefficient - 1, this.state.tzolkinName)} of the 260 Tzolk'in Day Cycle
                </Grid>

            </Grid>
        );
    }
}
TzolkPos.propTypes = {
    names: PropTypes.string.isRequired,
}

export default withStyles(styles)(TzolkPos);