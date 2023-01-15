import { DAYS } from '../../consts/constants'
import Button from './Button'

const Calendar = (props) => {

    const buffers = Array(props.begins).fill()

    const layout = Array(props.length).fill()

  return (
    <div id='grid'>
        {DAYS.map(day => (
          <button className='days' style={{backgroundColor: day.color}}>{day.day}</button>
        ))}
        {props.schedule && buffers.map(buffer => (
            <div></div>
        ))}
        {props.schedule && layout.map((tile, i) => (
            <Button date={i + 1} activeDate={props.activeDate} selectedDate={props.selectedDate}
             class={`${props.schedule[props.month][i].availability}  ${props.schedule[props.month][i].note && 'has-note'}`}
             />
        ))}
    </div>
  )
}

export default Calendar