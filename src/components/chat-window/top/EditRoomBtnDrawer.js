import React, {memo} from 'react'
import { Button, Drawer, useToaster, Notification } from 'rsuite'
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks'
import EditableInput from '../../dashboard/EditableInput'
import { useCurrentRoom } from '../../../context/current-room.context'
import { useParams } from 'react-router-dom'
import { database } from '../../../misc/firebase'

const EditRoomBtnDrawer = () => {
    const toaster = useToaster();

    const message = (
      <Notification type='error' header="Error!!" closable duration={3000}></Notification>
    );
    const succMessage = (
        <Notification type='success' header="Updated !!" closable duration={3000}></Notification>
      );
  const {isOpen,open,close} = useModalState()
  const isMobile = useMediaQuery('(max-width: 992px)')
  const {chatId} = useParams()
  const name=useCurrentRoom(v=>v.name)
  const description=useCurrentRoom(v=>v.description)
  const updateData=(key,value)=>{
    database.ref(`rooms/${chatId}`).child(key).set(value).then(()=>{
        toaster.push(succMessage)
    }).catch(()=>{
        toaster.push(message)
    })
  }
  const onNameSave=(newName)=>{
    updateData('name', newName)
  }
  const onDescriptionSave=(newDesc)=>{
    updateData('description', newDesc)
  }
    return (
    <div>
      <Button appearance='primary' className='br-circle' size='sm' color='red' onClick={open}>
        A
      </Button>
      <Drawer open={isOpen} onClose={close} placement='right' size={isMobile?'full':'sm'}>
        <Drawer.Header>
            <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
            <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className='mb-2'>Name</h6>}
            emptyMsg='Name can not be empty'/>

            <EditableInput
            as="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            emptyMsg='Description Can not be empty'
            wrapperClassName='mt-3'/>
            <Button appearance='primary' block onClick={close} className='mt-3'>Close</Button>
        </Drawer.Body>
        </Drawer>
    </div>
  )
}

export default memo(EditRoomBtnDrawer)
