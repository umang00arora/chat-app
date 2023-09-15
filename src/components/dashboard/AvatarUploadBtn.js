import React, { useState , useRef } from 'react'
import { Button, Modal, useToaster, Notification } from 'rsuite'
import {useModalState} from '../../misc/custom-hooks'
import AvatarEditor from 'react-avatar-editor'
import { useProfile } from '../../context/profile.context';
import { database, storage } from '../../misc/firebase';
import ProfileAvatar from './ProfileAvatar';

const fileInputTypes =".png, .jpeg, .jpg";
const acceptedFiles = ['image/png' , 'image/jpeg' , 'image/pjpeg' , 'image/jpg'];
const isValidFile = (file) => acceptedFiles.includes(file.type)
const getBlob = (canvas) =>{
    return new Promise((resolve,reject)=>{
        canvas.toBlob((blob)=>{
            if(blob){
                resolve(blob);
            } else {
                reject(new Error('File Process Error'));
            }
        })
    })
}
const AvatarUploadBtn = () => {
    const toaster = useToaster();
    const message = (
      <Notification type='warning' header="Wrong file type !!" closable duration={3000}></Notification>
    );
    const avtUpld = (
        <Notification type='success' header="Avatar Uploaded" closable duration={3000}></Notification>
      );
    const err = (
        <Notification type='error' header="Error in Uploading !!" closable duration={3000}></Notification>
    );

    const {profile} = useProfile();
    const [isLoading,setIsLoading]=useState(false)
    const {isOpen,open,close} = useModalState()
    const[image,setImage]=useState(null)
    const avatarEditorRef=useRef();
    const onFileInputChange =(ev)=> {
        const currFiles = ev.target.files;
        if(currFiles.length === 1){
            const file = currFiles[0];
            if(isValidFile(file)){
                setImage(file)
                open();
            }else{
                toaster.push(message)
            }
        }
    }
    const onUploadClick = async () =>{
        const canvas=avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true)
        try {
            const blob = await getBlob(canvas)
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');
            const uploadAvatarResult = await avatarFileRef.put(blob,{
                cacheControl: `public, max-age=${3600*24*3}`
            })
            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()
            const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar')
            userAvatarRef.set(downloadUrl)
            setIsLoading(false)
            toaster.push(avtUpld)
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
            toaster.push(err)
        }
    }
  return (
    <div className='mt-3 text-center'>
        <ProfileAvatar src={profile.avatar} name={profile.name} className='width-200 height-200 img-fullsize font-huge'/>
      <div>
        <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
            Select New Avatar
            <input id='avatar-upload' type='file' className='d-none' accept={fileInputTypes} onChange={onFileInputChange}/>
        </label>

        <Modal open={isOpen} onClose={close}> 
          <Modal.Header>
            <Modal.Title>
                Adjust and Upload new Avatar
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex justify-content-center align-items-center h-100'>
            {image && 
            <AvatarEditor
            ref={avatarEditorRef}
            image={image}
            width={200}
            height={200}
            border={10}
            borderRadius={100}
            rotate={0}
          />}
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance='ghost' block disabled={isLoading} onClick={onUploadClick}>
            Upload New Avatar
            </Button>  
          </Modal.Footer>    
        </Modal> 

      </div>
    </div>
  )
}

export default AvatarUploadBtn
