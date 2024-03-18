import React from "react";
import InProgressCard from "../../../Components/Cards/InProgress/InProgressCard";

const InProgressCardPage = ({ task }) => {
  return (
    <div>
      <InProgressCard task={task} />
    </div>
  );
};

export default InProgressCardPage;
