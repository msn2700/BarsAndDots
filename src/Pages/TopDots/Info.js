// Import all the components and packages that we'll need
import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { Settings, Help, Menu } from '@mui/icons-material';

export default function Info(props) {

    // First import all the props we need from the parent
    const { setInfoOpen, open } = props;

    return(
        <div>
            <Dialog onClose={() => setInfoOpen(false)} open={open} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center' }}>About Bars & Dots Online</DialogTitle>
                
                <DialogContent>

                    <p><b>Acknowledgement</b><br></br> 
                        All calendar concepts are credited to, and are the cultural heritage of, the Mayan people past and present. 
                        Here we merely follow in their footsteps.
                    </p>

                    <p><b>Instructions</b><br></br> 
                        To begin, click the settings icon <IconButton color="inherit"><Settings /></IconButton> and set correlation 
                        factor and naming convention. Note that refreshing/reloading the browser page will return correlation / naming 
                        settings to default. Next, click the menu icon <IconButton color="inherit"><Menu /></IconButton> in the upper right
                        to access the list of pages you can visit within the site. For help and a list of assumptions used in our 
                        calculations, click <IconButton color="inherit"><Help /></IconButton> to see a list<br></br>
                    </p>
                
                    <p><b>Concept</b><br></br> 
                        This is an online, web app version of the original Bars And Dots (Copyright 1989-1994, Rev 1.13) 
                        program written in MS-DOS by Sid Hollander. It uses a different format than the original
                        program but preserves and expands on the functionality. It also uses Node.js / React /  
                        MUI framework and Webpack/Babel software. This site does not accept nor store user information. 
                        This site is also generally under construction as 
                        we add new features and frequently reassess accuracy. For best experience, view this site on a 
                        laptop / desktop; limited support for smartphones. Questions and feedback can be sent to <b>info@mayan-calendar.com</b>.
                    </p>

                    <p><b>Producer and Sponsor</b><br></br> 
                        Dr. Edwin Barnhart<br></br>
                        Maya Exploration Center (MEC)<br></br>
                        info@mayan-calendar.com<br></br>
                        www.mayaexploration.com</p>
                    <p><b>Developers</b><br></br> 
                        Matthew S. Neel, Ethan M. Yoder</p>
                    <p><b>Glyph Art Credits</b><br></br>
                        Mark Pitts (2009 publications), Edwin Barnhart</p>

                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setInfoOpen(false)} color="primary">Close</Button>
                </DialogActions>
                
            </Dialog>
        </div>
    );
    
}

Info.propTypes = {
    open: PropTypes.bool.isRequired,
    setInfoOpen: PropTypes.func.isRequired,
}
