// Import components and other support libraries
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Help, Info, Menu, Cancel, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, Typography, Divider, IconButton, AppBar, Toolbar, Grid, Collapse } from '@mui/material';
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


class Navigation extends React.Component {
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


  // Handle the event when the user clicks on one of the page links
  handleItemClick(item) {

    // First, change the state of the drawer so it will close when we navigate away / follow a link
    this.setState({ drawerOpen: false})

    // Now handle each navigation route separately
    switch(item) {
      case ('calendarDisplay'):
        this.setState({ content: <FullDisplay correlation={this.props.correlation} names={this.props.names}
            lcd={getLCDFromJDN(changeToJDN(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()), this.props.correlation)}
            />});
        break;
      case ('dataLines'): 
        this.setState({ content: <DataLines correlation={this.props.correlation} names={this.props.names}/>});
        break;
      case ('distance'): 
        this.setState({ content: <DistanceArithmetic correlation={this.props.correlation} names={this.props.names}/>});
        break;
      case ('incomplete'):
        this.setState({ content: <Incomplete correlation={this.props.correlation} names={this.props.names}/>});
        break;
      case ('tempCycles'):
        this.setState({ content: <TemporalCycles correlation={this.props.correlation}/>});
        break;
      case ('mayaNumerology'):
        this.setState({ content: <MayaNumerology />});
        break;
      case ('dayStations'):
        this.setState({ content: <DayStations correlation={this.props.correlation} names={this.props.names}/>});
        break;
      case ('serpent'):
        this.setState({ content: <SerpentNumbers correlation={this.props.correlation} names={this.props.names} />});
        break;
      case ('ring'):
        this.setState({ content: <RingNumbers correlation={this.props.correlation} names={this.props.names} />});
        break;
      case ('dateDiffs'):
        this.setState({ content: <DateDiffs names={this.props.names} correlation={this.props.correlation}/>});
        break;
      case ('deeptime'):
        this.setState({ content: <DeepTime names={this.props.names} correlation={this.props.correlation}/>});
        break;

      // These are the "top dots" on the toolbar menu; when clicked change the state to open 
      case ('settings'):
        this.setState({ settingsOpen: true, });
        break;
      case ('help'):
        this.setState({ helpOpen: true, });
        break;  
      case ('info'):
        this.setState({ infoOpen: true, });
        break;

    }
  }

  // Handle the "top dots" pop-ups at the top of the navigation page
  changeSettingsOpen(value) { this.setState({ settingsOpen: value, }); }
  changeHelpOpen(value) {     this.setState({ helpOpen:     value, }); }
  changeInfoOpen(value) {     this.setState({ infoOpen:     value, }); }
  
  // Handle the drawer opening / closing
  handleDrawerOpen()  { this.setState({ drawerOpen:  true,   }); }
  handleDrawerClose() { this.setState({ drawerOpen:  false,  }); }
  handleSubListClick(){ this.setState({ subListOpen: !this.state.subListOpen })}

