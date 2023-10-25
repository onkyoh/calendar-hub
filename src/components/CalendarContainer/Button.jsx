import React from "react";
import { COLORS } from "../../consts/constants";

const Button = (props) => {
  const selectedStyle = {
    outline: props.selectedDate === props.date ? `3px dashed white` : "",
  };

  return (
    <button
      className={props.className}
      style={selectedStyle}
      onClick={() => props.activeDate(props.date)}
    >
      {props.date}
    </button>
  );
};

export default Button;
