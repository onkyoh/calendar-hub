import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"

export const saveCalendar = async (calendarId, schedule) => {
    try {
        await updateDoc(doc(db, 'calendars', calendarId), {
            ...schedule
        })
    } catch (e) {
        alert(e.message)
    }
}