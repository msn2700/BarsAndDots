// This is a very simple javascript that loads the App into the page

// Import components and support libraries
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

// This is the new way to do this in React 18
const container = document.getElementById('index');
const root = createRoot(container);
root.render(<App />);

// Load the main app into the HTML element designated 'index'
// This is the old way, changed in React 18
// ReactDOM.render(<App />, document.getElementById('index'));
