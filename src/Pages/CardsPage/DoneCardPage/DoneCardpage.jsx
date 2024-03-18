import React from "react";
import DoneCard from "../../../Components/Cards/DoneCard/DoneCard";

const DoneCardpage = ({ task }) => {
  return (
    <div>
      <DoneCard task={task} />
    </div>
  );
};

export default DoneCardpage;
