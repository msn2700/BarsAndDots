// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

// Import functions that we'll need
import { getSimpleLCDFromLC } from '../../../Functions/General';

// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '5px',
}

export default function LongCountsDistancePopUp(props) {

    // First, import any of the props items we'll need
    const { calculateLC } = props;

    // Next, define some local variables and how to set them
    // Set the initial values that will show up in the dialog box when it pops up
    const [ piktuns,  setPiktuns  ] = useState(0);
    const [ baktuns,  setBaktuns  ] = useState(0);
    const [ katuns,   setKatuns   ] = useState(0);
    const [ tuns,     setTuns     ] = useState(0);
    const [ winals,   setWinals   ] = useState(0);
    const [ kins,     setKins     ] = useState(0);
    const [ tzolkin,  setTzolkin  ] = useState(0);
    const [ haab,     setHaab     ] = useState(0);
    const [ cr,       setCR       ] = useState(0);
    const [ cycle819, setCycle819 ] = useState(0);


    // First we handle the six long count cycles 
    function handlePiktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 5) {
            setPiktuns(event.target.value);
            calculateLC(getSimpleLCDFromLC( event.target.value, baktuns, katuns, tuns, winals, kins) 
                + tzolkin * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleBaktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setBaktuns(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, event.target.value, katuns, tuns, winals, kins)
                + tzolkin * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleKatunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKatuns(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, event.target.value, tuns, winals, kins)
                + tzolkin * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleTunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setTuns(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, event.target.value, winals, kins)
                + tzolkin * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleWinalChange (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            setWinals(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, tuns, event.target.value, kins)
                + tzolkin * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleKinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKins(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, tuns, winals, event.target.value)
                + tzolkin * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }



    // These four inputs need special handling since they aren't part of the LC calculation
    // They follow the template: getLCDfromLC() + event.target.value * (number of days)

    function handleTzolkinChange (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            setTzolkin(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, tuns, winals, kins)
                + event.target.value * 260 + haab * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleHaabChange (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            setHaab(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, tuns, winals, kins)
                + tzolkin * 260 + event.target.value * 365 + cr * 18980 + cycle819 * 819);
        }
    }

    function handleCRChange (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            setCR(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, tuns, winals, kins)
                + tzolkin * 260 + haab * 365 + event.target.value * 18980 + cycle819 * 819);
        }
    }

    function handleCycle819Change (event) {
        if (event.target.value >= 0 && event.target.value <= 10) {
            setCycle819(event.target.value);
            calculateLC(getSimpleLCDFromLC( piktuns, baktuns, katuns, tuns, winals, kins)
                + tzolkin * 260 + haab * 365 + cr * 18980 + event.target.value * 819 );
        }
    }


    return(

        <Grid container justifyContent="center">

            {/*<Grid item md={1}><br></br></Grid>*/}

            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="piktuns"
                    label="Piktuns"
                    value={piktuns}
                    type="number"
                    helperText="0-5"
                    onChange={(event) => handlePiktunChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 5 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="baktuns"
                    label="Baktuns"
                    value={baktuns}
                    type="number"
                    helperText="0-19"
                    onChange={(event) => handleBaktunChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 19 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="katuns"
                    label="Katuns"
                    value={katuns}
                    type="number"
                    helperText="0-19"
                    onChange={(event) => handleKatunChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 19 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="tuns"
                    label="Tuns"
                    value={tuns}
                    type="number"
                    helperText="0-19"
                    onChange={(event) => handleTunChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 19 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="winals"
                    label="Uinals"
                    value={winals}
                    type="number"
                    helperText="0-17"
                    onChange={(event) => handleWinalChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 17 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="kins"
                    label="Kins"
                    value={kins}
                    type="number"
                    helperText="0-19"
                    onChange={(event) => handleKinChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 19 } }}
                />
            </Grid>

            {/*<Grid item md={1}><br></br></Grid>*/}

            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="tzolkins"
                    label="Tzolkins"
                    value={tzolkin}
                    type="number"
                    helperText="0-10"
                    onChange={(event) => handleTzolkinChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="haabs"
                    label="Haabs"
                    value={haab}
                    type="number"
                    helperText="0-10"
                    onChange={(event) => handleHaabChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="crs"
                    label="CRs"
                    value={cr}
                    type="number"
                    helperText="0-10"
                    onChange={(event) => handleCRChange(event)}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
            </Grid>
            <Grid item md={2} sx={textboxStyle}>
                <TextField
                    id="cycle819"
                    label="819s"
                    value={cycle819}
                    type="number"
                    helperText="0-10"
                    onChange={(event) => handleCycle819Change(event)}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
            </Grid>

        </Grid>
    );

}

LongCountsDistancePopUp.propTypes = {
    calculateLC: PropTypes.func.isRequired,
};
