import React, {useState} from 'react'

const useRegister = (newUser) => {
    const initialInfo = {
        displayName: '',
        email: '',
        password: '',
    }

    const [info, setInfo] = useState({...initialInfo})

    const handleRegister = (field, e) => {
        setInfo({...info, [field]: e.target.value})
    }

    const resetRegister = () => {
        if (newUser) {
            setInfo({...initialInfo})
        }
    }

    return [info, handleRegister, resetRegister]
}

export default useRegister