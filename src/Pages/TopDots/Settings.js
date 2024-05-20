// Import all the components and packages that we'll need
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

// Import the various pages that we will navigate to
import CalendarCore from '../../Pages/CalendarDisplay/CalendarCore.js';

// Import functions
import { getLCDFromJDN, changeToJDN } from '../../Functions/JulianDayNumber';

export default function Settings(props) {

    // First import all the props we need from the parent
    const { open, correlation, names, setCorrelation, setNames, setSettingsOpen, setContent } = props;

    // Next, define some local variables to store the user selection before save/cancel
    const [ localCorrelation, setLocalCorrelation] = useState(correlation);
    const [ localNames, setLocalNames] = useState(names);

    // These functions will address the use of the Save / Cancel buttons
    function handleSave() {
        setCorrelation(localCorrelation);
        setNames(localNames);
        setContent( <CalendarCore correlation={localCorrelation} names={localNames}
            lcd={getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), localCorrelation)}
            /> );
        setSettingsOpen(false);
    }

    function handleCancel() {
        setSettingsOpen(false);
    }

    // These functions will handle the user selections from the dropdowns
    function changeCorrelation(event) {
        setLocalCorrelation(event.target.value);
    }

    function changeNames(event) {
        setLocalNames(event.target.value)
    }

        return(
            <Dialog
                open={open}
                onClose={() => setSettingsOpen(false)}
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
                                                value={localCorrelation} 
                                                onChange={(event) => changeCorrelation(event)}
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
                                                value={localNames} 
                                                onChange={(event) => changeNames(event)}
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
                    <Button onClick={handleCancel} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>

            </Dialog>
        );
    
}

Settings.propTypes = {
    open: PropTypes.bool.isRequired,
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
    setCorrelation: PropTypes.func.isRequired,
    setNames: PropTypes.func.isRequired,
    setSettingsOpen: PropTypes.func.isRequired,
}
