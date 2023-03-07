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

class HaabDiff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            haabCoefficient: 0,
            haabName: 0,
            haabCoefficient2: 0,
            haabName2: 0,
        };
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);
        this.handleHaabCoefficientChange2 = this.handleHaabCoefficientChange2.bind(this);
        this.handleHaabNameChange2 = this.handleHaabNameChange2.bind(this);
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

    handleHaabCoefficientChange2 (event) {
        this.setState({
            haabCoefficient2: event.target.value,
        });
    }

    handleHaabNameChange2 (event) {
        this.setState({
            haabName2: event.target.value,
            haabCoefficent2: ALLOWED_HAAB_COEFFICIENTS[event.target.value].Coefficients[0],
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container>

                <Grid item md={9}>

                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <InputLabel>1st Haab Day </InputLabel>
                            <Select value={this.state.haabCoefficient} onChange={this.handleHaabCoefficientChange}>
                                {ALLOWED_HAAB_COEFFICIENTS[this.state.haabName].Coefficients.map(number => {
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
                        <Grid item xs={12} md={3}>
                            <InputLabel>2nd Haab Day </InputLabel>
                            <Select value={this.state.haabCoefficient2} onChange={this.handleHaabCoefficientChange2}>
                                {ALLOWED_HAAB_COEFFICIENTS[this.state.haabName2].Coefficients.map(number => {
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
                    Distance from {parseInt(this.state.haabCoefficient,10) + ' ' + HAAB_NAMES[this.state.haabName][this.props.names] + ' '} 
                        to {parseInt(this.state.haabCoefficient2,10) + ' ' + HAAB_NAMES[this.state.haabName2][this.props.names] + ' '}
                        is {getHaabPos(parseInt(this.state.haabCoefficient2,10), this.state.haabName2) - 
                            getHaabPos(parseInt(this.state.haabCoefficient,10), this.state.haabName)} days
                </Grid>

            </Grid>
        );
    }
}
HaabDiff.propTypes = {
    names: PropTypes.string.isRequired,
}

export default withStyles(styles)(HaabDiff);