import React from 'react'
import { useProfile } from '../../context/profile.context'
import { Button, Divider, Drawer,useToaster,Notification} from 'rsuite';
import EditableInput from './EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';

const Dashboard = ({onSignOut}) => {
  const {profile} = useProfile();
  const toaster = useToaster();

    const message = (
      <Notification type='success' header="Nickname Updated" closable duration={3000}></Notification>
    );
    const err = (
      <Notification type='error' header="Error" closable duration={3000}></Notification>
    );
  const onSave = async (newData) =>{
    const userNicknameRef = database.ref(`/profiles/${profile.uid}`).child('name');

    try {
      await userNicknameRef.set(newData);
      toaster.push(message)
    } catch (error) {
      toaster.push(err);
    }
  }
  return (
    <>
     <Drawer.Header>
      <Drawer.Title>
        Dashboard
      </Drawer.Title>
        <Drawer.Actions>
        <Button color="red" appearance="primary" onClick={onSignOut}>
        Sign Out
      </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock/>
        <Divider/>
        <EditableInput 
          name="nickname" 
          initialValue={profile.name} 
          onSave={onSave} 
          label={<h6 className='mb-2'>Nickname</h6>}
        />
        <AvatarUploadBtn/>
      </Drawer.Body>
      </>
  )
}

export default Dashboard
