import React, { useCallback, useState } from 'react'
import { Input, InputGroup, Button, useToaster } from 'rsuite'
import {Icon} from '@rsuite/icons'
import { IoSendSharp } from 'react-icons/io5'
import firebase from 'firebase/compat/app'
import { useProfile } from '../../../context/profile.context'
import { useParams } from 'react-router-dom'
import { database } from '../../../misc/firebase'


function assembleMessage(profile,chatId){
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? {avatar: profile.avatar}:{})
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  }
}

const Bottom = () => {
  const [input, setInput] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const {profile} = useProfile();
  const {chatId} = useParams();
  const toaster = useToaster();

    const message = (
      <Notification type='error' header="Error!!" closable duration={3000}></Notification>
    );

  const onInputChange =useCallback((value)=>{
    setInput(value)
  },[])

  const onSendClick = async() =>{
    if(input.trim() === ''){
      return;
    }
    const msgData = assembleMessage(profile, chatId)
    msgData.text = input;

    const updates = {}

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`]=msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };
    
    setIsLoading(true);
    try {
      await database.ref().update(updates)
      setInput('')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      toaster.push(message)
    }
  }
  return (
    <div>
      <InputGroup>
        <Input placeholder='Write a new message here ...' value={input} onChange={onInputChange} onPressEnter={onSendClick}/>
        <InputGroup.Button color='blue' appearance="primary" onClick={onSendClick} disabled={isLoading}>
           <Icon as={IoSendSharp}/>
        </InputGroup.Button>
      </InputGroup>
    </div>
  )
}

export default Bottom
