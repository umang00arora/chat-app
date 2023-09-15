import React from 'react'
import { Button, Col, Container, Grid, Panel, Row, Message, Notification, useToaster } from 'rsuite';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import  {auth, database}  from '../misc/firebase';
import firebase from 'firebase/compat/app';
//import Alert from '../components/Alert';

const SignIn = () => {
    const toaster = useToaster();

    const message = (
      <Notification type='info' header="Signed In" closable duration={3000}>
        
      </Notification>
    );

    const signInWithProvider= async (provider)=>{
       
       try {
        const {additionalUserInfo,user} = await auth.signInWithPopup(provider);
        if(additionalUserInfo.isNewUser){
            await database.ref(`/profiles/${user.uid}`).set({
                name: user.displayName,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            })
        }
        toaster.push(message)
       } catch (error) {
        <Message type="error">Login Failed , {error.Message}</Message>
       }
       
    }
    const signInWithGoogle =() =>{
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }
    const signInWithFacebook=()=>{
        signInWithProvider(new firebase.auth.FacebookAuthProvider())
    }


  return (
    <Container>
        <Grid className='mt-page'>
            <Row>
                <Col xs={24} md={12} mdOffset={6}>
                  <Panel>
                    <div className='text-center'>
                        <h2>Welcome to chat</h2>
                        <p>Please Login to Continue ...</p>
                    </div>

                    <div className='mt-3'>
                        <Button color="red" block appearance="primary" startIcon={<GooglePlusCircleIcon />} onClick={signInWithGoogle}>
                            Sign In with Google Plus
                        </Button>
                        <Button block color="blue" appearance="primary" startIcon={<FacebookOfficialIcon />} onClick={signInWithFacebook}>
                            Sign in with Facebook
                        </Button>
                    </div>
                  </Panel>
                </Col>
            </Row>
        </Grid>
    </Container>
  )
}

export default SignIn
