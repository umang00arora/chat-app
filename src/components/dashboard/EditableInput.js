import React, { useCallback, useState } from 'react'
import { Input, InputGroup,useToaster,Notification } from 'rsuite'
import { Icon } from '@rsuite/icons';
import { IoCloseCircleSharp,IoBrush,IoCheckmark} from 'react-icons/io5';

const EditableInput = ({initialValue,onSave,label=null,placeholder="Write your value..",emptyMsg="Input is empty.",wrapperClassName='',...inputProps}) => {
    const toaster = useToaster();

    const message = (
      <Notification type='error' header="Empty value!!" closable duration={3000}></Notification>
    );
    const [input,setInput]=useState(initialValue)
    const [isEditable,setIsEditable]=useState(false);

    const onEditClick = useCallback(()=>{
        setIsEditable(p=>!p)
        setInput(initialValue)
    },[initialValue])

    const onSaveClick = async () =>{
        const trimmed = input.trim();

        if(trimmed===''){
            toaster.push(message);
        }

        if(trimmed !== initialValue){
            await onSave(trimmed);
        }

        setIsEditable(false);
    }

    const onInputChange = useCallback(
      (value) => {
        setInput(value)
      },
      [],
    )
    
  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
      <Input {...inputProps} placeholder={placeholder} onChange={onInputChange} value={input} disabled={!isEditable}/>
      <InputGroup.Button onClick={onEditClick}>
      <Icon as={isEditable?IoCloseCircleSharp:IoBrush}/>
      </InputGroup.Button>
      {isEditable && <InputGroup.Button onClick={onSaveClick}>
      <Icon as={IoCheckmark}/>
      </InputGroup.Button>}
      </InputGroup>
    </div>
  )
}

export default EditableInput