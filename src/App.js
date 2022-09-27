import React from 'react';
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import SSRProvider from 'react-bootstrap/SSRProvider';


function App() {
  return (
    <SSRProvider>
      <Routes />
    </SSRProvider>
  );
}

export default App;