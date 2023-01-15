import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"

export const accept = async (incomingInfo, usersInfo) => {
    try {
        //deletes from users incoming
        const data = await getDoc(doc(db, 'users', usersInfo.usersId))
        const previousRequests = [...data.data().incomingRequests]
        await updateDoc(doc(db, 'users', usersInfo.usersId), {
            incomingRequests: previousRequests.filter(request => request.usersId !== incomingInfo.usersId),
            contacts: arrayUnion({
                ...incomingInfo
            })
        })
        //update conctacts doc with user info
        await updateDoc(doc(db, 'users', incomingInfo.usersId), {
            contacts: arrayUnion({
                ...usersInfo
            })
        })
    } catch (e) {
        alert(e.message)
    }
}

export const deny = async (incomingInfo, usersInfo) => {
    try {
        const data = await getDoc(doc(db, 'users', usersInfo.usersId))
        const previousRequests = [...data.data().incomingRequests]
        await updateDoc(doc(db, 'users', usersInfo.usersId), {
            incomingRequests: previousRequests.filter(request => request.usersId !== incomingInfo.usersId),
        })
    } catch (e) {
        alert(e.message)
    }
}

export const deleteContact = async (usersId, contactsId, closeModal) => {
    const removeContact = async (docId, targetId) => {
        try {
            const data = await getDoc(doc(db, 'users', docId))
            const previousContacts = [...data.data().contacts]
            console.log(previousContacts)
            await updateDoc(doc(db, 'users', docId), {
                contacts: previousContacts.filter(contact => contact.usersId !== targetId)
            })
        } catch (e) {
            alert(e.message)
        }
    }
    removeContact(usersId, contactsId)
    removeContact(contactsId, usersId)
    closeModal()
}