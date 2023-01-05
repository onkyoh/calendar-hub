import React, {useCallback, useEffect, useState} from 'react'
import { LAYOUT_2023 } from '../consts/constants'

const useLayout = () => {
    const date = new Date ()

    const [month, setMonth] = useState(date.getMonth())

    const lastMonth = () => {setMonth(prev => prev - 1)}
    const nextMonth = () => {setMonth(prev => prev + 1)}

    const currentLayout = {...LAYOUT_2023[month]}

    return {currentLayout, nextMonth, lastMonth}
}

export default useLayout