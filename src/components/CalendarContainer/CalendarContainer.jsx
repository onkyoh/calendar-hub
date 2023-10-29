import Calendar from "./Calendar";
import AvailabilityButton from "./AvailabilityButton";
import Note from "./Note";

import { AVAILABILITY_LIST, LAYOUT } from "../../consts/constants";

import useAvailability from "../../hooks/useAvailability";
import useMonth from "../../hooks/useMonth";
import useDate from "../../hooks/useDate";
import useSchedule from "../../hooks/useSchedule";

import NextIcon from "@iconscout/react-unicons/icons/uil-arrow-right";
import LastIcon from "@iconscout/react-unicons/icons/uil-arrow-left";
import SaveIcon from "@iconscout/react-unicons/icons/uil-save";
import CalendarIcon from "@iconscout/react-unicons/icons/uil-calendar-alt";
import LoadingIcon from "@iconscout/react-unicons/icons/uil-spinner-alt";

const CalendarContainer = (props) => {
  const { monthIdx, nextMonth, lastMonth } = useMonth();
  const { availability, handleAvailability } = useAvailability(
    monthIdx,
    props.calendarInfo
  );
  const { selectedDate, activeDate } = useDate(availability, monthIdx);
  const [schedule, useNote, useSave] = useSchedule(
    selectedDate,
    availability,
    monthIdx,
    props.calendarInfo.usersCalendar
  );

  return (
    <section id="calendar">
      <div id="header">
        <p>{props.calendarInfo.usersName}'s</p>
        <button
          onClick={() => useSave.saveCalendar()}
          disabled={
            props.defaultCalendar.usersCalendar !==
            props.calendarInfo.usersCalendar
          }
        >
          {useSave.saving ? (
            <LoadingIcon size={40} className="spin" />
          ) : (
            <SaveIcon size={40} />
          )}
        </button>
        <button
          onClick={() => props.switchCalendar({ ...props.defaultCalendar })}
          disabled={
            props.defaultCalendar.usersCalendar ===
            props.calendarInfo.usersCalendar
          }
        >
          <CalendarIcon size={35} />
        </button>
      </div>

      <div id="month-container">
        <button
          onClick={lastMonth}
          disabled={monthIdx === 0}
          style={monthIdx === 0 ? { opacity: 0.7 } : { opacity: 1 }}
        >
          <LastIcon size={30} />
        </button>
        <p>{LAYOUT[monthIdx].month}</p>
        <p>202{3 + Math.floor(monthIdx / 12)}</p>
        <button
          onClick={nextMonth}
          disabled={monthIdx === LAYOUT.length - 1}
          style={
            monthIdx === LAYOUT.length - 1 ? { opacity: 0.7 } : { opacity: 1 }
          }
        >
          <NextIcon size={30} />
        </button>
      </div>

      {schedule && (
        <Calendar
          activeDate={activeDate}
          selectedDate={selectedDate}
          schedule={schedule[monthIdx]}
          buffer={LAYOUT[monthIdx]}
        />
      )}

      <div id="availability">
        {AVAILABILITY_LIST.map((button) => (
          <AvailabilityButton
            {...button}
            onClick={handleAvailability}
            availability={availability}
            disabled={
              props.defaultCalendar.usersCalendar !==
              props.calendarInfo.usersCalendar
            }
            key={button.value}
          />
        ))}
      </div>

      <div id="note">
        {selectedDate && (
          <Note
            {...useNote}
            usersCalendar={
              props.defaultCalendar.usersCalendar ===
              props.calendarInfo.usersCalendar
            }
          />
        )}
      </div>
    </section>
  );
};

export default CalendarContainer;
