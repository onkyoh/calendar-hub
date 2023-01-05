import React, { useEffect, useState } from 'react'

const useDate = (availability, month) => {
   
    const currentDay = new Date()
    const [selectedDate, setSelectedDate] = useState(currentDay.getDate())

    const activeDate = (date) => {
        setSelectedDate(date)
    }

    useEffect(() => {
        setSelectedDate()
    }, [availability, month])

    return {selectedDate, activeDate}
}

export default useDate