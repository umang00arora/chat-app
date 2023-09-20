import React from 'react'
import { Button, InputGroup, Modal, Uploader, useToaster, Notification } from 'rsuite'
import {Icon} from '@rsuite/icons'
import {ImAttachment} from 'react-icons/im'
import { useModalState } from '../../../misc/custom-hooks'
import { useState } from 'react'
import { storage } from '../../../misc/firebase'
import { useParams } from 'react-router-dom'

const MAX_FILE_SIZE = 1000 * 1024 * 5
const AttachmentBtn = ({afterUpload}) => {
  const toaster = useToaster();
    const message = (
      <Notification type='error' header="Error" closable duration={3000}>
        
      </Notification>
    );
  const {chatId} = useParams();
    const {isOpen,open,close} = useModalState()
    const [fileList, setFileList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const onChange = (fileArr) => {
        const filtered = fileArr.filter(el=>el.blobFile.size <= MAX_FILE_SIZE).slice(0,5)
        setFileList(filtered)
    }
    const onUpload = async() =>{
      setIsLoading(true)
      try {
        const uploadPromises = fileList.map(f=>{
          return storage.ref(`/chat/${chatId}`).child(Date.now() + f.name).put(f.blobFile, {cacheControl: `public, max-age=${3600 * 24 * 3}`})
        })
        const uploadSnapshots = await Promise.all(uploadPromises)
        const shapePromises = uploadSnapshots.map(async snap => {
          return {
            contentType: snap.metadata.contentType,
            name: snap.metadata.name,
            url: await snap.ref.getDownloadURL()
          }
        })
        const files =await Promise.all(shapePromises)
        await afterUpload(files)
        setIsLoading(false)
        close()
      } catch (error) {
        setIsLoading(false)
        toaster.push(message) 
      }
    }
  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon as={ImAttachment}/>
      </InputGroup.Button>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
            <Modal.Title>
                Upload Files
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Uploader 
        autoUpload={false}
        action=""
        onChange={onChange}
        fileList={fileList}
        multiple
        listType='picture-text'
        className='w-100'
        disabled={isLoading}
      />
        </Modal.Body>
        <Modal.Footer>
            <Button block onClick={onUpload} disabled={isLoading}>
                Send to Chat
            </Button>
            <div className='text-right mt-2'>
                <small>* only files less than 5mb are allowed</small>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AttachmentBtn
