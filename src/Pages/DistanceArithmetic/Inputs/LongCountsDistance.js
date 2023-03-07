// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { getLCDFromLC } from '../../../Functions/General';

// Import the dropdown data that we'll need for selection
import { PIKTUN_VALUES, ALLOWED_BAKTUNS, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../../Data/CalendarRoundData';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '5px',
}

class LongCountsDistance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // Set the initial values for page load
            piktuns: 10,
            baktuns: this.props.lc.baktuns,
            katuns: this.props.lc.katuns,
            tuns: this.props.lc.tuns,
            winals: this.props.lc.winals,
            kins: this.props.lc.kins,

        };

        this.handlePiktunChange = this.handlePiktunChange.bind(this);
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

    }


    handlePiktunChange (event) {
        
        // First, handle the usual change of the piktun state for all but the short piktun...
        if (event.target.value != 9) {
            this.setState({
                piktuns: event.target.value,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[event.target.value],
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            )));
        } 
        
        // Now handle the short piktun, and automatically choose baktun = 0 when piktun = 19 (piktun index = 9)
        else {
            this.setState({
                piktuns: event.target.value,
                baktuns: 0,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[event.target.value],
                0,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            )));
        }
    }

    handleBaktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                baktuns: event.target.value,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[this.state.piktuns],
                event.target.value,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            )));
        }
    }

    handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                katuns: event.target.value,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[this.state.piktuns],
                this.state.baktuns,
                event.target.value,
                this.state.tuns,
                this.state.winals,
                this.state.kins,
            )));
        }
    }

    handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                tuns: event.target.value,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[this.state.piktuns],
                this.state.baktuns,
                this.state.katuns,
                event.target.value,
                this.state.winals,
                this.state.kins,
            )));
        }
    }

    handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            this.setState({
                winals: event.target.value,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[this.state.piktuns],
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                event.target.value,
                this.state.kins,
            )));
        }
    }

    handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                kins: event.target.value,
            }, this.props.calculateLC(getLCDFromLC(
                PIKTUN_VALUES[this.state.piktuns],
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                event.target.value,
            )));
        }
    }

    render() {

        return(
            <Grid container justifyContent="center">


                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="piktun">Piktuns</InputLabel>
                        <Select 
                            value={this.state.piktuns} 
                            onChange={this.handlePiktunChange}
                            labelid="piktun"
                            label="Piktuns"
                        >
                            {/* Here we need to restrict piktuns based on baktun selection */}
                            {PIKTUN_VALUES.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="baktun">Baktuns</InputLabel>
                        <Select 
                            value={this.state.baktuns} 
                            onChange={this.handleBaktunChange}
                            labelid="baktun"
                            label="Baktuns"
                        >
                            {/* Here we need to restrict baktuns to 0-12 in case piktuns = 19, otherwise it can be 0-19 */}
                            {ALLOWED_BAKTUNS[this.state.piktuns].Coefficients.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="katun">Katuns</InputLabel>
                        <Select 
                            value={this.state.katuns} 
                            onChange={this.handleKatunChange}
                            labelid="katun"
                            label="Katuns"
                        >
                            {KATUNS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="tun">Tuns</InputLabel>
                        <Select 
                            value={this.state.tuns} 
                            onChange={this.handleTunChange}
                            labelid="tun"
                            label="Tuns"
                        >
                            {TUNS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="winal">Winals</InputLabel>
                        <Select 
                            value={this.state.winals} 
                            onChange={this.handleWinalChange}
                            labelid="winal"
                            label="Winals"    
                        >
                            {WINALS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="kin">Kins</InputLabel>
                        <Select 
                            value={this.state.kins} 
                            onChange={this.handleKinChange}
                            labelid="kin"
                            label="Kins"
                        >
                            {KINS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>


            </Grid>
        );
    }
}

LongCountsDistance.propTypes = {
    calculateLC: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
    lc: PropTypes.object.isRequired,
};

export default LongCountsDistance;