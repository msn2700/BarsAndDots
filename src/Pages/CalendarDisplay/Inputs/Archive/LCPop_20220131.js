
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { getLCDFromLC, getLCValues } from '../../../Functions/General';
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';
import { lcdToCRInfo } from '../../../Functions/CalendarRound';

const React = require('react');
const PropTypes = require('prop-types');

const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    }
});

class LCPop extends React.Component {

    constructor(props) {
        super(props);
        let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), 
                                                        new Date().getMonth() + 1, 
                                                        new Date().getFullYear(), 
                                                        'g'), this.props.correlation));
        this.state = {
            baktuns: lc.baktuns,
            katuns: lc.katuns,
            tuns: lc.tuns,
            winals: lc.winals,
            kins: lc.kins,
        };
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);
    }

    handleBaktunChange (event) {
        if (event.target.value >= -260 && event.target.value <= 260) {
            this.setState({
                baktuns: event.target.value,
            }, this.props.calcLCD(this.findNearestPop(getLCDFromLC(
                event.target.value,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ))));
        }
    }

    handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                katuns: event.target.value,
            }, this.props.calcLCD(this.findNearestPop(getLCDFromLC(
                this.state.baktuns,
                event.target.value,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ))));
        }
    }

    handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                tuns: event.target.value,
            }, this.props.calcLCD(this.findNearestPop(getLCDFromLC(
                this.state.baktuns,
                this.state.katuns,
                event.target.value,
                this.state.winals,
                this.state.kins,
            ))));
        }
    }

    handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            this.setState({
                winals: event.target.value,
            }, this.props.calcLCD(this.findNearestPop(getLCDFromLC(
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                event.target.value,
                this.state.kins,
            ))));
        }
    }

    handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                kins: event.target.value,
            }, this.props.calcLCD(this.findNearestPop(getLCDFromLC(
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                event.target.value,
            ))));
        }
    }

    // This finds the nearest 1 Pop date from the one given
    findNearestPop(lcd) {
        for (let i = lcd, j = lcd; true; i--, j++) {
            if (lcdToCRInfo(i).haabName === 0 && lcdToCRInfo(i).haabCoefficient === 1) {
                return i;
            }
            if (lcdToCRInfo(j).haabName === 0 && lcdToCRInfo(j).haabCoefficient === 1) {
                return j;
            }
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container>
                <Grid item xs={2} md={2}>
                    <TextField
                        id="baktuns"
                        label="Baktuns"
                        value={this.state.baktuns}
                        type="number"
                        helperText="-260 to 260"
                        onChange={this.handleBaktunChange}
                        InputProps={{ inputProps: { min: -260, max: 260 } }}
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <TextField
                        id="katuns"
                        label="Katuns"
                        value={this.state.katuns}
                        type="number"
                        helperText="0-19"
                        onChange={this.handleKatunChange}
                        InputProps={{ inputProps: { min: 0, max: 19 } }}
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <TextField
                        id="tuns"
                        label="Tuns"
                        value={this.state.tuns}
                        type="number"
                        helperText="0-19"
                        onChange={this.handleTunChange}
                        InputProps={{ inputProps: { min: 0, max: 19 } }}
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <TextField
                        id="winals"
                        label="Uinals"
                        value={this.state.winals}
                        type="number"
                        helperText="0-17"
                        onChange={this.handleWinalChange}
                        InputProps={{ inputProps: { min: 0, max: 17 } }}
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <TextField
                        id="kins"
                        label="Kins"
                        value={this.state.kins}
                        type="number"
                        helperText="0-19"
                        onChange={this.handleKinChange}
                        InputProps={{ inputProps: { min: 0, max: 19 } }}
                    />
                </Grid>
            </Grid>
        );
    }
}

LCPop.propTypes = {
    classes: PropTypes.object.isRequired,
    calcLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default withStyles(styles)(LCPop);