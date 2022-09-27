import React from 'react';
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');

const root = createRoot(container); 
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);

export default root;