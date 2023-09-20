import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, database } from '../../../misc/firebase'
import { transformToArrWithId } from '../../../misc/helper'
import MessageItem from './MessageItem'

const Messages = () => {
  const {chatId} = useParams()
  const [messages, setMessages]=useState(null)
  const isChatEmpty = messages && messages.length===0;
  const canShowMessages = messages && messages.length>0
  useEffect(() => {
    const messagesRef = database.ref('/messages')
    messagesRef.orderByChild('roomId').equalTo(chatId).on('value', (snap) => {
      const data = transformToArrWithId(snap.val())
      setMessages(data);
    })
    return ()=>{
      messagesRef.off('value')
    }
  },[chatId])

  const handleAdmin=useCallback(async (uid)=>{
    const adminsRef = database.ref(`rooms/${chatId}/admins`)
    await adminsRef.transaction(admins=>{
      if(admins){
        if(admins[uid]){
          admins[uid]=null
        }
        else{
          admins[uid]=true
        }
      }
      return admins
    })
  },[chatId])

  const handleLike = useCallback(async (msgId)=>{
    const {uid} = auth.currentUser;
    const messageRef = database.ref(`messages/${msgId}`)
    await messageRef.transaction(msg=>{
      if(msg){
        if(msg.likes && msg.likes[uid]){
          msg.likeCount-=1
          msg.likes[uid]=null
        }
        else{
          msg.likeCount+=1
          if(!msg.likes){
            msg.likes={}
          }
          msg.likes[uid]=true
        }
      }
      return msg
    })
  })

  const handleDelete = useCallback(async(msgId) => {
    if(!window.confirm('Delete this message ?')){
      return;
    }
    const isLast = messages[messages.length - 1].id === msgId
    const updates={}
    updates[`/messages/${msgId}`] = null
    if(isLast && messages.length>1){
      updates[`/rooms/${chatId}/lastMessage`]={
        ...messages[messages.length - 2],
        msgId: messages[messages.length - 2].id
      }
    }
    if(isLast && messages.length === 1){
      updates[`/rooms/${chatId}/lastMessage`]=null
    }
    try {
      await database.ref().update(updates)
    } catch (error) {
      
    }
  },[chatId,messages])

  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No Messages yet...</li>}
      {canShowMessages && messages.map(msg => <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} handleLike={handleLike} handleDelete={handleDelete}/>)}
    </ul>
  )
}

export default Messages
