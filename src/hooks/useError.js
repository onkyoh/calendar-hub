import React, {useState} from 'react'

const useError = () => {

    const [error, setError] = useState('')

    const handleError = (message) => {
        setError(message)
    }

  return {
    error,
    handleError
  }
}

export default useError