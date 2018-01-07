import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom' //BrowserRouter

 //Render the view into root element
ReactDOM.render((<BrowserRouter><App /></BrowserRouter>), document.getElementById('root')) 

