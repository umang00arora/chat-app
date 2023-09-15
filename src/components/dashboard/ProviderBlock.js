import React, { useState } from 'react'
import { auth } from '../../misc/firebase'
import { Button, Tag, useToaster,Notification } from 'rsuite'
import { Icon } from '@rsuite/icons';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import firebase from 'firebase/compat/app';


const ProviderBlock = () => {


  const toaster = useToaster();

    const message = (
      <Notification type='error' header="You can not disconnect" closable duration={3000}></Notification>
    );
    const diconnectMsg = (
      <Notification type='success' header="Disconnected" closable duration={3000}></Notification>
    );
    const connectMsg = (
      <Notification type='success' header="Connected" closable duration={3000}></Notification>
    );

    const [isConnected,setIsConnected]=useState({
        'google.com':auth.currentUser.providerData.some((data) => data.providerId === 'google.com'),
        'facebook.com':auth.currentUser.providerData.some((data) => data.providerId === 'facebook.com')
    })

    const updateIsConnected = (providerId , value) => {
      setIsConnected(p=>{
        return{
          ...p,
          [providerId]: value
        }
      })
    }

    const unlink = async (providerId) => {
      try {
        if(auth.currentUser.providerData.length === 1){
          throw new Error(`You can not disconnect from ${providerId}`)
        }
        await auth.currentUser.unlink(providerId);
        updateIsConnected(providerId , false)
        toaster.push(diconnectMsg)
      } catch (error) {
        toaster.push(message)
      }
    }

    const unlinkFacebook = () => {
      unlink('facebook.com')
    }
    const unlinkGoogle = () => {
      unlink('google.com')
    }

    const link = async (provider) => {
      try {
        await auth.currentUser.linkWithPopup(provider)
        updateIsConnected(provider.providerId, true)
        toaster.push(connectMsg)
      } catch (error) {
        
      }
    }

    const linkFacebook = () => {
      link(new firebase.auth.FacebookAuthProvider())
    }
    const linkGoogle = () => {
      link(new firebase.auth.GoogleAuthProvider())
    }

  return (
    <div>
      {isConnected['google.com'] && (
      <Tag color='green' closable onClose={unlinkGoogle}>
        <Icon as={AiFillGoogleCircle}/> Connected
      </Tag>
      )}
      {isConnected['facebook.com'] && (
      <Tag color='blue' closable onClose={unlinkFacebook}>
        <Icon as={BsFacebook}/> Connected
      </Tag>
      )}
      <div className='mt-2'>
        {!isConnected['google.com'] && (
        <Button block appearance='primary' color='green' onClick={linkGoogle}>
        <Icon as={AiFillGoogleCircle}/>Link to Google
        </Button>
        )}
        {!isConnected['facebook.com'] && (
        <Button block appearance='primary' onClick={linkFacebook}>
        <Icon as={BsFacebook}/>Link to Facebook
        </Button>
        )}
      </div>
    </div>
  )
}

export default ProviderBlock