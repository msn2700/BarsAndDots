// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the functions that we'll need
import { getLCDFromLC, getLCValues } from '../../../Functions/General';
import { changeToJDN, getLCDFromJDN } from '../../../Functions/JulianDayNumber';

// Import the dropdown data that we'll need for selection
import { PIKTUN_VALUES, ALLOWED_BAKTUNS, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { textboxStyle } from '../../../Data/Components';

export default function LCDiff (props) {

        // First, import any of the props items we'll need
        const { correlation } = props;

        // Create a long count object with date-place properties
        let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), correlation));

        // Next, define all the local variables and ways to change them
        const [ piktuns,  setPiktuns  ] = useState(10);
        const [ baktuns,  setBaktuns  ] = useState(lc.baktuns);
        const [ katuns,   setKatuns   ] = useState(lc.katuns);
        const [ tuns,     setTuns     ] = useState(lc.tuns);
        const [ winals,   setWinals   ] = useState(lc.winals);
        const [ kins,     setKins     ] = useState(lc.kins);

        const [ piktuns2, setPiktuns2 ] = useState(10);
        const [ baktuns2, setBaktuns2 ] = useState(lc.baktuns);
        const [ katuns2,  setKatuns2  ] = useState(lc.katuns);
        const [ tuns2,    setTuns2    ] = useState(lc.tuns);
        const [ winals2,  setWinals2  ] = useState(lc.winals);
        const [ kins2,    setKins2    ] = useState(lc.kins);


    // First, handle the starting long count

    function handlePiktunChange (event) {
        if (event.target.value !== 9) {
            setPiktuns(event.target.value);
        } else {
            setPiktuns(event.target.value);
            setBaktuns(0);
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



    // Now handle the ending long count

    function handlePiktun2Change (event) {
        if (event.target.value !== 9) {
            setPiktuns2(event.target.value);
        } else {
            setPiktuns2(event.target.value);
            setBaktuns2(0);
        }
    }

    function handleBaktun2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setBaktuns2(event.target.value);
        }
    }

    function handleKatun2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKatuns2(event.target.value);
        }
    }

    function handleTun2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setTuns2(event.target.value);
        }
    }

    function handleWinal2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 17) {
            setWinals2(event.target.value);
        }
    }

    function handleKin2Change (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            setKins2(event.target.value);
        }
    }

    return(

        <Grid container>

            <Grid item md={9}>

                <Grid container>

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
            

                <Grid container>


                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="piktun2">Piktuns2</InputLabel>
                            <Select 
                                value={piktuns2} 
                                onChange={(event) => handlePiktun2Change(event)}
                                labelid="piktun2"
                                label="Piktuns2"
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
                            <InputLabel id="baktun2">Baktuns2</InputLabel>
                            <Select 
                                value={baktuns2} 
                                onChange={(event) => handleBaktun2Change(event)}
                                labelid="baktun2"
                                label="Baktuns2"
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
                            <InputLabel id="katun2">Katuns2</InputLabel>
                            <Select 
                                value={katuns2} 
                                onChange={(event) => handleKatun2Change(event)}
                                labelid="katun2"
                                label="Katuns2"
                            >
                                {KATUNS_DROP.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="tun2">Tuns2</InputLabel>
                            <Select 
                                value={tuns2} 
                                onChange={(event) => handleTun2Change(event)}
                                labelid="tun2"
                                label="Tuns2"
                            >
                                {TUNS_DROP.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="winal2">Winals2</InputLabel>
                            <Select 
                                value={winals2} 
                                onChange={(event) => handleWinal2Change(event)}
                                labelid="winal2"
                                label="Winals2"    
                            >
                                {WINALS_DROP.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2} sx={textboxStyle}>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="kin2">Kins2</InputLabel>
                            <Select 
                                value={kins2} 
                                onChange={(event) => handleKin2Change(event)}
                                labelid="kin2"
                                label="Kins2"
                            >
                                {KINS_DROP.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>


                </Grid>
            </Grid>
            


            <Grid item md={3}>
                The distance between 
                    {' ' + Number(getLCDFromLC(PIKTUN_VALUES[piktuns],baktuns,katuns,tuns,winals,kins)) + ' '} 
                and
                    {' ' + Number(getLCDFromLC(PIKTUN_VALUES[piktuns2],baktuns2,katuns2,tuns2,winals2,kins2)) + ' '}
                is {' ' +
                    Number(getLCDFromLC(PIKTUN_VALUES[piktuns],baktuns,katuns,tuns,winals,kins)) - 
                    Number(getLCDFromLC(PIKTUN_VALUES[piktuns2],baktuns2,katuns2,tuns2,winals2,kins2)) + ' '} 
                days
            </Grid>
        </Grid>
    );

}

LCDiff.propTypes = {
    correlation: PropTypes.number.isRequired,
};

