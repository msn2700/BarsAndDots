// Import all the components and packages that we'll need
import * as React from 'react';
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

class LCDiff extends React.Component {

    constructor(props) {
        super(props);
        let lc = getLCValues(getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear(), 'g'), 
                 this.props.correlation));
        this.state = {

            piktuns: 10,
            baktuns: lc.baktuns,
            katuns: lc.katuns,
            tuns: lc.tuns,
            winals: lc.winals,
            kins: lc.kins,

            piktuns2: 10,
            baktuns2: lc.baktuns,
            katuns2: lc.katuns,
            tuns2: lc.tuns,
            winals2: lc.winals,
            kins2: lc.kins,
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

    // First, handle the starting long count

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


    // Now handle the ending long count

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

        return(
            <Grid container>

                <Grid item md={9}>

                    <Grid container>

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
                

                    <Grid container>


                        <Grid item xs={4} md={2} sx={textboxStyle}>
                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="piktun2">Piktuns2</InputLabel>
                                <Select 
                                    value={this.state.piktuns2} 
                                    onChange={this.handlePiktun2Change}
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
                                    value={this.state.baktuns2} 
                                    onChange={this.handleBaktun2Change}
                                    labelid="baktun2"
                                    label="Baktuns2"
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
                                <InputLabel id="katun2">Katuns2</InputLabel>
                                <Select 
                                    value={this.state.katuns2} 
                                    onChange={this.handleKatun2Change}
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
                                    value={this.state.tuns2} 
                                    onChange={this.handleTun2Change}
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
                                    value={this.state.winals2} 
                                    onChange={this.handleWinal2Change}
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
                                    value={this.state.kins2} 
                                    onChange={this.handleKin2Change}
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
                    {' ' + Number(getLCDFromLC(PIKTUN_VALUES[this.state.piktuns],this.state.baktuns,this.state.katuns,this.state.tuns,this.state.winals,this.state.kins)) + ' '} 
                    and
                    {' ' + Number(getLCDFromLC(PIKTUN_VALUES[this.state.piktuns2],this.state.baktuns2,this.state.katuns2,this.state.tuns2,this.state.winals2,this.state.kins2)) + ' '}
                    is {' ' +
                        Number(getLCDFromLC(PIKTUN_VALUES[this.state.piktuns],this.state.baktuns,this.state.katuns,this.state.tuns,this.state.winals,this.state.kins)) - 
                        Number(getLCDFromLC(PIKTUN_VALUES[this.state.piktuns2],this.state.baktuns2,this.state.katuns2,this.state.tuns2,this.state.winals2,this.state.kins2)) + ' '} 
                        days
                </Grid>
            </Grid>
        );
    }
}

LCDiff.propTypes = {
    //props: PropTypes.number.isRequired,
};

export default LCDiff;