  render() {

    return(

      <div>

        {/* This is the fixed bar on top that never moves, with title, "top dots" and hamburger menu */}
        <AppBar style={{ position: 'static', background: '#042104' }} >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

            {/* The nav bar is like a sandwich of elements: spacer box | image | title | spacer box | top dots */}

            <Box sx={{ width: 400 }} />
            <img src={ BannerImage } />
            <Typography variant="h4" style={{ color: '#ebeb00' }}><b>Bars and Dots</b></Typography>
            <Box sx={{ width: 250 }} />

            <List>
              <ListItem>
                <IconButton onClick={ () => this.handleItemClick('info')     } sx={{ color: '#ffffff' }}><Info /></IconButton>
                <IconButton onClick={ () => this.handleItemClick('help')     } sx={{ color: '#ffffff' }}><Help /></IconButton>
                <IconButton onClick={ () => this.handleItemClick('settings') } sx={{ color: '#ffffff' }}><Settings /></IconButton>
                <IconButton onClick={ this.handleDrawerOpen                  } sx={{ color: '#ffffff' }}><Menu /></IconButton>
              </ListItem>
            </List>
          
          </Toolbar>
        </AppBar>

        {/* This is the drawer that will slide out when the hamburger menu icon is clicked in the above toolbar */}
        <Drawer
          anchor="right" // Open the drawer from the right side, cannot be swiped though
          open={this.state.drawerOpen}
          onBackdropClick={this.handleDrawerClose} // This will close the drawer when you click outside the drawer
          PaperProps={{ sx: { backgroundColor: "#404040" }  }} // Set the background color in the drawer itself
        >
          <div>
            <List>

              <ListItem button onClick={() => this.handleItemClick('calendarDisplay')}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Interactive Calendar" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem> 

              <ListItem button onClick={() => this.handleItemClick('dataLines')}>
                <Link to="/data-lines" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Data Lines" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => this.handleItemClick('distance')}>
                <Link to="/distance-arithmetic" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Distance Arithmetic" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => this.handleItemClick('incomplete')}>
                <Link to="/incomplete-dates" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Solve Incomplete Dates" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => this.handleItemClick('tempCycles')}>
                <Link to="/temporal-cycles" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Temporal Cycles" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => this.handleItemClick('mayaNumerology')}>
                <Link to="/maya-numerology" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Maya Numerology" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>     

              <ListItem button onClick={() => this.handleItemClick('dateDiffs')}>
                <Link to="/datediffs" style={{ textDecoration: 'none' }}>
                  <ListItemText primary="Date Differences" primaryTypographyProps={ listItemStyle }/>
                </Link>
              </ListItem>

              <ListItem button onClick={() => this.handleSubListClick()}>
                <ListItemText primary="Advanced" primaryTypographyProps={ dropdownStyle } />
                {this.state.subListOpen ? <ExpandLess sx={{ color: '#000000' }}/> : <ExpandMore sx={{ color: '#ebeb00' }}/>}
              </ListItem>

              {/* This will be a dropdown within the drawer to show other, more advanced options */}
              <Collapse in={this.state.subListOpen} timeout="auto" unmountOnExit>
                <List>

                  <ListItem button onClick={() => this.handleItemClick('dayStations')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/819-day-stations" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="819 Day Stations" primaryTypographyProps={ subListItemStyle }/>
                    </Link>  
                  </ListItem>

                  <ListItem button onClick={() => this.handleItemClick('serpent')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/serpent-numbers" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="Serpent Numbers" primaryTypographyProps={ subListItemStyle }/>
                    </Link>
                  </ListItem>

                  <ListItem button onClick={() => this.handleItemClick('ring')} style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link to="/ring-numbers" style={{ textDecoration: 'none' }}>
                      <ListItemText primary="Ring Numbers" primaryTypographyProps={ subListItemStyle }/>
                    </Link>
                  </ListItem> 

                  <ListItem button onClick={() => this.handleItemClick('deeptime')} style={{display:'flex', justifyContent:'flex-end'}}>
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
          {this.props.children}
        </main>

        {/* Top dot items go here to handle changes related to these pop-ups */}
        <SettingsTab 
          open={this.state.settingsOpen}
          correlation={this.props.correlation}
          names={this.props.names}
          changeCorrelation={this.props.changeCorrelation}
          changeNames={this.props.changeNames}
          changeopen={this.changeSettingsOpen}
        />
        <HelpTab open={this.state.helpOpen} changeopen={this.changeHelpOpen} /> 
        <InfoTab open={this.state.infoOpen} changeopen={this.changeInfoOpen} /> 
       

      </div>
    );
  }
}

Navigation.propTypes = {
    correlation: PropTypes.number.isRequired,
    names: PropTypes.string.isRequired,
    changeCorrelation: PropTypes.func.isRequired,
    changeNames: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Navigation;