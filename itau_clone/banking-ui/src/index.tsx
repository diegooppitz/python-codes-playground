import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/Base.scss';

// Adicionando ! para garantir que o elemento não será null
const rootElement = document.getElementById('root')!;

// Passando rootElement para createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals();