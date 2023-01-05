import React, {useState, useEffect} from 'react'

const useAvailability = (month, calendar) => {
    const [availability, setAvailability] = useState('')

    const handleAvailability = (type) => {
        setAvailability(type)
    }

    useEffect(() => {
        setAvailability('')
    }, [month, calendar])

    return {
        availability,
        handleAvailability
    }
}

export default useAvailability