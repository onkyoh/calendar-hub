import React from 'react'

const AvailabilityButton = (props) => {

    const toggledStyle = {
      backgroundColor: props.color,
      outline: props.availability === props.value ? '2px dashed white' : ''
    }

  return (
    <button onClick={() => props.onClick(props.value)} style={toggledStyle} disabled={props.disabled}>{props.text}</button>
  )
}

export default AvailabilityButton