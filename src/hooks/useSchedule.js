import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { EMPTY_CALENDAR } from "../consts/constants";
import useNote from "./useNote";

const useSchedule = (date, availability, monthIdx, calendarId) => {
  const dateIdx = date - 1;

  const [schedule, setSchedule] = useState([...EMPTY_CALENDAR()]);

  const [saving, setSaving] = useState(false);

  const [noteValue, handleNoteValue] = useNote(schedule, monthIdx, dateIdx);

  useEffect(() => {
    const getCalendar = async () => {
      if (!calendarId) return;
      try {
        const data = await getDoc(doc(db, "calendars", calendarId));
        const tempSchedule = data.data().schedule;

        if (!tempSchedule) {
          await updateDoc(doc(db, "calendars", calendarId), {
            schedule: JSON.stringify([...EMPTY_CALENDAR()]),
          });
          setSchedule([...EMPTY_CALENDAR()]);
        } else {
          setSchedule([...JSON.parse(tempSchedule)]);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getCalendar();
  }, [calendarId]);

  const saveCalendar = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "calendars", calendarId), {
        schedule: JSON.stringify(schedule),
      });
      setTimeout(() => {
        setSaving(false);
      }, 1000);
    } catch (e) {
      alert(e.message);
      await setSaving(false);
    }
  };

  const addNote = () => {
    if (!noteValue) return;
    let tempSchedule = [...schedule];
    let tempMonth = [...tempSchedule[monthIdx]];
    tempMonth[dateIdx] = { ...tempMonth[dateIdx], note: noteValue };
    tempSchedule[monthIdx] = [...tempMonth];
    setSchedule([...tempSchedule]);
  };

  useEffect(() => {
    if (availability && date) {
      let tempSchedule = [...schedule];
      let tempMonth = [...tempSchedule[monthIdx]];
      tempMonth[dateIdx] = {
        ...tempMonth[dateIdx],
        availability: availability,
      };
      tempSchedule[monthIdx] = [...tempMonth];
      setSchedule([...tempSchedule]);
    }
  }, [date]);

  const noteUtil = {
    noteValue,
    handleNoteValue,
    addNote,
  };

  const savingUtil = {
    saving,
    saveCalendar,
  };

  return [schedule, noteUtil, savingUtil];
};

export default useSchedule;
