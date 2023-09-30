import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import StatelessEjemplo from './componentesReact/Stateless';
import StatefulEjemplo from './componentesReact/Stateful';
import HolaMundoExtendedScript from './componentesReact/HolaMundoExtendedScript';
import ButtonEjemplo1 from './componentesReact/Button';
import ButtonEjemplo2 from './componentesReact/Button';
import GetGreeting from './componentesReact/GetGreeting';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StatelessEjemplo />
    <StatefulEjemplo />
    <HolaMundoExtendedScript />
    <ButtonEjemplo1 />
    <ButtonEjemplo2 />
    <GetGreeting />
  </React.StrictMode>
);

reportWebVitals();
