import React from 'react'
import { Badge, IconButton, Tooltip, Whisper } from 'rsuite'
import { Icon } from '@rsuite/icons';
import { BsSuitHeartFill} from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai'

const ConditionalBadge = ({condition, children}) => {
    return condition?<Badge content={condition}>{children}</Badge> : children
}
const IconBtnControl = ({isVisible, iconName, tooltip, onClick, badgeContent, ...props}) => {
  return (
    <div className='ml-2' style={{visibility: isVisible?'visible':'hidden'}}>
      <ConditionalBadge condition={badgeContent}>
        <Whisper placement='top' delay={0} delayClose={0} delayOpen={0} trigger="hover" speaker={<Tooltip>{tooltip}</Tooltip>}> 
        <IconButton {...props} onClick={onClick} circle size='xs' icon={iconName==='heart'?<Icon as={BsSuitHeartFill} {...props}/>:<Icon as={AiOutlineDelete} {...props}/>}/>
        </Whisper>
      </ConditionalBadge>
    </div>
  )
}

export default IconBtnControl
