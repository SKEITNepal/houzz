import React, {
  lazy,
} from 'react';
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';
import Paths from "./paths";

//dynamic import of home page
const HomePage = lazy(() => import('Pages/Home'));


const Pages = (props) => {
  return ( 
  <BrowserRouter>
    <Routes> 
        <Route element = { <HomePage /> } path = {Paths.home} {...props}/> 
    </Routes> 
  </BrowserRouter>
  );
};

export default Pages;