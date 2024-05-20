// Import components and support libraries
import React from 'react';
//import { useState } from 'react';
//import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the various pages
import Navigation from         './Navigation/Navigation.js';

/*
import DateDiffs from          './Pages/DateDiffs/DateDiffs.js';
import FullDisplay from        './Pages/CalendarDisplay/FullDisplay.js';
import DataLines from          './Pages/DataLines/DataLines.js';
import Incomplete from         './Pages/IncompleteDates/Incomplete.js';
import DistanceArithmetic from './Pages/DistanceArithmetic/DistanceArithmetic.js';
import TemporalCycles from     './Pages/TemporalCycles/TemporalCycles.js';
import DayStations from        './Pages/DayStations/DayStations.js';
import MayaNumerology from     './Pages/MayaNumerology/MayaNumerology.js';
import SerpentNumbers from     './Pages/SerpentNumbers/SerpentNumbers.js';
import RingNumbers from        './Pages/RingNumbers/RingNumbers.js';
import DeepTime from           './Pages/DeepTime/DeepTime.js';
*/


export default function App(){

  return ( 
    <BrowserRouter>

      <div className="App">

        <Navigation />

{/*}
        <Routes>
            <Route path="/" exact component={ FullDisplay } />
            <Route path="/maya-numerology" component={ MayaNumerology } />
        </Routes>
  */}

      </div>
    </BrowserRouter>
    );
}



//class App extends Component {



  /*
  constructor(props) {
    super(props);
    this.state = {
      correlation: 584283,
      names: 'yucatec',
    }
    
    // There are really only two things that can change at this level: correlation factor and name style
    this.handleCorrelationChange = this.handleCorrelationChange.bind(this);
    this.handleNamesChange = this.handleNamesChange.bind(this);
  }

  // Handle the changes when the user selects them
  handleCorrelationChange(correlation) { 
    this.setState({ 
      correlation: correlation, 
    }, () => this.setState({
      state: this.state
    })); 
  }

  handleNamesChange(names) { 
    this.setState({ 
      names: names, 
    }, () => this.setState({
      state: this.state
    })); 
  }


  // Now define the routes between pages
  // Notice that we don't include the "top dots" in this list since they aren't pages reached via routes, just dialog pop-ups 
  //render() {

    return ( 
      <HashRouter>
        <Routes>

            <Route path="/" element={ <Navigation /> } >
              <Route path="/maya-numerology" element={ <MayaNumerology /> } />
            </Route>

          {/*
          <Route path="/" element={
            <Navigation 
              correlation={correlation}
              names={names}
              changeCorrelation={(cor) => setCorrelation(cor)}
              changeNames={(names) => setNames(names)}
            >
              <FullDisplay 
                correlation={correlation}
                names={names}
              />
            </Navigation>}
          />

          <Route path="/data-lines" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >        
              <DataLines 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />

          <Route path="/incomplete-dates" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >        
              <Incomplete 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />

          <Route path="/distance-arithmetic" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <DistanceArithmetic 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />

          <Route path="/temporal-cycles" element={
            <Navigation 
              correlation={correlation}
              names={names}
              changeCorrelation={(cor) => setCorrelation(cor)}
              changeNames={(names) => setNames(names)}
            >   
              <TemporalCycles 
                correlation={correlation}
              />
            </Navigation>}
          />

          <Route path="/maya-numerology" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <MayaNumerology />
            </Navigation>}
          />

          <Route path="/819-day-stations" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <DayStations 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />

          <Route path="/ring-numbers" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <RingNumbers 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />

          <Route path="/serpent-numbers" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <SerpentNumbers 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />      

          <Route path="/datediffs" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <DateDiffs 
                names={this.state.names}
                correlation={this.state.correlation}
              />
            </Navigation>}
          />
      
          <Route path="/deeptime" element={
            <Navigation 
              correlation={this.state.correlation}
              names={this.state.names}
              changeCorrelation={(cor) => this.handleCorrelationChange(cor)}
              changeNames={(names) => this.handleNamesChange(names)}
            >   
              <DeepTime 
                correlation={this.state.correlation}
                names={this.state.names}
              />
            </Navigation>}
          />



        </Routes>
      </HashRouter>
    );
  //}
}
          */
//App.propTypes = {
  // Placeholders for props needed, none right now
  // classes: PropTypes.object.isRequired,
//};

//export default App;