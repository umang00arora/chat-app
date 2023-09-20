import React from 'react'
import { InputGroup, useToaster, Notification } from 'rsuite'
import {Icon} from '@rsuite/icons'
import {BsFillMicFill} from 'react-icons/bs'
import { ReactMic } from 'react-mic'
import { useState } from 'react'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../../../misc/firebase'

const AudioMsgBtn = ({afterUpload}) => {
    const [isRecording, setIsRecording] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const toaster = useToaster();
    const message = (
      <Notification type='error' header="Error" closable duration={3000}>
        
      </Notification>
    );
    const {chatId} = useParams();
    const onClick = useCallback(()=>{
        setIsRecording(p=>!p)
    })
    const onUpload = useCallback(async (data)=>{
        setIsUploading(true)
        try {
            const snap = await storage.ref(`/chat/${chatId}`).child(`audio_${Date.now()}.mp3`).put(data.blob, {cacheControl: `public, max-age=${3600 * 24 * 3}`})

            const file ={
                contentType: snap.metadata.contentType,
            name: snap.metadata.name,
            url: await snap.ref.getDownloadURL()
            }
            afterUpload([file])
            setIsUploading(false)
        } catch (error) {
            setIsUploading(false)
            toaster.push(message)
        }
    },[afterUpload, chatId])
  return (
    <div>
      <InputGroup.Button onClick={onClick} disabled={isUploading} className={isRecording?'animate-blink':''}>
        <Icon as={BsFillMicFill}/>
      </InputGroup.Button>

      <ReactMic
      record={isRecording}
      className='d-none'
      onStop={onUpload}
      mimeType='audio/mp3'
      />
    </div>
  )
}

export default AudioMsgBtn
