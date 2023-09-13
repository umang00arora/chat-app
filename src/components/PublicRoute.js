import React from 'react';
import { Navigate, Route } from 'react-router';
//import { Routes } from 'react-router';
import Home from '../pages/Home';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

const PublicRoute = ({children , ...routeProps}) => {

    const {profile , isLoading}=useProfile();

    if(isLoading && !profile){
      return <Container>
        <Loader center vertical size='md' content='loading' speed='slow'/>
      </Container>
    }
    

    if(profile && !isLoading){
        return <Navigate to='/'/>
    }


  return (
    <>
        {children}
    </>
  )
}

export default PublicRoute
