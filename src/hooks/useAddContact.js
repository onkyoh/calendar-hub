import React, {useState} from 'react'
import { doc,updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase-config'

const useAddContact = (contacts) => {
    const [contactId, setContactId] = useState()

    const handleContactId = (e) => {
        setContactId(e.target.value)
    }

    const addContact = async (userContactInfo, id) => {
        const idx = contacts.findIndex(contact => contact.usersId === id)
        if (id === userContactInfo.usersId) {
            alert('You cannot add yourself.')
            setContactId('')
            return
        }
        if (idx > -1) {
            alert('This user is already your contact.')
            setContactId('')
            return
        }
        try {
            await updateDoc(doc(db, 'users', id), {
                incomingRequests: arrayUnion({...userContactInfo})
            })
            setContactId('')
        } catch (e) {
            alert('User with given id was not found.')
            setContactId('')
        }
    }
    
    return {
        contactId, 
        handleContactId,
        addContact
    }
}

export default useAddContact