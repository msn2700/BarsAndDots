// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import all the functions that we'll need
import { getSimpleLCDFromLC, getLCValues, buildLCString, getLCString } from '../../Functions/General';
import { getJDNDateString, jdnToDate, getJDNFromLCD } from '../../Functions/JulianDayNumber';
import { crString, lcdToCRInfo, getGodNum } from '../../Functions/CalendarRound';

// Import the dropdown data that we'll need for selection
import { PIKTUN_NORMAL, BAKTUN_VALUES, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { paperStyle, textboxStyle } from '../../Data/Components';

export default function SerpentNumbers(props) {

    // First, import any of the props items we'll need
    const { correlation, names } = props;

    // Next, define some local variables and how to set them
    const [ piktuns, setPiktuns ] = useState(3);
    const [ baktuns, setBaktuns ] = useState(16);
    const [ katuns,  setKatuns  ] = useState(3);
    const [ tuns,    setTuns    ] = useState(5);
    const [ winals,  setWinals  ] = useState(6);
    const [ kins,    setKins    ] = useState(16);

    // Now define all six functions to handle selection changes by the user
    function handlePiktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setPiktuns(event.target.value);
        }
    }

    function handleBaktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setBaktuns(event.target.value);
        }
    }

    function handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKatuns(event.target.value);
        }
    }

    function handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setTuns(event.target.value);
        }
    }

    function handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            setWinals(event.target.value);
        }
    }

    function handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKins(event.target.value);
        }
    }

    // Calculate some basic quantities to use in the next section
    let baseLCD =  getSimpleLCDFromLC(piktuns, baktuns, katuns, tuns, winals, kins);
    let serpentLCstring = getLCString(piktuns, baktuns, katuns, tuns, winals, kins);
    let resultLCD = baseLCD - 10967536;
    let resultLCstring = buildLCString(getLCValues(resultLCD));

    return(

        <Grid container>

            <Grid item xs={12}>
                <Paper sx={ paperStyle }>
                    <h1>Serpent Numbers</h1>
                    <p>Enter a serpent number (with piktuns) to convert into typical Long Count, Gregorian and Julian</p>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={ paperStyle }>
                    <Grid container>
                        <Grid item xs={12}><p>Enter Serpent Number</p></Grid>
                        <Grid item xs={12}>
                            <Grid container>


                                <Grid item md={3}></Grid>
                                <Grid item xs={4} md={1} sx={textboxStyle}>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <InputLabel id="piktun">Piktuns</InputLabel>
                                        <Select 
                                            value={piktuns} 
                                            onChange={(event) => handlePiktunChange(event)}
                                            labelid="piktun"
                                            label="Piktuns"
                                        >
                                            {PIKTUN_NORMAL.map((name, index) => {
                                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} md={1} sx={textboxStyle}>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <InputLabel id="baktun">Baktuns</InputLabel>
                                        <Select 
                                            value={baktuns} 
                                            onChange={(event) => handleBaktunChange(event)}
                                            labelid="baktun"
                                            label="Baktuns"
                                        >
                                            {BAKTUN_VALUES.map((name, index) => {
                                                return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                            })}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                <Grid item md={3}></Grid>


                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>


            <Grid item xs={12}>
                <Paper sx={ paperStyle }>
                    <Grid container>
                        <Grid item xs={12}>

                            <p>{'The serpent long count ' + serpentLCstring + ' (serpent long count decimal of ' + baseLCD + ')'} <br></br>
                            is equivalent in our system to...<br></br><br></br>
                            LCD = {resultLCD}:<br></br>
                            {resultLCstring + ' ' + crString(lcdToCRInfo(resultLCD), names)}<br></br>
                            {'Lord of Night: ' + getGodNum(winals, kins - 1)}<br></br>
                            {'Julian: ' + getJDNDateString(jdnToDate(getJDNFromLCD(resultLCD, correlation), 'j'), 'j', false)}<br></br>
                            {'Gregorian: ' + getJDNDateString(jdnToDate(getJDNFromLCD(resultLCD, correlation), 'g'), 'g', false)}</p>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>


            <Grid item xs={12}>
                <Paper sx={ paperStyle }>
                    <p>Serpent Numbers are 6-place long counts. These would go to one larger position than 'Baktun' 
                        which is 'Piktun' as shown in the following</p>
                    <p>Piktun . Baktun . Katun . Tun . Uinal . Kin</p>
                    <p>As an example of a 'Serpent Number,' take the recorded number 3.16.3.5.6.16</p>
                    <p>This is equivalent to 10,967,536 in our decimal notation. </p>
                    <p>In order to get the 0.0.0.0.0 equivalent of the Serpent number,
                            the base date is subtracted from the expanded value of the Serpent Number. That difference is then 
                            treated as any other long count.</p>
                </Paper>
            </Grid>

        </Grid>
    );
}

SerpentNumbers.propTypes = {
    names: PropTypes.string.isRequired,
    correlation: PropTypes.number.isRequired,
};