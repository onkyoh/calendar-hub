import React, {useEffect, useState} from 'react'

const useNote = (schedule, month, date) => {

    const [noteValue, setNoteValue] = useState('')

    const handleNoteValue = (e) => {
        setNoteValue(e.target.value)
    }


    useEffect(() => {
      let currentDate = {...schedule[month][date]}
      if (currentDate.note) {
        setNoteValue(currentDate.note)
      } else {
        setNoteValue('')
      }
    }, [date, schedule])

  return [
    noteValue,
    handleNoteValue
  ]
}

export default useNote