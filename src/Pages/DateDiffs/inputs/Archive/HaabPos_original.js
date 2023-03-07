import { Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { getHaabPos } from '../../../Functions/CalendarRound';
import { HAAB_NAMES, ALLOWED_HAAB_COEFFICIENTS } from '../../../Data/CalendarRoundData';

const React = require('react');
const PropTypes = require('prop-types');
const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    }
});

class HaabPos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            haabCoefficient: "0",
            haabName: 0,
        };
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);
    }

    handleHaabCoefficientChange (event) {
        this.setState({
            haabCoefficient: event.target.value,
        });
    }

    handleHaabNameChange (event) {
        this.setState({
            haabName: event.target.value,
            haabCoefficent: ALLOWED_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container>

                <Grid item xs={12} md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <InputLabel>Haab Day </InputLabel>
                            <Select value={this.state.haabCoefficient} onChange={this.handleHaabCoefficientChange}>
                                {ALLOWED_HAAB_COEFFICIENTS[this.state.haabName].Coefficients.map(number => {
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
                        <Grid item xs={false} md={6}>
                        </Grid>
                    </Grid>
                
                </Grid>
                
                <Grid item md={3}>
                    {parseInt(this.state.haabCoefficient, 10) + ' ' + HAAB_NAMES[this.state.haabName][this.props.names] + ' '} 
                        is Day {getHaabPos(parseInt(this.state.haabCoefficient,10), this.state.haabName)} of the 365 Haab Day Cycle
                </Grid>

            </Grid>
        );
    }
}
HaabPos.propTypes = {
    names: PropTypes.string.isRequired,
}

export default withStyles(styles)(HaabPos);