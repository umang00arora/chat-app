import React from 'react'
import {Grid, Col, Row } from 'rsuite'
import SideBar from '../../components/SideBar'
import { RoomsProvider } from '../../context/rooms.context'
import { Route, Routes, useMatch } from 'react-router-dom'
import Chat from './Chat'
import { useMediaQuery } from '../../misc/custom-hooks'

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const isExact = useMatch('/')
  const canRenderSideBar = isDesktop || isExact;
  return (
    <RoomsProvider>
    <Grid fluid className="h-100">
      <Row className="h-100">
        {canRenderSideBar &&
        <Col xs={24} md={8} className="h-100">
          <SideBar/>
        </Col>
        }

        <Routes>
          <Route exct path="/chat/:chatId" element={
            <Col xs={24} md={16} className='h-100'>
            <Chat/>
            </Col>
          }/>
          <Route path="*" element={
            isDesktop && (
              <Col xs={24} md={16} className='h-100'>
                <h2 className='text-center mt-page'>BABBLE IT OUT</h2>
                <h6 className='text-center '>... Please select a Chat ...</h6>
              </Col>
            )
          }/>
        </Routes>
      </Row>
    </Grid>
    </RoomsProvider>
  )
}

export default Home

