import React, { useEffect } from 'react'
import ContactsBar from '../components/ContactsBar/ContactsBar'
import CalendarContainer from '../components/CalendarContainer/CalendarContainer'
import useFetchInfo from '../hooks/useFetchInfo'
import useSwitchCalendar from '../hooks/useSwitchCalendar'

const Main = (props) => {

  const [userInfo, defaultCalendar] = useFetchInfo(props.currentUser)
  const [calendarInfo, switchCalendar] = useSwitchCalendar(defaultCalendar)

  return (
    <div id='main-container'>
      {calendarInfo &&
        <>
          <ContactsBar {...userInfo} calendarId={calendarInfo.usersCalendar} defaultCalendar={defaultCalendar} switchCalendar={switchCalendar} handleCurrentUser={props.handleCurrentUser}/>
          <CalendarContainer {...userInfo} defaultCalendar={defaultCalendar} calendarInfo={calendarInfo} switchCalendar={switchCalendar}/>
        </>
      }
    </div>
  )
}

export default Main