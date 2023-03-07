
// Need to import React for the columnsDataGrid array (renderHeader property)
import * as React from 'react';

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
export { paperStyle, textboxStyle, columnsDataGrid, paperStela, paperData };