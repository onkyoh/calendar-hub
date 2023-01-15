import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import AvailabilityButton from './AvailabilityButton'
import Note from './Note'

import { AVAILABILITY_LIST, COLORS } from '../../consts/constants'

import useAvailability from '../../hooks/useAvailability'
import useLayout from '../../hooks/useLayout'
import useDate from '../../hooks/useDate'
import useSchedule from '../../hooks/useSchedule'
import useNote from '../../hooks/useNote'

import NextIcon from '@iconscout/react-unicons/icons/uil-arrow-right'
import LastIcon from '@iconscout/react-unicons/icons/uil-arrow-left'
import SaveIcon from '@iconscout/react-unicons/icons/uil-save'
import CalendarIcon from '@iconscout/react-unicons/icons/uil-calendar-alt'
import LoadingIcon from '@iconscout/react-unicons/icons/uil-spinner-alt'


const CalendarContainer = (props) => {

    const { currentLayout, nextMonth, lastMonth } = useLayout()
    const { availability, handleAvailability } = useAvailability(currentLayout.month, props.calendarInfo)
    const { selectedDate, activeDate } = useDate(availability, currentLayout.month)
    const [ schedule, useNote, useSave ] = useSchedule(currentLayout.length, selectedDate, availability, currentLayout.month, props.calendarInfo.usersCalendar)

    
  return (
    <section id='calendar'>
        <div id='header'>
            <p>{props.calendarInfo.usersName}'s</p>
            <button 
            onClick={() => useSave.saveCalendar(props.defaultCalendar.usersCalendar, schedule)} 
            disabled={props.defaultCalendar.usersCalendar !== props.calendarInfo.usersCalendar}
            >
                {useSave.saving ? <LoadingIcon size={40} class='spin'/> : <SaveIcon size={40}/>}
            </button>
            <button onClick={() => props.switchCalendar({...props.defaultCalendar})}
             disabled={props.defaultCalendar.usersCalendar === props.calendarInfo.usersCalendar}
            >
                <CalendarIcon size={35}/>
            </button>
        </div>

        <div id='month-container'>
            <button onClick={lastMonth} disabled={currentLayout.month === 'January'}><LastIcon size={30}/></button>
            <p>{currentLayout.month}</p>
            <button onClick={nextMonth} disabled={currentLayout.month === 'December'}><NextIcon size={30}/></button>
        </div>

        {schedule && <Calendar {...currentLayout} activeDate={activeDate} selectedDate={selectedDate} schedule={schedule}/>}

        <div id='availability'>
            {AVAILABILITY_LIST.map((button) => (
                <AvailabilityButton 
                {...button}
                onClick={handleAvailability}
                availability={availability}
                disabled={props.defaultCalendar.usersCalendar !== props.calendarInfo.usersCalendar}
                key={button.value}
                />  
            ))}
        </div>

        <div id='note'>
            {selectedDate && <Note {...useNote} usersCalendar={props.defaultCalendar.usersCalendar === props.calendarInfo.usersCalendar}/>}
        </div>

    </section>
  )
}

export default CalendarContainer