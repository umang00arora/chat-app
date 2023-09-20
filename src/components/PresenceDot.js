import React from 'react'
import { usePresence } from '../misc/custom-hooks'
import { Badge, Whisper, Tooltip } from 'rsuite'

const getColor = (presence) => {
    if(!presence){
        return 'gray'
    }

    switch(presence.state){
        case 'online':
            return 'green'
        case 'offline':
            return 'red'
        default:
            return 'gray'
    }
}

const getText = (presence) => {
    if(!presence){
        return 'Unknown State'
    }

    return presence.state === 'online' ? "Online":`Last Online on ${new Date(presence.last_changed).toLocaleDateString()}`
}


const PresenceDot = ({uid}) => {
    const presence = usePresence(uid)
  return (
    <Whisper placement="top" controlId="control-id-hover" trigger="hover" 
      speaker={ <Tooltip>
        {getText(presence)}
      </Tooltip>}>
        <Badge className='cursor-pointer' style={{backgroundColor: getColor(presence)}}/>
    </Whisper>

  )
}

export default PresenceDot
