// Import components and other support libraries
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Help, Info, Menu, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton, AppBar, Toolbar, Collapse } from '@mui/material';
import Box from '@mui/material/Box';

//import Paper from '@mui/material/Paper';
//import { makeStyles, withStyles } from "@mui/styles";

// Import the banner image to use on the nav bar
import BannerImage from '../Images/Banner.png';

// Import the various pages that we will navigate to
import DateDiffs from          '../Pages/DateDiffs/DateDiffs.js';
import FullDisplay from        '../Pages/CalendarDisplay/FullDisplay.js';
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
  fontSize:'17px',  // Font size for list items in the drawer
  color: '#cfcfcf', // Set the link text color
}

export default function Navigation(loadPage){
//class Navigation extends React.Component {

  const [correlation, setCorrelation] = useState(584283);
  const [names, setNames] = useState('yucatec');

  //const [settingsOpen, setSettingsOpen] = useState(false);
  //const [helpOpen, setHelpOpen] = useState(false);
  //const [infoOpen, setInfoOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subListOpen, setSubListOpen] = useState(false);

  //const [content, setContent] = useState(handleItemClick(loadPage));


  const [content, setContent] = useState(
    <FullDisplay correlation={correlation} names={names}
      lcd={getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation)}
      />
  );


  {/*
  constructor(props) {
    super(props);
    this.state = {

      // Initially, all dialog screens and the navigation drawer are closed
      settingsOpen: false,
      helpOpen: false,
      infoOpen: false,
      drawerOpen: false,
      subListOpen: false,

      // By default, load the calendar page first
      content: <FullDisplay correlation={this.props.correlation} names={this.props.names}
      lcd={getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation)}
      />,

    };
      
    this.handleItemClick = this.handleItemClick.bind(this);
    this.changeSettingsOpen = this.changeSettingsOpen.bind(this);
    this.changeHelpOpen = this.changeHelpOpen.bind(this);
    this.changeInfoOpen = this.changeInfoOpen.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleSubListClick = this.handleSubListClick.bind(this);

  }
  
  */}

  // Handle the event when the user clicks on one of the page links
  function handleItemClick(item){

    // First, change the state of the drawer so it will close when we navigate away / follow a link
    //this.setState({ drawerOpen: false})
    setDrawerOpen(false);

    // Now handle each navigation route separately
    switch(item) {
      case ('calendarDisplay'):
        setContent( <FullDisplay correlation={correlation} names={names}
            lcd={getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), correlation)}
            /> );
        break;
      case ('dataLines'): 
        setContent( <DataLines correlation={correlation} names={names}/> );
        break;
      case ('distance'): 
        setContent( <DistanceArithmetic correlation={correlation} names={names}/> );
        break;
      case ('incomplete'):
        setContent( <Incomplete correlation={correlation} names={names}/> );
        break;
      case ('tempCycles'):
        setContent( <TemporalCycles correlation={correlation}/> );
        break;
      case ('mayaNumerology'):
        setContent( <MayaNumerology /> );
        break;
      case ('dayStations'):
        setContent( <DayStations correlation={correlation} names={names}/> );
        break;
      case ('serpent'):
        setContent( <SerpentNumbers correlation={correlation} names={names} /> );
        break;
      case ('ring'):
        setContent( <RingNumbers correlation={correlation} names={names} /> );
        break;
      case ('dateDiffs'):
        setContent( <DateDiffs correlation={correlation} names={names} /> );
        break;
      case ('deeptime'):
        setContent( <DeepTime correlation={correlation} names={names} /> );
        break;

      // These are the "top dots" on the toolbar menu; when clicked change the state to open 
      /*
      case ('settings'):
        setSettingsOpen(true);
        break;
      case ('help'):
        setHelpOpen(true);
        break;  
      case ('info'):
        setInfoOpen(true);
        break;
        */
      default:
        // Do nothing

    }
  }



  {/*
  // Handle the "top dots" pop-ups at the top of the navigation page
  changeSettingsOpen(value) { this.setState({ settingsOpen: value, }); }
  changeHelpOpen(value) {     this.setState({ helpOpen:     value, }); }
  changeInfoOpen(value) {     this.setState({ infoOpen:     value, }); }
  
  // Handle the drawer opening / closing
  handleDrawerOpen()  { this.setState({ drawerOpen:  true,   }); }
  handleDrawerClose() { this.setState({ drawerOpen:  false,  }); }
  handleSubListClick(){ this.setState({ subListOpen: !this.state.subListOpen })}
  */}

  //render() {

    return(

      <div>

        {/* This is the fixed bar on top that never moves, with title, "top dots" and hamburger menu */}
        <AppBar style={{ position: 'static', background: '#042104' }} >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

            {/* The nav bar is like a sandwich of elements: spacer box | image | title | spacer box | top dots */}

            <Box sx={{ width: 400 }} />
            <img src={ BannerImage } alt="Banner of codex with numbers" />
            <Typography variant="h4" style={{ color: '#ebeb00' }}><b>Bars and Dots</b></Typography>
            <Box sx={{ width: 250 }} />

            <List>
              <ListItem>
                <IconButton onClick={ () => handleItemClick('info')     } sx={{ color: '#ffffff' }}><Info /></IconButton>
                <IconButton onClick={ () => handleItemClick('help')     } sx={{ color: '#ffffff' }}><Help /></IconButton>
                <IconButton onClick={ () => handleItemClick('settings') } sx={{ color: '#ffffff' }}><Settings /></IconButton>
                <IconButton onClick={ () => setDrawerOpen(true)         } sx={{ color: '#ffffff' }}><Menu /></IconButton>
              </ListItem>
            </List>
          
          </Toolbar>
        </AppBar>

        {/* This is the drawer that will slide out when the hamburger menu icon is clicked in the above toolbar */}
        <Drawer
          anchor="right" // Open the drawer from the right side, cannot be swiped though
          open={drawerOpen}
          onBackdropClick={() => setDrawerOpen(false)} // This will close the drawer when you click outside the drawer
          PaperProps={{ sx: { backgroundColor: "#404040" }  }} // Set the background color in the drawer itself
        >
          <div>
            <List>

              <ListItem button onClick={() => handleItemClick('calendarDisplay')}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Interactive Calendar" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem> 

              <ListItem button onClick={() => handleItemClick('dataLines')}>
                <Link to="/data-lines" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Data Lines" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => handleItemClick('distance')}>
                <Link to="/distance-arithmetic" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Distance Arithmetic" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => handleItemClick('incomplete')}>
                <Link to="/incomplete-dates" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Solve Incomplete Dates" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => handleItemClick('tempCycles')}>
                <Link to="/temporal-cycles" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Temporal Cycles" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => handleItemClick('mayaNumerology')}>
                <Link to="/maya-numerology" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Maya Numerology" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>     

              <ListItem button onClick={() => handleItemClick('dateDiffs')}>
                <Link to="/datediffs" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Date Differences" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => setSubListOpen(!subListOpen)}>
                <ListItemText primary="Advanced" primaryTypographyProps={ dropdownStyle } />
                {subListOpen ? <ExpandLess sx={{ color: '#000000' }}/> : <ExpandMore sx={{ color: '#ebeb00' }}/>}
              </ListItem>

              {/* This will be a dropdown within the drawer to show other, more advanced options */}
              <Collapse in={subListOpen} timeout="auto" unmountOnExit>
                <List>

                  <ListItem button onClick={() => handleItemClick('dayStations')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/819-day-stations" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="819 Day Stations" primaryTypographyProps={ subListItemStyle }/>
                    </Link>  
                  </ListItem>

                  <ListItem button onClick={() => handleItemClick('serpent')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/serpent-numbers" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="Serpent Numbers" primaryTypographyProps={ subListItemStyle }/>
                    </Link>
                  </ListItem>

                  <ListItem button onClick={() => handleItemClick('ring')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/ring-numbers" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="Ring Numbers" primaryTypographyProps={ subListItemStyle }/>
                    </Link>
                  </ListItem> 

                  <ListItem button onClick={() => handleItemClick('deeptime')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/deeptime" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="Deep Time" primaryTypographyProps={ subListItemStyle }/>
                    </Link>
                  </ListItem>

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
        {/*}
        <SettingsTab 
          open={settingsOpen}
          correlation={correlation}
          names={names}
          changeCorrelation={setCorrelation}
          changeNames={setNames}
          changeopen={() => setSettingsOpen(!settingsOpen)}
        />

        <HelpTab open={helpOpen} changeopen={setHelpOpen(!helpOpen)} /> 
        <InfoTab open={infoOpen} changeopen={setInfoOpen(!infoOpen)} /> 
               */}

      </div>
    );
  //}
}

/*
Navigation.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
    changeCorrelation: PropTypes.func.isRequired,
    changeNames: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
*/

//export default Navigation;