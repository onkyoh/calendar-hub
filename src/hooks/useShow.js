import React, {useState} from 'react'

const useShow = () => {

    const [show, setShow] = useState({
        requests: true,
        added: true,
        bar: true,
        logout: false,
    })

    const toggleShow = (field) => {
        setShow({...show, [field]: !show[field]})
    }

  return {
    show,
    toggleShow
  }
}

export default useShow