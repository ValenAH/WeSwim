import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import HolaMundoExtendedScript from './componentesReact/HolaMundoExtendedScript';
import Button from './componentesReact/Button';
import GetGreeting from './componentesReact/GetGreeting';
import reportWebVitals from './reportWebVitals';
import Statefulejemplo from './componentesReact/Stateful1';
import StatelessEjemplo from './componentesReact/Stateless';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Statefulejemplo/>
    <StatelessEjemplo/>
   <HolaMundoExtendedScript/>
   <Button/>
   <GetGreeting/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
