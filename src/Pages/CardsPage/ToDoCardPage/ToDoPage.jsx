import React from "react";
import ToDoCard from "../../../Components/Cards/ToDoCard/ToDoCard";

const ToDoCardPage = ({ task }) => {
  return (
    <div>
      <ToDoCard task={task} />
    </div>
  );
};

export default ToDoCardPage;
