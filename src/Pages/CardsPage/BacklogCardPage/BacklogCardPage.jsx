import React from "react";

import BacklogCard from "../../../Components/Cards/BacklogCard/BacklogCard";

const BacklogCardPage = ({ task }) => {
  return (
    <div>
      <BacklogCard task={task} />
    </div>
  );
};

export default BacklogCardPage;
