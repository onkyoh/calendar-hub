import React, {useState} from 'react'

const useNewUser = (initial = false) => {
    const [newUser, setNewUser] = useState(initial)

    const toggleNewUser = () => {
        setNewUser(!newUser)
    }

    return {newUser, toggleNewUser}
}

export default useNewUser