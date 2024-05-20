// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
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
import { paperStyle, textboxStyle, paperStyleInput } from '../../Data/Components';

export default function RingNumbers(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

    // Create a long count object using today's date
    let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), correlation));

    // Next, define some local variables and how to set them
    const [ piktuns,  setPiktuns  ] = useState(10);
    const [ baktuns,  setBaktuns  ] = useState(lc.baktuns);
    const [ katuns,   setKatuns   ] = useState(lc.katuns);
    const [ tuns,     setTuns     ] = useState(lc.tuns);
    const [ winals,   setWinals   ] = useState(lc.winals);
    const [ kins,     setKins     ] = useState(lc.kins);

    const [ piktuns2, setPiktuns2 ] = useState(10);
    const [ baktuns2, setBaktuns2 ] = useState(0);
    const [ katuns2,  setKatuns2  ] = useState(0);
    const [ tuns2,    setTuns2    ] = useState(0);
    const [ winals2,  setWinals2  ] = useState(0);
    const [ kins2,    setKins2    ] = useState(1);


    // Enter the initial long count to which we will add the incremental "ring value"

    function handlePiktunChange(event) {
        if (event.target.value !== 9) {
            setPiktuns(event.target.value);
        } else {
            setPiktuns(event.target.value);
            setBaktuns(0);
        }
    }

    function handleBaktunChange(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setBaktuns(event.target.value);
        }
    }

    function handleKatunChange(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKatuns(event.target.value);
        }
    }

    function handleTunChange(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setTuns(event.target.value);
        }
    }

    function handleWinalChange(event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            setWinals(event.target.value);
        }
    }

    function handleKinChange(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKins(event.target.value);
        }
    }


    // Enter this for the "ring number" or incremental amount to adjust the initial long count

    function handlePiktun2Change(event) {
        if (event.target.value !== 9) {
            setPiktuns2(event.target.value);
        } else {
            setPiktuns2(event.target.value);
            setBaktuns2(0);
        }
    }

    function handleBaktun2Change(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setBaktuns2(event.target.value);
        }
    }

    function handleKatun2Change(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKatuns2(event.target.value);
        }
    }

    function handleTun2Change(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setTuns2(event.target.value);
        }
    }

    function handleWinal2Change(event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            setWinals2(event.target.value);
        }
    }

    function handleKin2Change(event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKins2(event.target.value);
        }
    }


    // Define some quantities related to the Long Count Companion date
    let companionLCD = getLCDFromLC(PIKTUN_VALUES[piktuns], baktuns, katuns, tuns, winals, kins);
    let companionLCstring = buildLCString(getLCValues(companionLCD));
    let companionCRstring = crString(lcdToCRInfo(companionLCD), names);

    // Define some quantities releated to the Ring Number
    let ringLCD = getLCDFromLC(PIKTUN_VALUES[piktuns2], baktuns2, katuns2, tuns2, winals2, kins2);
    let ringLCstring = buildLCString(getLCValues(ringLCD));

    // Define some quantities for combining the companion and ring numbers
    let resultLCD = companionLCD - ringLCD;
    let resultLCstring = buildLCString(getLCValues(resultLCD));
    let resultCRstring = crString(lcdToCRInfo(resultLCD), names);

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
                                            value={piktuns} 
                                            onChange={(event) => handlePiktunChange(event)}
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
                                            value={baktuns} 
                                            onChange={(event) => handleBaktunChange(event)}
                                            labelid="baktun"
                                            label="Baktuns"
                                        >
                                            {/* Here we need to restrict baktuns to 0-12 in case piktuns = 19, otherwise it can be 0-19 */}
                                            {ALLOWED_BAKTUNS[piktuns].Coefficients.map((name, index) => {
                                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                            })}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} md={2} sx={textboxStyle}>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <InputLabel id="katun">Katuns</InputLabel>
                                        <Select 
                                            value={katuns} 
                                            onChange={(event) => handleKatunChange(event)}
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
                                            value={tuns} 
                                            onChange={(event) => handleTunChange(event)}
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
                                            value={winals} 
                                            onChange={(event) => handleWinalChange(event)}
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
                                            value={kins} 
                                            onChange={(event) => handleKinChange(event)}
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
                                            value={piktuns2} 
                                            onChange={(event) => handlePiktun2Change(event)}
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
                                            value={baktuns2} 
                                            onChange={(event) => handleBaktun2Change(event)}
                                            labelid="baktun2"
                                            label="Baktuns"
                                        >
                                            {/* Here we need to restrict baktuns to 0-12 in case piktuns = 19, otherwise it can be 0-19 */}
                                            {ALLOWED_BAKTUNS[piktuns2].Coefficients.map((name, index) => {
                                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                            })}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} md={2} sx={textboxStyle}>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <InputLabel id="katun2">Katuns</InputLabel>
                                        <Select 
                                            value={katuns2} 
                                            onChange={(event) => handleKatun2Change(event)}
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
                                            value={tuns2} 
                                            onChange={(event) => handleTun2Change(event)}
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
                                            value={winals2} 
                                            onChange={(event) => handleWinal2Change(event)}
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
                                            value={kins2} 
                                            onChange={(event) => handleKin2Change(event)}
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

RingNumbers.propTypes = {
    names: PropTypes.string.isRequired,
    correlation: PropTypes.number.isRequired,
};
