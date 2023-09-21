import React, {memo} from 'react'
import { useCurrentRoom } from '../../../context/current-room.context'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { ButtonToolbar, Button} from 'rsuite';
import {Icon } from '@rsuite/icons'
import { Link } from 'react-router-dom';
import {useMediaQuery} from '../../../misc/custom-hooks'
import RoomInfoBtnModal from './RoomInfoBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';


const Top = () => {
    const name = useCurrentRoom(v => v.name)
    const isAdmin = useCurrentRoom(v=>v.isAdmin)
    const isMobile = useMediaQuery('(max-width: 992px)')
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className='text-disappear d-flex align-items-center'>
            <Link to='/' className='text-black'>
              <Icon as={AiOutlineArrowLeft} className={isMobile? 'd-inline-block p-0 mr-2 text-blue link-unstyled':'d-none'}/>
            </Link>
            <span className='text-disappear'>{name}</span>
        </h4>
        <ButtonToolbar className='ws-nowrap'>
          {isAdmin &&
        <EditRoomBtnDrawer/>
          }
        </ButtonToolbar>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <RoomInfoBtnModal/>
      </div>
    </div>
  )
}

export default memo(Top)
