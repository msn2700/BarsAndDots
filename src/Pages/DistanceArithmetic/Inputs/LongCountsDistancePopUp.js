// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { getSimpleLCDFromLC } from '../../../Functions/General';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '5px',
}

class LongCountsDistance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            // Set the initial values that will show up in the dialog box when it pops up
            piktuns:  0,
            baktuns:  0, 
            katuns:   0, 
            tuns:     0, 
            winals:   0, 
            kins:     0, 
            tzolkin:  0,
            haab:     0,
            cr:       0, 
            cycle819: 0,
        };

        // Bind the changes to each user input
        this.handlePiktunChange = this.handlePiktunChange.bind(this);
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

        this.handleTzolkinChange = this.handleTzolkinChange.bind(this);
        this.handleHaabChange = this.handleHaabChange.bind(this);
        this.handleCRChange = this.handleCRChange.bind(this);
        this.handleCycle819Change = this.handleCycle819Change.bind(this);
    }


    // First we handle the six long count cycles 
    handlePiktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 5) {
            this.setState({
                piktuns: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                event.target.value,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleBaktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                baktuns: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                event.target.value,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                katuns: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                event.target.value,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                tuns: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                event.target.value,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            this.setState({
                winals: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                event.target.value,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                kins: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                event.target.value,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }



    // These four inputs need special handling since they aren't part of the LC calculation
    // They follow the template: getLCDfromLC() + event.target.value * (number of days)

    handleTzolkinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            this.setState({
                tzolkin: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + event.target.value * 260 + this.state.haab * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleHaabChange (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            this.setState({
                haab: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + event.target.value * 365 + this.state.cr * 18980 + this.state.cycle819 * 819));
        }
    }

    handleCRChange (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            this.setState({
                cr: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + event.target.value * 18980 + this.state.cycle819 * 819));
        }
    }

    handleCycle819Change (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            this.setState({
                cycle819: event.target.value,
            }, this.props.calculateLC(getSimpleLCDFromLC(
                this.state.piktuns,
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            ) + this.state.tzolkin * 260 + this.state.haab * 365 + this.state.cr * 18980 + event.target.value * 819 ));
        }
    }


    render() {
        return(

            <Grid container justifyContent="center">

                {/*<Grid item md={1}><br></br></Grid>*/}

                <Grid item md={2} sx={textboxStyle}>
                    <TextField
                        id="piktuns"
                        label="Piktuns"
                        value={this.state.piktuns}
                        type="number"
                        helperText="0-5"
                        onChange={this.handlePiktunChange}
                        InputProps={{ inputProps: { min: 0, max: 5 } }}
                    />
                </Grid>
                <Grid item md={2} sx={textboxStyle}>
                    <TextField
                        id="baktuns"
                        label="Baktuns"
                        value={this.state.baktuns}
                        type="number"
                        helperText="0-19"
                        onChange={this.handleBaktunChange}
                        InputProps={{ inputProps: { min: 0, max: 19 } }}
                    />
                </Grid>
                <Grid item md={2} sx={textboxStyle}>
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
                <Grid item md={2} sx={textboxStyle}>
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
                <Grid item md={2} sx={textboxStyle}>
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
                <Grid item md={2} sx={textboxStyle}>
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

                {/*<Grid item md={1}><br></br></Grid>*/}

                <Grid item md={2} sx={textboxStyle}>
                    <TextField
                        id="tzolkins"
                        label="Tzolkins"
                        value={this.state.tzolkin}
                        type="number"
                        helperText="0-10"
                        onChange={this.handleTzolkinChange}
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                    />
                </Grid>
                <Grid item md={2} sx={textboxStyle}>
                    <TextField
                        id="haabs"
                        label="Haabs"
                        value={this.state.haab}
                        type="number"
                        helperText="0-10"
                        onChange={this.handleHaabChange}
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                    />
                </Grid>
                <Grid item md={2} sx={textboxStyle}>
                    <TextField
                        id="crs"
                        label="CRs"
                        value={this.state.cr}
                        type="number"
                        helperText="0-10"
                        onChange={this.handleCRChange}
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                    />
                </Grid>
                <Grid item md={2} sx={textboxStyle}>
                    <TextField
                        id="cycle819"
                        label="819s"
                        value={this.state.cycle819}
                        type="number"
                        helperText="0-10"
                        onChange={this.handleCycle819Change}
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                    />
                </Grid>

            </Grid>
        );
    }
}

LongCountsDistance.propTypes = {
    calculateLC: PropTypes.func.isRequired,
};

export default LongCountsDistance;