import { useState } from "react";
import { LAYOUT } from "../consts/constants";

const useMonth = () => {
  const date = new Date();

  const [monthIdx, setMonthIdx] = useState(date.getMonth());

  const lastMonth = () => {
    setMonthIdx((prev) => prev - 1);
  };
  const nextMonth = () => {
    setMonthIdx((prev) => prev + 1);
  };

  return { monthIdx, nextMonth, lastMonth };
};

export default useMonth;
