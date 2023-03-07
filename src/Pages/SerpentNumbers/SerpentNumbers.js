// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import all the functions that we'll need
import { getSimpleLCDFromLC, getLCValues, buildLCString } from '../../Functions/General';
import { getJDNDateString, jdnToDate, getJDNFromLCD } from '../../Functions/JulianDayNumber';
import { crString, lcdToCRInfo, getGodNum } from '../../Functions/CalendarRound';

// Import the dropdown data that we'll need for selection
import { PIKTUN_NORMAL, BAKTUN_VALUES, KATUNS_DROP, TUNS_DROP, WINALS_DROP, KINS_DROP } from '../../Data/CalendarRoundData';

// Import other code, e.g. components, styles, etc.
import { paperStyle, textboxStyle } from '../../Data/Components';

class SerpentNumbers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            // This loads, as default, the serpent number that corresponds with the long count zero date 0.0.0.0.0
            // The serpent long count (SLC) 3.16.3.5.6.16 --> serpent LCD (SLCD) = 10,967,536
            // So, the SLCD = 10,967,536 corresponds with an LCD = 0
            piktuns: 3,
            baktuns: 16,
            katuns: 3,
            tuns: 5,
            winals: 6,
            kins: 16,
        };

        this.handlePiktunChange = this.handlePiktunChange.bind(this);
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

    }

    handlePiktunChange (event) {
        if (event.target.value >= 0 && event.target.value <= 19) {
            this.setState({
                piktuns: event.target.value,
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


    render() {

        let baseLCD = getSimpleLCDFromLC(this.state.piktuns,this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins);
        let serpentLCstring = this.state.piktuns + '.' + this.state.baktuns + '.' + this.state.katuns + '.' + this.state.tuns + '.' + this.state.winals + '.' + this.state.kins;
        
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
                                                value={this.state.piktuns} 
                                                onChange={this.handlePiktunChange}
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
                                                value={this.state.baktuns} 
                                                onChange={this.handleBaktunChange}
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
                                    <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                    <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                    <Grid item xs={4} md={1} sx={textboxStyle}>
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
                                {resultLCstring + ' ' + crString(lcdToCRInfo(resultLCD), this.props.names)}<br></br>
                                {'Lord of Night: ' + getGodNum(this.state.winals, this.state.kins - 1)}<br></br>
                                {'Julian: ' + getJDNDateString(jdnToDate(getJDNFromLCD(resultLCD, this.props.correlation), 'j'), 'j', false)}<br></br>
                                {'Gregorian: ' + getJDNDateString(jdnToDate(getJDNFromLCD(resultLCD, this.props.correlation), 'g'), 'g', false)}</p>

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
}

SerpentNumbers.propTypes = {
    names: PropTypes.string.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default SerpentNumbers;