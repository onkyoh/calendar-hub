import React from 'react'
import AddIcon from '@iconscout/react-unicons/icons/uil-plus-circle'

const Note = (props) => {
  return (
    <div className='pop-in'>
      {props.usersCalendar ? 
        <textarea type="text" maxLength={255} placeholder={'any notes?'} value={props.noteValue} onChange={(e) => props.handleNoteValue(e)}/>
      :
        <p>{props.noteValue}</p>
      }
      {props.usersCalendar && <button onClick={props.addNote}><AddIcon/></button>}
    </div>
  )
}

export default Note