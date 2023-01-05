import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config'
import { doc, onSnapshot } from 'firebase/firestore'

const useFetchInfo = (currentUser) => {

    const [userInfo, setUserInfo] = useState()
    const [defaultCalendar, setDefaultCalendar] = useState({}) 

    useEffect(() => {
        if (!currentUser) {
          return
        }
        const subUserInfo = onSnapshot(doc(db, 'users', currentUser), (doc) => {
          setUserInfo({...doc.data(), userId: currentUser})
          setDefaultCalendar({ 
            usersCalendar: doc.data().calendar2023, 
            usersId: currentUser, 
            usersName: doc.data().displayName
          })
        })
        return () => {
          subUserInfo()
        }
     }, [currentUser])

    return [
        userInfo,
        defaultCalendar
    ]
}

export default useFetchInfo