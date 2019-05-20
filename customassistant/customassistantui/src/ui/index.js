import React from 'react';
import {render} from 'react-dom';
import Dispatcher from './Components/Dispatcher'
import {BrowserRouter} from "react-router-dom";

render(<BrowserRouter><Dispatcher/></BrowserRouter>, document.getElementById('root'));