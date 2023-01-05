import React, {useState} from 'react'

const useLogin = (newUser) => {
    const initialInfo = {
        email: '',
        password: ''
    }

    const [info, setInfo] = useState({...initialInfo})

    const handleLogin = (field, e) => {
        setInfo({...info, [field]: e.target.value})
    }

    const resetLogin = () => {
        if (newUser) {
            setInfo({...initialInfo})
        }
    }

    return [info, handleLogin, resetLogin]
}

export default useLogin