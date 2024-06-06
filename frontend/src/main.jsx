import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import { Store } from './store/Store.js';
import {Provider} from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={Store}> 
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
</Provider> 

);
