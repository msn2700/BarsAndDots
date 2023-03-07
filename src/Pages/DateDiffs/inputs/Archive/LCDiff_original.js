
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { getLCDFromLC, getLCValues } from '../../../Functions/General';
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

const React = require('react');
const PropTypes = require('prop-types');
const styles = theme => ({
    control: {
        padding: theme.spacing(0.5),
        margin: theme.spacing(1),
    }
});

class LCDiff extends React.Component {

    constructor(props) {
        super(props);
        let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), 
                 this.props.correlation));
        this.state = {

            baktuns: lc.baktuns,
            katuns: lc.katuns,
            tuns: lc.tuns,
            winals: lc.winals,
            kins: lc.kins,

            baktuns2: lc.baktuns,
            katuns2: lc.katuns,
            tuns2: lc.tuns,
            winals2: lc.winals,
            kins2: lc.kins,
        };

        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

        this.handleBaktun2Change = this.handleBaktun2Change.bind(this);
        this.handleKatun2Change = this.handleKatun2Change.bind(this);
        this.handleTun2Change = this.handleTun2Change.bind(this);
        this.handleWinal2Change = this.handleWinal2Change.bind(this);
        this.handleKin2Change = this.handleKin2Change.bind(this);
    }

    handleBaktunChange (event) {
        if (event.target.value >= -260 && event.target.value <= 260) {
            this.setState({
                baktuns: event.target.value,
            });
        }
    }

    handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                katuns: event.target.value,
            });
        }
    }

    handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                tuns: event.target.value,
            });
        }
    }

    handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            this.setState({
                winals: event.target.value,
            });
        }
    }

    handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                kins: event.target.value,
            });
        }
    }

    handleBaktun2Change (event) {
        if (event.target.value >= -260 && event.target.value <= 260) {
            this.setState({
                baktuns2: event.target.value,
            });
        }
    }

    handleKatun2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                katuns2: event.target.value,
            });
        }
    }

    handleTun2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                tuns2: event.target.value,
            });
        }
    }

    handleWinal2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            this.setState({
                winals2: event.target.value,
            });
        }
    }

    handleKin2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                kins2: event.target.value,
            });
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container>
                <Grid item md={9}>

                    <Grid container>
                        <Grid item xs={3} md={2}>
                            <TextField
                                id="baktuns"
                                label="Baktuns1"
                                value={this.state.baktuns}
                                type="number"
                                helperText="-260 to 260"
                                onChange={this.handleBaktunChange}
                                InputProps={{ inputProps: { min: -260, max: 260 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="katuns"
                                label="Katuns1"
                                value={this.state.katuns}
                                type="number"
                                helperText="0-19"
                                onChange={this.handleKatunChange}
                                InputProps={{ inputProps: { min: 0, max: 19 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="tuns"
                                label="Tuns1"
                                value={this.state.tuns}
                                type="number"
                                helperText="0-19"
                                onChange={this.handleTunChange}
                                InputProps={{ inputProps: { min: 0, max: 19 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="winals"
                                label="Uinals1"
                                value={this.state.winals}
                                type="number"
                                helperText="0-17"
                                onChange={this.handleWinalChange}
                                InputProps={{ inputProps: { min: 0, max: 17 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="kins"
                                label="Kins1"
                                value={this.state.kins}
                                type="number"
                                helperText="0-19"
                                onChange={this.handleKinChange}
                                InputProps={{ inputProps: { min: 0, max: 19 } }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                
                    <Grid container>
                        <Grid item xs={3} md={2}>
                            <TextField
                                id="baktuns2"
                                label="Baktuns2"
                                value={this.state.baktuns2}
                                type="number"
                                helperText="-260 to 260"
                                onChange={this.handleBaktun2Change}
                                InputProps={{ inputProps: { min: -260, max: 260 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="katuns2"
                                label="Katuns2"
                                value={this.state.katuns2}
                                type="number"
                                helperText="0-19"
                                onChange={this.handleKatun2Change}
                                InputProps={{ inputProps: { min: 0, max: 19 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="tuns2"
                                label="Tuns2"
                                value={this.state.tuns2}
                                type="number"
                                helperText="0-19"
                                onChange={this.handleTun2Change}
                                InputProps={{ inputProps: { min: 0, max: 19 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="winals2"
                                label="Uinals2"
                                value={this.state.winals2}
                                type="number"
                                helperText="0-17"
                                onChange={this.handleWinal2Change}
                                InputProps={{ inputProps: { min: 0, max: 17 } }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="kins2"
                                label="Kins2"
                                value={this.state.kins2}
                                type="number"
                                helperText="0-19"
                                onChange={this.handleKin2Change}
                                InputProps={{ inputProps: { min: 0, max: 19 } }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
                
                <Grid item md={3}>
                    The distance between the two dates is {Number(getLCDFromLC(this.state.baktuns,
                                                                        this.state.katuns,
                                                                        this.state.tuns,
                                                                        this.state.winals,
                                                                        this.state.kins)) - 
                                                           Number(getLCDFromLC(this.state.baktuns2,
                                                                        this.state.katuns2,
                                                                        this.state.tuns2,
                                                                        this.state.winals2,
                                                                        this.state.kins2))} days
                </Grid>
            </Grid>
        );
    }
}

LCDiff.propTypes = {
    classes: PropTypes.object.isRequired,
    //props: PropTypes.number.isRequired,
};

export default withStyles(styles)(LCDiff);