// Import components and other support libraries
import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Settings, Help, Info, Menu, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Grid, Drawer, List, ListItem, ListItemText, ListItemButton, Typography, IconButton, AppBar, Toolbar, Collapse } from '@mui/material';
//import Box from '@mui/material/Box';
//import { Link } from 'react-router-dom';

// Import the banner image to use on the nav bar
import BannerImage from '../Images/Banner.png';

// Import the various pages that we will navigate to
import DateDiffs from          '../Pages/DateDiffs/DateDiffs.js';
import CalendarCore from       '../Pages/CalendarDisplay/CalendarCore.js';
import DataLines from          '../Pages/DataLines/DataLines.js';
import DistanceArithmetic from '../Pages/DistanceArithmetic/DistanceArithmetic.js';
import Incomplete from         '../Pages/IncompleteDates/Incomplete.js';
import TemporalCycles from     '../Pages/TemporalCycles/TemporalCycles.js';
import DayStations from        '../Pages/DayStations/DayStations.js';
import MayaNumerology from     '../Pages/MayaNumerology/MayaNumerology';
import SerpentNumbers from     '../Pages/SerpentNumbers/SerpentNumbers.js';
import RingNumbers from        '../Pages/RingNumbers/RingNumbers.js';
import DeepTime from           '../Pages/DeepTime/DeepTime.js';

// Import the pop-up pages, or "top dots"
import SettingsTab from        '../Pages/TopDots/Settings.js';
import HelpTab from            '../Pages/TopDots/Help.js';
import InfoTab from            '../Pages/TopDots/Info.js';

// Import functions
import { getLCDFromJDN, changeToJDN } from '../Functions/JulianDayNumber';

// Import other code, e.g. components, styles, etc.
import { navStyle, bannerStyle, dotStyle } from '../Data/Components';

// Add style to the link text in the drawer list
const listItemStyle = {
  fontSize:'17px',  // Font size for list items in the drawer
  color: '#cfcfcf', // Set the link text color
}

const dropdownStyle = {
  fontSize:'17px',  // Font size for list items in the drawer
  color: '#ebeb00', // Set the link text color
}

const subListItemStyle = {
  fontSize:'17px',    // Font size for list items in the drawer
  color: '#cfcfcf',   // Set the link text color
  textAlign: 'right', // Align right to set off the sub-list items
}

export default function Navigation(){

  // Create state hooks that can be updated
  // These two are the most important, and only, site settings that need to propagate to almost every downstream page
  const [correlation, setCorrelation] = useState(584283);
  const [names, setNames] = useState('yucatec');

  // Create variables that control the main display and drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subListOpen, setSubListOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  let lcd = getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation)
  const [content, setContent] = useState( <CalendarCore correlation={correlation} names={names} lcd={lcd} /> );


  return(

    <div>


      {/* This is the fixed bar on top that never moves, with banner, title, "top dots" and hamburger menu */}
      <AppBar style={{ position: 'static', background: '#042104' }} >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* The nav bar is like a sandwich of elements: spacer box | image | title | spacer box | top dots */}

          <Grid container>

            <Grid item md={3} xs={1}></Grid>

            <Grid item md={2} xs={12}>
              <Paper sx={ bannerStyle }>
                <img src={ BannerImage } alt="Banner of codex with numbers" />
              </Paper>
            </Grid>

            <Grid item md={3} xs={12}>
              <Paper sx={ navStyle }>
                <Typography variant="h4" style={{ color: '#ebeb00' }}><b>Bars and Dots</b></Typography>
              </Paper>
            </Grid>

            <Grid item md={2} xs={1}></Grid>

            <Grid item md={2} xs={12}>
              <Paper sx={ dotStyle }>
                <IconButton onClick={ () => setInfoOpen(true)     } sx={{ color: '#ffffff' }}><Info /></IconButton>
                <IconButton onClick={ () => setHelpOpen(true)     } sx={{ color: '#ffffff' }}><Help /></IconButton>
                <IconButton onClick={ () => setSettingsOpen(true) } sx={{ color: '#ffffff' }}><Settings /></IconButton>
                <IconButton onClick={ () => setDrawerOpen(true)   } sx={{ color: '#ffffff' }}><Menu /></IconButton>
              </Paper>
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>


      {/* This is the drawer that will slide out when the hamburger menu icon is clicked in the above toolbar */}
      <Drawer
        anchor="right" // Open the drawer from the right side, cannot be swiped though
        open={drawerOpen} // Whether or not it's open is controlled by boolean
        onBackdropClick={() => setDrawerOpen(false)} // This will close the drawer when you click outside the drawer
        PaperProps={{ sx: { backgroundColor: "#404040" }  }} // Set the background color in the drawer itself
      >
        <div>
          <List>

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <CalendarCore correlation={correlation} names={names} /> ) }}>
              <ListItemText primary="Interactive Calendar" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton> 

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <DataLines correlation={correlation} names={names}/> ) }}>
              <ListItemText primary="Data Lines" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton>

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <DistanceArithmetic correlation={correlation} names={names}/> ) }}>
              <ListItemText primary="Distance Arithmetic" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton>

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <Incomplete correlation={correlation} names={names}/> ) }}>
              <ListItemText primary="Solve Incomplete Dates" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton>

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <TemporalCycles correlation={correlation}/> ) }}>
              <ListItemText primary="Temporal Cycles" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton>

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <MayaNumerology /> )} }>
              <ListItemText primary="Maya Numerology" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton>     

            <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <DateDiffs correlation={correlation} names={names} /> ) } }>
              <ListItemText primary="Date Differences" primaryTypographyProps={ listItemStyle }/>
            </ListItemButton>

            <ListItemButton onClick={() => setSubListOpen(!subListOpen)}>
              <ListItemText primary="Advanced" primaryTypographyProps={ dropdownStyle } />
              {subListOpen ? <ExpandLess sx={{ color: '#000000' }}/> : <ExpandMore sx={{ color: '#ebeb00' }}/>}
            </ListItemButton>

            {/* This will be a dropdown within the drawer to show other, more advanced options */}
            <Collapse in={subListOpen} timeout="auto" unmountOnExit>
              <List>

                <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <DayStations names={names}/> ) }} >
                  <ListItemText primary="819 Day Stations" primaryTypographyProps={ subListItemStyle }/>
                </ListItemButton>

                <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <SerpentNumbers correlation={correlation} names={names} /> ) }} >
                  <ListItemText primary="Serpent Numbers" primaryTypographyProps={ subListItemStyle }/>
                </ListItemButton>

                <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <RingNumbers correlation={correlation} names={names} /> ); }} >
                  <ListItemText primary="Ring Numbers" primaryTypographyProps={ subListItemStyle }/>
                </ListItemButton>

                <ListItemButton onClick={() => { setDrawerOpen(false); setContent( <DeepTime names={names} /> ) }}>
                  <ListItemText primary="Deep Time" primaryTypographyProps={ subListItemStyle }/>
                </ListItemButton>

              </List>
            </Collapse>

          </List>
        </div>
      </Drawer>

      {/* This is the main content of the screen, showing component pages */}
      <main>
        {content}
      </main>

      {/* Top dot items go here to handle changes related to these pop-ups */}
      <SettingsTab 
        open={settingsOpen}
        correlation={correlation}
        names={names}
        setCorrelation={setCorrelation}
        setNames={setNames}
        setSettingsOpen={setSettingsOpen}
        setContent={setContent}
      />

      <HelpTab open={helpOpen} setHelpOpen={setHelpOpen} /> 
      <InfoTab open={infoOpen} setInfoOpen={setInfoOpen} />

    </div>
  );
}
