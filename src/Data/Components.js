// COMPONENTS, STYLES, MISC.
// This file will hold some of the various declarations and components that are used throughout
// the site, including specific styles, grid column data, etc.

// Need to import React for the columnsDataGrid array (renderHeader property)
import * as React from 'react';

// --- STYLES ----

// Create the array that holds style properties for <Paper>
const paperStyle = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
}

// Create the array that holds style properties for <Paper>
const paperStela = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    fontSize: '12px',
}

const paperData = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '15px',
}


// Define some style properties for the textbox to improve spacing
const textboxStyle ={
    marginTop: '8px', 
    marginBottom: '15px',
}

// Define some style properties for the items in the nav bar at the top
const navStyle ={
    marginTop: '10px', 
    backgroundColor: '#042104',
    textAlign: 'center',
    boxShadow: "none"
}

// Define some style properties for the top dots in the nav bar
const dotStyle ={
    marginTop: '10px', 
    marginBottom: '5px',
    backgroundColor: '#042104',
    textAlign: 'center',
    boxShadow: "none"
}

// Define some style properties for the items in the nav bar at the top
const bannerStyle ={
    marginTop: '7px', 
    backgroundColor: '#042104',
    boxShadow: "none",
    textAlign: 'center',
    paddingRight: '10px',
}

// Create the array that holds style properties for <Paper> in DayStations.js
const radioStyleDS = {
    backgroundColor: '#cccccc', 
    textAlign: 'left', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '15px',
    paddingRight: '5px',
}

// Create the array that holds style properties for <Paper> in TemporalCycles.js
const radioStyleTC = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '15px',
    paddingRight: '5px',
}

// Create a specialized style for the input box for RingNumbers.js
const paperStyleInput = {
    backgroundColor: '#cccccc', 
    textAlign: 'center', 
    marginTop: '15px',
    marginRight: '5px', // Added
    marginLeft: '5px',  // Added
    paddingTop: '10px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
}

// Create the arrays that hold style properties for <Button> in DistanceArithmetic.js
const calcButtonStyle = {
    backgroundColor: '#ebeb00',
    color: '#000000',
}
const buttonStyle = {
    justifyContent: 'center',
    backgroundColor: '#ebeb00',
    color: '#000000',
}

// ---- DATA GRID RELATED ----

// Create the data grid column names using the renderHeader() function, or we can us the headerName: property
const columnsDataGrid = [
    { field: 'id',          renderHeader: () => ( <strong>{'ID'}</strong> ),                type: 'number', width: 50, },
    { field: 'LCD',         renderHeader: () => ( <strong>{'LCD'}</strong> ),               type: 'number', width: 100, },
    { field: 'JDN',         renderHeader: () => ( <strong>{'JDN'}</strong> ),               type: 'number', width: 100, },
    { field: 'LongCount',   renderHeader: () => ( <strong>{'Long Count'}</strong> ),        type: 'number', width: 120, },
    { field: 'CR',          renderHeader: () => ( <strong>{'Calendar Round'}</strong> ),    type: 'number', width: 180, },
    { field: 'Lord',        renderHeader: () => ( <strong>{'Lord of the Night'}</strong> ), type: 'number', width: 170, },
    { field: 'Gregorian',   renderHeader: () => ( <strong>{'Gregorian'}</strong> ),         type: 'number', width: 200, },
    { field: 'Julian',      renderHeader: () => ( <strong>{'Julian'}</strong> ),            type: 'number', width: 200, },
];



// Declare the array to be exportable
export { paperStyle, textboxStyle, columnsDataGrid, paperStela, paperData, dotStyle,
    navStyle, bannerStyle, radioStyleDS, radioStyleTC, paperStyleInput, buttonStyle, calcButtonStyle };