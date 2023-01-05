import React from 'react'
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import CalendarIcon from '@iconscout/react-unicons/icons/uil-calendar-alt'

const ContactItem = (props) => {

  const selectedStyle = {
    outline: props.calendarId === props.contact.usersCalendar ? `3px dashed white` : ``
  }

  return (
    <li style={selectedStyle} className='pop-in'>
        <p>{props.contact.usersName}</p>
        <button onClick={() => props.switchCalendar(props.contact)}><CalendarIcon/></button>
        <button onClick={() => props.toggleDelete(props.contact.usersId)}><DeleteIcon/></button>
    </li>
  )
}

export default ContactItem