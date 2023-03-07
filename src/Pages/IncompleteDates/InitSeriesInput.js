// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';

// Import the functions that we'll need
import { updateSet } from '../../Functions/General';
import { getHaabCoeffList_SID } from '../../Functions/CalendarRound';

// Import all the data arrays that will be used as dropdown selections
import { TZOLKIN_NAMES_SID, HAAB_NAMES_SID, TZOLKIN_COEFF_SID, BAKTUN_VALUES_SID, PIKTUN_VALUES_SID,
         ALLOWED_BAKTUNS_SID, ALLOWED_PIKTUNS_SID, KATUNS_DROP_SID, TUNS_DROP_SID, WINALS_DROP_SID, KINS_DROP_SID, LORDS_DROP_SID 
         } from '../../Data/CalendarRoundData';

class InitSeriesInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            lcdSet: [ 2, 1, 0 ], // This is the set we will populate with potential date solutions, not actually used

            piktuns: 11,
            baktuns: 0,
            katuns: 0,
            tuns: 0,
            winals: 0,
            kins: 0,

            tzolkinCoefficient: 0, // A value of 1 here becomes 1 on the list of 1-13
            tzolkinName: 0,        // A value of 1 here becomes Ik (2nd on the list of 20)
            haabCoefficient: 0,    // A value of 5 here becomes 5 on the list of 4 allowed values
            haabName: 0,           // A value of 1 here becomes Pop (1st on the list of 20)

            lords: 0,

        };

        this.handlePiktunChange = this.handlePiktunChange.bind(this);
        this.handleBaktunChange = this.handleBaktunChange.bind(this);
        this.handleKatunChange = this.handleKatunChange.bind(this);
        this.handleTunChange = this.handleTunChange.bind(this);
        this.handleWinalChange = this.handleWinalChange.bind(this);
        this.handleKinChange = this.handleKinChange.bind(this);

        this.handleTzolkinCoefficientChange = this.handleTzolkinCoefficientChange.bind(this);
        this.handleTzolkinNameChange = this.handleTzolkinNameChange.bind(this);
        this.handleHaabCoefficientChange = this.handleHaabCoefficientChange.bind(this);
        this.handleHaabNameChange = this.handleHaabNameChange.bind(this);

        this.handleLordsChange = this.handleLordsChange.bind(this);

    }

    // Handle all the state variable changes; in every case, recalculate the set of LCDs to return
    // Start with the long count pieces
    handlePiktunChange (event) {
        this.setState({
            piktuns: event.target.value,
            }, this.props.calcSet( updateSet(
                event.target.value, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
                this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
                this.state.lords) ));
    }


    handleBaktunChange (event) {
        this.setState({
            baktuns: event.target.value,
            }, this.props.calcSet( updateSet(
                this.state.piktuns, event.target.value, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
                this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
                this.state.lords) ));
    }

    handleKatunChange (event) {
        this.setState({
            katuns: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, event.target.value, this.state.tuns, this.state.winals, this.state.kins,
            this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
            this.state.lords) ));
    }

    handleTunChange (event) {
        this.setState({
            tuns: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, event.target.value, this.state.winals, this.state.kins,
            this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
            this.state.lords) ));
    }

    handleWinalChange (event) {
        this.setState({
            winals: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, event.target.value, this.state.kins,
            this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
            this.state.lords) ));
    }

    handleKinChange (event) {
        this.setState({
            kins: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, event.target.value,
            this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
            this.state.lords) ));
    }



    // Now work on the calendar round pieces
    handleTzolkinCoefficientChange (event) {
        this.setState({
            tzolkinCoefficient: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
            event.target.value, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
            this.state.lords) ));
    }

    handleTzolkinNameChange (event) {
        this.setState({
            tzolkinName: event.target.value,
            //haabCoefficient: 0,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
            this.state.tzolkinCoefficient, event.target.value, this.state.haabCoefficient, this.state.haabName,
            this.state.lords) ));
    }

    handleHaabCoefficientChange (event) {
        this.setState({
            haabCoefficient: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
            this.state.tzolkinCoefficient, this.state.tzolkinName, event.target.value, this.state.haabName,
            this.state.lords) ));
    }

    handleHaabNameChange (event) {
        this.setState({
            haabName: event.target.value,
            //haabCoefficient: 0,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
            this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, event.target.value,
            this.state.lords) ));
    }



    // Lastly, work on the Lords of the Night entry
    handleLordsChange (event) {
        this.setState({
            lords: event.target.value,
        }, this.props.calcSet( updateSet(
            this.state.piktuns, this.state.baktuns, this.state.katuns, this.state.tuns, this.state.winals, this.state.kins,
            this.state.tzolkinCoefficient, this.state.tzolkinName, this.state.haabCoefficient, this.state.haabName,
            event.target.value) ));
    }


    render() {

        return(

            <Grid container alignItems="center">

                <Grid item xs={12} md={12}>
                    <Grid container>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="piktun">Piktuns</InputLabel>
                                <Select 
                                    value={this.state.piktuns} 
                                    onChange={this.handlePiktunChange}
                                    labelid="piktun"
                                    label="Piktuns"
                                >
                                    {/* Here we need to restrict piktuns based on baktun selection */}
                                    {ALLOWED_PIKTUNS_SID[this.state.baktuns].Coefficients.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="baktun">Baktuns</InputLabel>
                                <Select 
                                    value={this.state.baktuns} 
                                    onChange={this.handleBaktunChange}
                                    labelid="baktun"
                                    label="Baktuns"
                                >
                                    {/* Here we need to restrict baktuns to 0-12 in case piktuns = 19, otherwise it can be 0-19 */}
                                    {ALLOWED_BAKTUNS_SID[this.state.piktuns].Coefficients.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="katun">Katuns</InputLabel>
                                <Select 
                                    value={this.state.katuns} 
                                    onChange={this.handleKatunChange}
                                    labelid="katun"
                                    label="Katuns"
                                >
                                    {KATUNS_DROP_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="tun">Tuns</InputLabel>
                                <Select 
                                    value={this.state.tuns} 
                                    onChange={this.handleTunChange}
                                    labelid="tun"
                                    label="Tuns"
                                >
                                    {TUNS_DROP_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="winal">Winals</InputLabel>
                                <Select 
                                    value={this.state.winals} 
                                    onChange={this.handleWinalChange}
                                    labelid="winal"
                                    label="Winals"    
                                >
                                    {WINALS_DROP_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="kin">Kins</InputLabel>
                                <Select 
                                    value={this.state.kins} 
                                    onChange={this.handleKinChange}
                                    labelid="kin"
                                    label="Kins"
                                >
                                    {KINS_DROP_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Now we list the calendar round and Lords of the Night dropdowns */}

                <Grid item xs={12} md={12}>
                    <Grid container>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="TN">Tzolk'in Number</InputLabel>
                                <Select 
                                    value={this.state.tzolkinCoefficient} 
                                    onChange={this.handleTzolkinCoefficientChange}
                                    labelid="TN"
                                    label="Tzolk'in Number"
                                >
                                    {TZOLKIN_COEFF_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="TM">Tzolk'in Name</InputLabel>
                                <Select 
                                    value={this.state.tzolkinName} 
                                    onChange={this.handleTzolkinNameChange}
                                    labelid="TM"
                                    label="Tzolk'in Name"
                                >
                                    {/* No restrictions on this one */}
                                    {TZOLKIN_NAMES_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="HN">Haab Number</InputLabel>
                                <Select 
                                    value={this.state.haabCoefficient} 
                                    onChange={this.handleHaabCoefficientChange}
                                    labelid="HN"
                                    label="Haab Number"
                                >
                                    {/* Here we need to restrict Haab coefficients depending on Tzolkin day name, if one is chosen
                                        We also need to restrict Haab coefficients depending on Haab month name, i.e. Uayeb */}
                                    {/* Previously we had...
                                        HAAB_COEFF_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })*/}

                                    {getHaabCoeffList_SID(this.state.tzolkinName, this.state.haabName).map((name, index) => {
                                            return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                        })
                                    }
                                    

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="HM">Haab Name</InputLabel>
                                <Select 
                                    value={this.state.haabName} 
                                    onChange={this.handleHaabNameChange}
                                    labelid="HM"
                                    label="Haab Name" 
                                >
                                    {/* No restrictions are placed here */} 
                                    {HAAB_NAMES_SID.map((name, index) => {
                                    return (<MenuItem value={index} key={index}>{name[this.props.names]}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
 
                        <Grid item xs={6} md={2}>
                            <FormControl sx={{ m: 1, minWidth: 130 }}>
                                <InputLabel id="lord">Lord of the Night</InputLabel>
                                <Select 
                                    value={this.state.lords} 
                                    onChange={this.handleLordsChange}
                                    labelid="lord"
                                    label="Lord of the Night"
                                >
                                    {LORDS_DROP_SID.map((name, index) => {
                                        return (<MenuItem value={index} key={index}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Grid>


            </Grid>
        );
    }
}

InitSeriesInput.propTypes = {
    calcSet: PropTypes.func.isRequired,
    names: PropTypes.string.isRequired,
    correlation: PropTypes.number.isRequired,
};

export default InitSeriesInput;