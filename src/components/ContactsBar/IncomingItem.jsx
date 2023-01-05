import React from 'react'
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import AddIcon from '@iconscout/react-unicons/icons/uil-plus'

const IncomingItem = (props) => {

  return (
    <li className='pop-in'>
        <p>{props.incomingUser.usersName}</p>
        <button onClick={() => props.accept(props.incomingUser, props.userContactInfo)}><AddIcon/></button>
        <button onClick={() => props.deny(props.incomingUser, props.userContactInfo)}><DeleteIcon/></button>
    </li>
  )
}

export default IncomingItem