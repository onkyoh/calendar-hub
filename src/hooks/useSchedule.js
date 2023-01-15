import { doc, getDoc, updateDoc  } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db } from '../firebase-config'
import { EMPTY_CALENDAR_2023 } from '../consts/constants'
import useNote from './useNote'

const useSchedule = (length, date, availability, month, calendarId) => {

    const dateIdx = date - 1

    const [ schedule, setSchedule] = useState({...EMPTY_CALENDAR_2023()})

    const [saving, setSaving] = useState(false)

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

    const saveCalendar = async () => {
        setSaving(true)
        try {
            await updateDoc(doc(db, 'calendars', calendarId), {
                ...schedule
            })
            setTimeout(() => {
                setSaving(false)
            }, 1000)
        } catch (e) {
            alert(e.message)
            await setSaving(false)
        }
    }

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

    const savingUtil = {
        saving,
        saveCalendar
    }

    return [schedule, noteUtil, savingUtil]
}

export default useSchedule