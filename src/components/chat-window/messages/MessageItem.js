import React, {memo} from 'react'
import ProfileAvatar from '../../dashboard/ProfileAvatar'
import TimeAgo from 'react-timeago'
import ProfileInfoBtnModal from './ProfileInfoBtnModal'
import PresenceDot from '../../PresenceDot'
import { Button } from 'rsuite'
import { useCurrentRoom } from '../../../context/current-room.context'
import { auth } from '../../../misc/firebase'
import { useHover } from '../../../misc/custom-hooks'
import IconBtnControl from './IconBtnControl'

const MessageItem = ({message, handleAdmin, handleLike, handleDelete}) => {
  const [selfRef, isHover] = useHover()
  const {author,createdAt,text, likes, likeCount} = message
  const isAdmin = useCurrentRoom(v=>v.isAdmin)
  const admins = useCurrentRoom(v=>v.admins)
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)
    return (
    <li className={`padded mb-1 cursor-pointer ${isHover?'bg-black-02':''}`} ref={selfRef}>
      <div className='d-flex align-items-center font-bolder mb-1'>
        <PresenceDot uid={author.uid}/>
        <ProfileAvatar src={author.avatar} name={author.name} className='ml-1' size="xs"/>
        <ProfileInfoBtnModal profile={author} appearence="link" className='p-0 ml-1 text-black'>
          {canGrantAdmin &&
          <Button block onClick={()=>handleAdmin(author.uid)} appearance='primary'>
            {isMsgAuthorAdmin? 'Remove Admin' : "Give Admin rights"}
          </Button>
          }
        </ProfileInfoBtnModal>
        <TimeAgo date={createdAt} className='font-normal text-black-45 ml-2'/>
        <IconBtnControl
        {...(isLiked ? {color: 'red'} : {})}
        isVisible
        iconName="heart"
        tooltip="Like This Message"
        onClick={()=>handleLike(message.id)} 
        badgeContent={likeCount}
        />
        {
          isAuthor && 
          <IconBtnControl
          isVisible
          iconName="close"
          tooltip="Delete This Message"
          onClick={()=>handleDelete(message.id)} 
          />
        }
      
      </div>

      <div>
        <span className='word-break-all'>{text}</span>
      </div>
    </li>
  )
}

export default memo(MessageItem)
