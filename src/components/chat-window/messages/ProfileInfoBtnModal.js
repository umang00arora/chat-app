import React from 'react'
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar'

const ProfileInfoBtnModal = ({profile ,children, ...btnProps}) => {
    const shortName = profile.name.split(' ')[0];
    const {isOpen,open,close} = useModalState();
    const memberSince = new Date(profile.createdAt).toLocaleDateString()
  return (
    <>
      <Button onClick={open} {...btnProps}>
        {shortName}
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
            <Modal.Title>{shortName} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
        <ProfileAvatar src={profile.avatar} name={profile.name} className='width-200 height-200 img-fullsize font-huge'/>
        <h4 className='mt-2'>{profile.name}</h4>
        <p>Member since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
            <Button block onClick={close}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileInfoBtnModal
