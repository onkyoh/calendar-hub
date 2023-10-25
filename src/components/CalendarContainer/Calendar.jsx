import { DAYS } from "../../consts/constants";
import Button from "./Button";

const Calendar = (props) => {
  const buffers = Array(props.begins).fill();

  const layout = Array(props.schedule.length).fill();

  return (
    <div id="grid">
      {DAYS.map((day) => (
        <button className="days" style={{ backgroundColor: day.color }}>
          {day.day}
        </button>
      ))}
      {props.schedule && buffers.map((buffer) => <div></div>)}
      {props.schedule &&
        layout.map((tile, dayIdx) => (
          <Button
            date={dayIdx + 1}
            key={props.monthIdx + "-" + dayIdx}
            activeDate={props.activeDate}
            selectedDate={props.selectedDate}
            className={`${props.schedule[dayIdx].availability}  ${
              props.schedule[dayIdx].note && "has-note"
            }`}
          />
        ))}
    </div>
  );
};

export default Calendar;
