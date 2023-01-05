import React, {useEffect, useMemo, useState} from 'react'

const useSwitchCalendar = (defaultCalendar) => {

    const [calendarInfo, setCalendarInfo] =  useState({...defaultCalendar})

    const switchCalendar = (calendar) => {
        if (calendar.usersCalendar === calendarInfo.usersCalendar && calendar.usersCalendar !== defaultCalendar.usersCalendar) {
            setCalendarInfo({...defaultCalendar})
            return
        }
        setCalendarInfo({...calendar})
    }

    useEffect(() => {
        if (!defaultCalendar) return
        setCalendarInfo({...defaultCalendar})
    }, [defaultCalendar])
 
    return [
        calendarInfo, 
        switchCalendar
    ]
}

export default useSwitchCalendar