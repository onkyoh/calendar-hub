import Button from './Button'

const Calendar = (props) => {

    const buffers = Array(props.begins).fill()

    const layout = Array(props.length).fill()

  return (
    <div id='grid'>
        {props.schedule && buffers.map(buffer => (
            <div></div>
        ))}
        {props.schedule && layout.map((tile, i) => (
            <Button date={i + 1} activeDate={props.activeDate} selectedDate={props.selectedDate}
             class={props.schedule[props.month][i].availability}
             />
        ))}
    </div>
  )
}

export default Calendar