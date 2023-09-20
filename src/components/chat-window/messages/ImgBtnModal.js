import React from 'react'
import { useModalState } from '../../../misc/custom-hooks'
import { Modal } from 'rsuite'

const ImgBtnModal = ({ src, filename}) => {
  const {isOpen,open,close} = useModalState()
    return (
    <>
     <input type="image" alt={filename} src={src} onClick={open} className='mw-100 mh-100 w-auto'/>
     <Modal open={isOpen} onClose={close}>
        <Modal.Header>
            <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <img src={src} alt={filename} height="100%" width="100%"/>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <a href={src} target='_blank' rel='noopener noreferrer'>View Original</a>
        </Modal.Footer>
     </Modal> 
    </>
  )
}

export default ImgBtnModal
