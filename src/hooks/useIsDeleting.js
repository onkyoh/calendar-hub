import React, {useState} from 'react'

const useIsDeleting = () => {

    const [deletingId, setDeletingId] = useState()

    const toggleDelete = (id) => {
      setDeletingId(id)
    }
    
  return {
    deletingId,
    toggleDelete
  }
}

export default useIsDeleting