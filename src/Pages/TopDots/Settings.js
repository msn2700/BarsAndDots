// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            correlation: this.props.correlation,
            names: this.props.names,
        };
        this.changeCorrelation = this.changeCorrelation.bind(this);
        this.changeNames = this.changeNames.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave () {
        this.props.changeCorrelation(this.state.correlation);
        this.props.changeNames(this.state.names);
        this.props.changeopen(false);
    }

    handleCancel () {
        this.setState({ 
            correlation: this.props.correlation,
            names: this.props.names,
        });
        this.props.changeopen(false);
    }

    changeCorrelation (event) {
        this.setState({
            correlation: event.target.value,
        });
    }

    changeNames (event) {
        this.setState({
            names: event.target.value,
        });
    }

    render() {

        return(
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Grid container justifyContent="space-evenly">

                    <Grid item md={12}>
                        <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center' }}>Settings</DialogTitle>
                    </Grid>

                    <Grid item md={12}>
                            <DialogContent sx={{ textAlign: 'center' }}>
                                <Grid container justifyContent="space-evenly">

                                    <Grid item xs={12} md={12}>
                                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                                            <InputLabel id="corID">Change Correlation Factor</InputLabel>
                                            <Select 
                                                value={this.state.correlation} 
                                                onChange={this.changeCorrelation}
                                                labelId="corID"
                                                label="Change Correlation Factor"
                                            >
                                                <MenuItem value={394483}>Bowditch: 394,483           </MenuItem>
                                                <MenuItem value={438906}>Willson: 438,906            </MenuItem>
                                                <MenuItem value={482699}>Smiley: 482,699             </MenuItem>
                                                <MenuItem value={489138}>Makemson: 489,138           </MenuItem>
                                                <MenuItem value={489383}>Modified Spinden: 489,383   </MenuItem>
                                                <MenuItem value={489384}>Spinden: 489,384            </MenuItem>
                                                <MenuItem value={492622}>Teeple: 492,622             </MenuItem>
                                                <MenuItem value={497878}>Dinsmoor: 497,878           </MenuItem>
                                                <MenuItem value={508363}>-4CR: 508,363               </MenuItem>
                                                <MenuItem value={546323}>-2CR: 546,323               </MenuItem>
                                                <MenuItem value={556408}>Stock: 556,408              </MenuItem>
                                                <MenuItem value={584280}>Goodman: 584,280            </MenuItem>
                                                <MenuItem value={584281}>Martinez: 584,281           </MenuItem>
                                                <MenuItem value={584283}>Modified GMT-2: 584,283     </MenuItem>
                                                <MenuItem value={584284}>Modified GMT-1: 584,284     </MenuItem>
                                                <MenuItem value={584285}>Thompson: 584,285           </MenuItem>
                                                <MenuItem value={584286}>Martin-Skidmore: 584,286    </MenuItem>
                                                <MenuItem value={588626}>Pogo: 588,626               </MenuItem>
                                                <MenuItem value={622243}>+2CR: 622,243               </MenuItem>
                                                <MenuItem value={622261}>Bohm: 622,261               </MenuItem>
                                                <MenuItem value={626927}>Kreichgauer: 626,927        </MenuItem>
                                                <MenuItem value={660203}>+4CR: 660,203               </MenuItem>
                                                <MenuItem value={660208}>Wells-Fuls: 660,208         </MenuItem>
                                                <MenuItem value={674265}>Hochleitner: 674,265        </MenuItem>
                                                <MenuItem value={679108}>Escalona Ramos: 679,108     </MenuItem>
                                                <MenuItem value={679183}>Valliant: 679,183           </MenuItem>
                                                <MenuItem value={774078}>Weitzel/Vollemaere: 774,078 </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={12}><br></br></Grid>

                                    <Grid item xs={12} md={12}>
                                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                                            <InputLabel id="namesID">Day & Month Names</InputLabel>
                                            <Select 
                                                value={this.state.names} 
                                                onChange={this.changeNames}
                                                labelid="namesID"
                                                label="Day & Month Names"
                                            >
                                                <MenuItem value="yucatec">Yucatec</MenuItem>
                                                <MenuItem value="kiche">K'iche'</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </DialogContent>
                        </Grid>
                    </Grid>

                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">Cancel</Button>
                    <Button onClick={this.handleSave} color="primary">Save</Button>
                </DialogActions>

            </Dialog>
        );
    }
}

Settings.propTypes = {
    open: PropTypes.bool.isRequired,
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
    changeCorrelation: PropTypes.func.isRequired,
    changeNames: PropTypes.func.isRequired,
    changeopen: PropTypes.func.isRequired,
}

export default Settings;