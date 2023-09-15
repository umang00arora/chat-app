import React, { useCallback } from 'react'
import { Button, Drawer, Notification , useToaster} from 'rsuite'
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {

    const {isOpen , open , close} =useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)')
    const toaster = useToaster();

    const message = (
      <Notification type='info' header="Signed Out" closable duration={3000}>
        
      </Notification>
    );
    const onSignOut = useCallback(
      () => {
        auth.signOut();

        toaster.push(message)

        close();
      },
      [close],
    )
    
  return (
    <>
        <Button block appearance="primary" startIcon={<UserBadgeIcon/>} onClick={open}>Dashboard</Button>
        <Drawer size={isMobile?'full':'sm'} open={isOpen} onClose={close} placement='left'>
            <Dashboard onSignOut={onSignOut}/>
        </Drawer>
    </>
  )
}

export default DashboardToggle
