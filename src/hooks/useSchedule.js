import { doc, getDoc } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db } from '../firebase-config'
import { EMPTY_CALENDAR_2023 } from '../consts/constants'

const useSchedule = (length, date, availability, month, calendarId) => {

    const [schedule, setSchedule] = useState({...EMPTY_CALENDAR_2023()})

    useEffect(() => {
    
        const getCalendar = async () => {
            if (!calendarId) return
            try {   
                const data = await getDoc(doc(db, 'calendars', calendarId))
                setSchedule({...data.data()})
            } catch (e) {
                alert(e.message)
            }
        }
        getCalendar()
    }, [calendarId])

    useEffect(() => {
        const dateIdx = date - 1
        if (availability && date) {
            let tempSchedule = {...schedule}
            let tempMonth = [...tempSchedule[month]]
            tempMonth[dateIdx] = {...tempMonth[dateIdx], availability: availability}
            tempSchedule[month] = [...tempMonth]
            setSchedule({...tempSchedule})
        }
    }, [date])
    
    return [schedule]
}

export default useSchedule