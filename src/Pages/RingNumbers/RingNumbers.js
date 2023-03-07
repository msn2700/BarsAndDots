// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import all the functions that we'll need
import { getLCDFromLC, getLCValues, buildLCString } from '../../Functions/General';
import { changeToJDN, getLCDFromJDN } from '../../Functions/JulianDayNumber';
import { crString, lcdToCRInfo } from '../../Functions/CalendarRound';

// Import the dropdown data that we'll need for selection
import { PIKTUN_VALUES, ALLOWED_BAKTUNS, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { paperStyle, textboxStyle } from '../../Data/Components';

// Create a specialized style for the input box
const paperStyleInput = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    marginRight: '5px', // Added
    marginLeft: '5px',  // Added
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
}


class RingNumbers extends React.Component {

    constructor(props) {
        super(props);
        let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), 
                    new Date().getMonth() + 1, 
                    new Date().getFullYear(), 
                    'g'), this.props.correlation));
        this.state = {

            piktuns: 10,
            baktuns: lc.baktuns,
            katuns: lc.katuns,
            tuns: lc.tuns,
            winals: lc.winals,
            kins: lc.kins,

            piktuns2: 10,
            baktuns2: 0,
            katuns2: 0,
            tuns2: 0,
            winals2: 0,
            kins2: 1,
        };

        this.handlePiktunChange = this.handlePiktunChange.bind(this);
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

        this.handlePiktun2Change = this.handlePiktun2Change.bind(this);
        this.handleBaktun2Change = this.handleBaktun2Change.bind(this);
        this.handleKatun2Change = this.handleKatun2Change.bind(this);
        this.handleTun2Change = this.handleTun2Change.bind(this);
        this.handleWinal2Change = this.handleWinal2Change.bind(this);
        this.handleKin2Change = this.handleKin2Change.bind(this);
    }


    // Enter the initial long count to which we will add the incremental "ring value"

    handlePiktunChange (event) {
        if (event.target.value != 9) {
            this.setState({
                piktuns: event.target.value,
            });
        } else {
            this.setState({
                piktuns: event.target.value,
                baktuns: 0,
            });
        }
    }

    handleBaktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
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


    // Enter this for the "ring number" or incremental amount to adjust the initial long count

    handlePiktun2Change (event) {
        if (event.target.value != 9) {
            this.setState({
                piktuns2: event.target.value,
            });
        } else {
            this.setState({
                piktuns2: event.target.value,
                baktuns2: 0,
            });
        }
    }

    handleBaktun2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
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

        // Define some quantities related to the Long Count Companion date
        let companionLCD = getLCDFromLC(PIKTUN_VALUES[this.state.piktuns], this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins);
        let companionLCstring = buildLCString(getLCValues(companionLCD));
        let companionCRstring = crString(lcdToCRInfo(companionLCD), this.props.names);

        // Define some quantities releated to the Ring Number
        let ringLCD = getLCDFromLC(PIKTUN_VALUES[this.state.piktuns2], this.state.baktuns2, this.state.katuns2, this.state.tuns2, this.state.winals2, this.state.kins2);
        let ringLCstring = buildLCString(getLCValues(ringLCD));

        // Define some quantities for combining the companion and ring numbers
        let resultLCD = companionLCD - ringLCD;
        let resultLCstring = buildLCString(getLCValues(resultLCD));
        let resultCRstring = crString(lcdToCRInfo(resultLCD), this.props.names);

        return(
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <h1>Ring Numbers</h1>
                        <p>This subtracts a ring number (distance value) from a long count date to find the new date<br></br>
                        Enter a starting Long Count and a ring number (in LC form) to find the result<br></br>
                        This is similar to the Distance Arithmetic page, see that page for more options</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={ paperStyleInput }>
                        <Grid container>
                            <Grid item xs={12}><p>Long Count Companion Number</p></Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={ paperStyleInput }>
                        <Grid container>
                            <Grid item xs={12}><p>Associated Ring Number</p></Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center">


                                    <Grid item xs={4} md={2} sx={textboxStyle}>
                                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                                            <InputLabel id="piktun2">Piktuns</InputLabel>
                                            <Select 
                                                value={this.state.piktuns2} 
                                                onChange={this.handlePiktun2Change}
                                                labelid="piktun2"
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
                                            <InputLabel id="baktun2">Baktuns</InputLabel>
                                            <Select 
                                                value={this.state.baktuns2} 
                                                onChange={this.handleBaktun2Change}
                                                labelid="baktun2"
                                                label="Baktuns"
                                            >
                                                {/* Here we need to restrict baktuns to 0-12 in case piktuns = 19, otherwise it can be 0-19 */}
                                                {ALLOWED_BAKTUNS[this.state.piktuns2].Coefficients.map((name, index) => {
                                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                                })}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} md={2} sx={textboxStyle}>
                                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                                            <InputLabel id="katun2">Katuns</InputLabel>
                                            <Select 
                                                value={this.state.katuns2} 
                                                onChange={this.handleKatun2Change}
                                                labelid="katun2"
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
                                            <InputLabel id="tun2">Tuns</InputLabel>
                                            <Select 
                                                value={this.state.tuns2} 
                                                onChange={this.handleTun2Change}
                                                labelid="tun2"
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
                                            <InputLabel id="winal2">Winals</InputLabel>
                                            <Select 
                                                value={this.state.winals2} 
                                                onChange={this.handleWinal2Change}
                                                labelid="winal2"
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
                                            <InputLabel id="kin2">Kins</InputLabel>
                                            <Select 
                                                value={this.state.kins2} 
                                                onChange={this.handleKin2Change}
                                                labelid="kin2"
                                                label="Kins"
                                            >
                                                {KINS_DROP.map((name, index) => {
                                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                        <Grid container>
                            <Grid item xs={12}>
                                <p>(Long Count Companion Number) - (Ring Number) = Terminal Date Number </p>
                                <p>{companionLCstring + ' ' + companionCRstring + ' (LCD=' + companionLCD + ')'}<br></br>
                                with the Ring Number<br></br>
                                {' ' + ringLCstring + ' (-' + ringLCD + ' day interval)'}<br></br>
                                leads to the Terminal Date of <br></br>
                                {resultLCstring + ' ' + resultCRstring + ' (LCD=' + resultLCD +')'}
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={ paperStyle }>
                       
                        <p>What are Ring Numbers? A short example should adequately explain the concept. We know that 
                        13.0.0.0.0 is associated with the CR (Calendar Round) date 4-Ahau 8-Cumku.
                        The long count 0.0.0.0.1 is associated with 5-Imix 9-Cumku and that
                        0.0.0.0.2 belongs together with 6-Ik 10-Cunku. The Maya, in certain situations, would write a CR
                        that did not 'go with' its Long Count. In the case of Ring Numbers they would follow
                        the CR with a Distance Number that had a circle of dots around it; hence, the term 'Ring Number.'
                        The 'Ring Numbers' is the Mayan way of saying, 'I know that you may be confused with this 
                        combination of Long Count and CR, BUT the number inside the 'ring' will give you the message
                        that in this situation I started counting ONE (the Ring Number) day(s) before 13.0.0.0.0 to
                        arrive at THIS date!' The Ring Number message tends to legitimize this date. BDPro would 
                        convert this date to 0.0.0.0.1 5-Imix 9-Cumku, thus putting the date into proper perspective
                        within the current era.</p>
                        
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}

RingNumbers.propTypes = {
    names: PropTypes.string.isRequired,
    //classes: PropTypes.object.isRequired,
    correlation: PropTypes.number.isRequired,
};

//export default withStyles(styles)(RingNumbers);
export default RingNumbers;