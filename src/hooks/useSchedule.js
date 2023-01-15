import { doc, getDoc } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db } from '../firebase-config'
import { EMPTY_CALENDAR_2023 } from '../consts/constants'
import useNote from './useNote'

const useSchedule = (length, date, availability, month, calendarId) => {

    const dateIdx = date - 1

    const [ schedule, setSchedule] = useState({...EMPTY_CALENDAR_2023()})

    const [ noteValue, handleNoteValue ] = useNote( schedule, month, dateIdx)

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

    const addNote = () => {
        if (!noteValue) return
        let tempSchedule = {...schedule}
        let tempMonth = [...tempSchedule[month]]
        tempMonth[dateIdx] = {...tempMonth[dateIdx], note: noteValue}
        tempSchedule[month] = [...tempMonth]
        setSchedule({...tempSchedule})
    }

    useEffect(() => {
        if (availability && date) {
            let tempSchedule = {...schedule}
            let tempMonth = [...tempSchedule[month]]
            tempMonth[dateIdx] = {...tempMonth[dateIdx], availability: availability}
            tempSchedule[month] = [...tempMonth]
            setSchedule({...tempSchedule})
        }
    }, [date])

    const noteUtil = {
        noteValue,
        handleNoteValue,
        addNote
    }

    return [schedule, noteUtil]
}

export default useSchedule