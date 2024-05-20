// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import functions that we'll need
import { getLCDFromLC, getLCValues } from '../../../Functions/General';
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Import the dropdown data that we'll need for selection
import { PIKTUN_VALUES, ALLOWED_BAKTUNS, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../../Data/CalendarRoundData';

// Define some style properties for the textbox to improve spacing
const textboxStyleLeft ={
    marginTop: '10px', 
    marginBottom: '10px',
    textAlign: 'left',
}
const textboxStyleRight ={
    marginTop: '10px', 
    marginBottom: '10px',
    textAlign: 'right',
}

export default function MayaLC(props) {

    // First, import any of the props items we'll need
    const { correlation, calcLCD } = props;

    // Next, define some local variables and how to set them
    // Note that the .getMonth() function returns 0 - 11 (Jan - Dec)
    let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), correlation));
    const [ piktuns, setPiktuns ] = useState(10);
    const [ baktuns, setBaktuns ] = useState(lc.baktuns);
    const [ katuns,  setKatuns  ] = useState(lc.katuns);
    const [ tuns,    setTuns    ] = useState(lc.tuns);
    const [ winals,  setWinals  ] = useState(lc.winals);
    const [ kins,    setKins    ] = useState(lc.kins);


    // Handle user selection changes
    function handlePiktunChange (event) {
            
        // First, handle the usual change of the piktun state for all but the short piktun...
        if (event.target.value !== 9) {
            setPiktuns(event.target.value);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[event.target.value], baktuns, katuns, tuns, winals, kins));
        } 
        
        // Now handle the short piktun, and automatically choose baktun = 0 when piktun = 19 (piktun index = 9)
        else {
            setPiktuns(event.target.value);
            setBaktuns(0);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[event.target.value], 0, katuns, tuns, winals, kins));
        }
    }


    function handleBaktunChange (event) {
        if (event.target.value >= -260 && event.target.value <= 260) {
            setBaktuns(event.target.value);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[piktuns], event.target.value, katuns, tuns, winals, kins));
        }
    }

    function handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKatuns(event.target.value);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[piktuns], baktuns, event.target.value, tuns, winals, kins));
        }
    }

    function handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setTuns(event.target.value);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[piktuns], baktuns, katuns, event.target.value, winals, kins));
        }
    }

    function handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            setWinals(event.target.value);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[piktuns], baktuns, katuns, tuns, event.target.value, kins));
        }
    }

    function handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKins(event.target.value);
            calcLCD(getLCDFromLC( PIKTUN_VALUES[piktuns], baktuns, katuns, tuns, winals, event.target.value));
        }
    }



    return(

        <Grid container>

            <Grid item xs={6} md={6} sx={textboxStyleRight}></Grid>
            <Grid item xs={6} md={6} sx={textboxStyleLeft}>
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
            <Grid item xs={6} md={6} sx={textboxStyleRight}>
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
            <Grid item xs={6} md={6} sx={textboxStyleLeft}>
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
            <Grid item xs={6} md={6} sx={textboxStyleRight}>
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
            <Grid item xs={6} md={6} sx={textboxStyleLeft}>
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
            <Grid item xs={6} md={6} sx={textboxStyleRight}>
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
            <Grid item xs={6} md={6} sx={textboxStyleLeft}></Grid>

        </Grid>
    );

}

MayaLC.propTypes = {
    calcLCD: PropTypes.func.isRequired,
    correlation: PropTypes.number.isRequired,
};
