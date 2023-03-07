// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { getLCDFromLC, getLCValues } from '../../Functions/General';
import { changeToJDN, getLCDFromJDN } from '../../Functions/JulianDayNumber';

// Import the dropdown data that we'll need for selection
import { PIKTUN_VALUES, ALLOWED_BAKTUNS, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../Data/Components';

class LongCountInput extends React.Component {

    constructor(props) {
        super(props);
        let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), 
                                                        new Date().getMonth() + 1, 
                                                        new Date().getFullYear(), 
                                                        'g'), this.props.correlation));
        let endLC = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), 
                                                        new Date().getMonth() + 1, 
                                                        new Date().getFullYear(), 
                                                        'g'), this.props.correlation) + 100);
        this.state = {

            piktuns: 10,
            baktuns: lc.baktuns,
            katuns: lc.katuns,
            tuns: lc.tuns,
            winals: lc.winals,
            kins: lc.kins,

            endPiktuns: 10,
            endBaktuns: endLC.baktuns,
            endKatuns: endLC.katuns,
            endTuns: endLC.tuns,
            endWinals: endLC.winals,
            endKins: endLC.kins,

        };

        this.handlePiktunChange = this.handlePiktunChange.bind(this);
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

        this.handleEndPiktunChange = this.handleEndPiktunChange.bind(this);
        this.handleEndBaktunChange = this.handleEndBaktunChange.bind(this);
        this.handleEndKatunChange = this.handleEndKatunChange.bind(this);
        this.handleEndTunChange = this.handleEndTunChange.bind(this);
        this.handleEndWinalChange = this.handleEndWinalChange.bind(this);
        this.handleEndKinChange = this.handleEndKinChange.bind(this)
    }

    // Handle the start value changes

    handlePiktunChange (event) {
        
        // First, handle the usual change of the piktun state for all but the short piktun...
        if (event.target.value != 9) {
            this.setState({
                piktuns: event.target.value,
            }, this.props.calcLCD(getLCDFromLC(
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
            }, this.props.calcLCD(getLCDFromLC(
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
        if (event.target.value >= -260 && event.target.value <= 260) {
            this.setState({
                baktuns: event.target.value,
            }, this.props.calcLCD(getLCDFromLC(
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
            }, this.props.calcLCD(getLCDFromLC(
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
            }, this.props.calcLCD(getLCDFromLC(
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
            }, this.props.calcLCD(getLCDFromLC(
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
            }, this.props.calcLCD(getLCDFromLC(
                PIKTUN_VALUES[this.state.piktuns],
                this.state.baktuns,
                this.state.katuns,
                this.state.tuns,
                this.state.winals,
                event.target.value,
            )));
        }
    }

    // Handle the end value changes

    handleEndPiktunChange (event) {
        // First, handle the usual change of the piktun state for all but the short piktun...
        if (event.target.value != 9) {
            this.setState({
                endPiktuns: event.target.value,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[event.target.value],
                this.state.endBaktuns,
                this.state.endKatuns,
                this.state.endTuns,
                this.state.endWinals,
                this.state.endKins,
            )));
        } 

        // Now handle the short piktun, and automatically choose baktun = 0 when piktun = 19 (piktun index = 9)
        else {
            this.setState({
                endPiktuns: event.target.value,
                endBaktuns: 0,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[event.target.value],
                0,
                this.state.endKatuns,
                this.state.endTuns,
                this.state.endWinals,
                this.state.endKins,
            )));
        }
    }

    handleEndBaktunChange (event) {
        if (event.target.value >= -260 && event.target.value <= 260) {
            this.setState({
                endBaktuns: event.target.value,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[this.state.endPiktuns],
                event.target.value,
                this.state.endKatuns,
                this.state.endTuns,
                this.state.endWinals,
                this.state.endKins,
            )));
        }
    }

    handleEndKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                endKatuns: event.target.value,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[this.state.endPiktuns],
                this.state.endBaktuns,
                event.target.value,
                this.state.endTuns,
                this.state.endWinals,
                this.state.endKins,
            )));
        }
    }

    handleEndTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                endTuns: event.target.value,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[this.state.endPiktuns],
                this.state.endBaktuns,
                this.state.endKatuns,
                event.target.value,
                this.state.endWinals,
                this.state.endKins,
            )));
        }
    }

    handleEndWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            this.setState({
                endWinals: event.target.value,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[this.state.endPiktuns],
                this.state.endBaktuns,
                this.state.endKatuns,
                this.state.endTuns,
                event.target.value,
                this.state.endKins,
            )));
        }
    }

    handleEndKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                endKins: event.target.value,
            }, this.props.calcEndLCD(getLCDFromLC(
                PIKTUN_VALUES[this.state.endPiktuns],
                this.state.endBaktuns,
                this.state.endKatuns,
                this.state.endTuns,
                this.state.endWinals,
                event.target.value,
            )));
        }
    }

    render() {

        return(

            <Grid container alignItems="center">
 
                {/* Enter the values for the start of the interval */}

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


                {/* Now enter the values for the end of the interval */}


                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="endPiktun">End Piktuns</InputLabel>
                        <Select 
                            value={this.state.endPiktuns} 
                            onChange={this.handleEndPiktunChange}
                            labelid="endPiktun"
                            label="End Piktuns"
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
                        <InputLabel id="endBaktun">End Baktuns</InputLabel>
                        <Select 
                            value={this.state.endBaktuns} 
                            onChange={this.handleEndBaktunChange}
                            labelid="endBaktun"
                            label="End Baktuns"
                        >
                            {/* Here we need to restrict baktuns to 0-12 in case piktuns = 19, otherwise it can be 0-19 */}
                            {ALLOWED_BAKTUNS[this.state.endPiktuns].Coefficients.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="endKatun">End Katuns</InputLabel>
                        <Select 
                            value={this.state.endKatuns} 
                            onChange={this.handleEndKatunChange}
                            labelid="endKatun"
                            label="End Katuns"
                        >
                            {KATUNS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="endTun">End Tuns</InputLabel>
                        <Select 
                            value={this.state.endTuns} 
                            onChange={this.handleEndTunChange}
                            labelid="endTun"
                            label="End Tuns"
                        >
                            {TUNS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="endWinal">End Winals</InputLabel>
                        <Select 
                            value={this.state.endWinals} 
                            onChange={this.handleEndWinalChange}
                            labelid="endWinal"
                            label="End Winals"    
                        >
                            {WINALS_DROP.map((name, index) => {
                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2} sx={textboxStyle}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="endKin">End Kins</InputLabel>
                        <Select 
                            value={this.state.endKins} 
                            onChange={this.handleEndKinChange}
                            labelid="endKin"
                            label="End Kins"
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

LongCountInput.propTypes = {
    calcLCD: PropTypes.func.isRequired,
    calcEndLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default LongCountInput;