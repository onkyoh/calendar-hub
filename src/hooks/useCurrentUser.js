import React, {useState, useEffect} from 'react'
import { auth } from '../firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

const useCurrentUser = () => {

    const [currentUser, setCurrentUser] = useState()

    const handleCurrentUser = (id) => {
        setCurrentUser(id)
    }

    useEffect(() => {
        const unlistenAuth = onAuthStateChanged(auth, (retrievedUser) => {
          if (retrievedUser) {
            setCurrentUser(() => retrievedUser.uid)
          }
        })
        return () => { 
          unlistenAuth()
        }
      }, [])

    return {currentUser, handleCurrentUser}
}

export default useCurrentUser