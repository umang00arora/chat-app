import React from 'react';
import { Navigate, Route } from 'react-router';
//import { Routes } from 'react-router';
import Home from '../pages/Home';

const PrivateRoute = ({children , ...routeProps}) => {

    const profile=false;

    if(!profile){
        return <Navigate to='/signin'/>
    }


  return (
    <>
        {children}
    </>
  )
}

export default PrivateRoute
