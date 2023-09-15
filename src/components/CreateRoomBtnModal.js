import React, { useCallback, useRef, useState } from 'react'
import { Button, Form, Modal, Input, Schema, useToaster,Notification } from 'rsuite'
import { Icon } from '@rsuite/icons';
import { } from 'react-icons/io5';
import { useModalState } from '../misc/custom-hooks';
import firebase from 'firebase/compat/app';
import { database } from '../misc/firebase';


const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const {StringType} = Schema.Types;
const model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description: StringType().isRequired('Description is required')
})
const INITIAL_FORM = {
    name: '',
    description: ''
}
const CreateRoomBtnModal = () => {
    const toaster = useToaster();

    const message = (
      <Notification type='error' header="Room Not Created !!" closable duration={3000}></Notification>
    );
    const roomCre = (
        <Notification type='success' header="Room Created !!" closable duration={3000}></Notification>
      );
  const {isOpen,open,close} = useModalState();
  const [formValue,setFormValue]=useState(INITIAL_FORM)
  const [isLoading,setIsLoading] = useState(false)
  const formRef=useRef()
  const onFormChange =useCallback(value=>{
    setFormValue(value)
  },[])

  const onSubmit = async () => {
    if(!formRef.current.check()){
        console.log('empty')
        return;
    }

    setIsLoading(true)

    const newRoomData ={ 
        ...formValue,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    }

    try {
        await database.ref('rooms').push(newRoomData)
        setIsLoading(false)
        setFormValue(INITIAL_FORM)
        close()
        toaster.push(roomCre)
    } catch (error) {
        setIsLoading(false)
        toaster.push(message)
    }
  }

    return (
    <div className='mt-2'>
      <Button appearance='primary' block color='green' onClick={open}>
        <Icon/> Create new Chat Room
      </Button>

      <Modal open={isOpen}>
        <Modal.Header>
        <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
                <Form.Group>
                    <Form.ControlLabel>Room Name</Form.ControlLabel>
                    <Form.Control name='name' placeholder='Enter Room Name...'/>
                </Form.Group>

                <Form.Group>
                    <Form.ControlLabel>Room Description</Form.ControlLabel>
                    <Form.Control accepter={Textarea} name='description' placeholder='Enter Room Description...' rows={5}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button appearance='primary' block onClick={onSubmit} disabled={isLoading}>
                Create New Room
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateRoomBtnModal
