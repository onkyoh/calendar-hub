

export const COLORS = {
    BEIGE: 'rgb(247, 233, 187)',
    GREEN: 'rgb(122, 241, 152)',
    YELLOW: 'rgb(214, 243, 108)',
    PINK: 'rgb(255, 108, 145)',
    PURPLE: 'rgb(149, 108, 224)',
    BLUE: 'rgb(81, 137, 241)'
}

export const EMPTY_CALENDAR_2023 = () => {
    let calendarData = {}
    for (let i = 0; i < LAYOUT_2023.length; i++) {
        const currentMonth = LAYOUT_2023[i].month
        calendarData = {...calendarData, [currentMonth]: Array(LAYOUT_2023[i].length).fill({availability: 'none'})}   
    }
    return {...calendarData}
}

export const LAYOUT_2023 = [
    {length:31, begins:0, month: 'January'},
    {length:28, begins:3, month: 'February'},
    {length:31, begins:3, month: 'March'},
    {length:30, begins:6, month: 'April'},
    {length:31, begins:1, month: 'May'},
    {length:30, begins:4, month: 'June'},
    {length:31, begins:6, month: 'July'},
    {length:31, begins:2, month: 'August'},
    {length:30, begins:5, month: 'September'},
    {length:31, begins:0, month: 'October'},
    {length:30, begins:3, month: 'November'},
    {length:31, begins:5, month: 'December'},
]

export const AVAILABILITY_LIST = [
    {
        value: '',
        text: 'view',
        color: COLORS.BLUE
        },
    {
        value: 'none',
        text: 'reset',
        color: ''

    },
    {
        value: 'free',
        text: 'free',
        color: COLORS.GREEN
    },
    {
        value: 'mixed',
        text: 'mixed',
        color: COLORS.YELLOW
    },
    {
        value: 'busy',
        text: 'busy',
        color: COLORS.PINK
    },
]

export const DAYS = [
    { 
        day: 's',
    }, { 
        day: 'm',
    }, { 
        day: 't',
    }, { 
        day: 'w',
    }, { 
        day: 't',
    }, { 
        day: 'f',
    }, { 
        day: 's',
    },
]