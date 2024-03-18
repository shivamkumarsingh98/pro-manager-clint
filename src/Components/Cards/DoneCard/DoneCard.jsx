import React, { useEffect, useState } from "react";
import style from "./DoneCard.module.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  backlogCollapse,
  doneCollapseToggle,
  doneCollapsee,
  setDeleteTask,
  setEditTask,
  setShareTaskLink,
  toggle,
} from "../../../Redux/Board/BoardSlice";
import {
  addToBacklogAsync,
  addToInProgressAsync,
  addToTodoAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";

const DoneCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate, id } = task;
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const [loader, setLoader] = useState(0);
  const Toggle = useSelector(doneCollapseToggle);
  const doneStatus = useSelector(doneCollapsee);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "DONE" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "DONE" }));
  };
  const handleAddToBacklog = (from) => {
    setLoader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: task }));
  };

  const handleAddToToDo = (from) => {
    setLoader(2);
    dispatch(addToTodoAsync({ removeFrom: from, task: task }));
  };
  const handleAddToInProgress = (from) => {
    setLoader(3);
    dispatch(addToInProgressAsync({ removeFrom: from, task: task }));
  };

  const handleShareTaskLink = (link) => {
    dispatch(setShareTaskLink({ shareLink: link }));
  };

  useEffect(() => {
    let checks = checklist?.filter(({ tick }) => tick === true);
    setCheckCount(checks.length);
    if (doneStatus) {
      setShowAllTasks(false);
    }
    if (loader) {
      setLoader(0);
    }
  }, [Toggle, boardReFatchToggle]);
  return (
    <section className={style.done_card_container}>
      <div className={style.done_card_section}>
        <div className={style.done_card_section_up}>
          <div className={style.sec_left}>
            <div className={style.priority_sec}>
              <span
                className={style.color}
                style={{ background: `${colour}` }}
              ></span>
              <span className={style.task_priority}>{priority}</span>
            </div>
            <div className={style.task_title}>{title}</div>
          </div>
          <div className={style.sec_right}>
            <SlOptions onClick={() => handleToggleShowOptions()} />
            <div
              className={`${
                showOptions ? style.options_on : style.options_off
              }`}
            >
              <span onClick={() => handeEditTask()}>Edit</span>
              <span onClick={() => handleShareTaskLink(id)}>Share</span>
              <span
                onClick={() => handleDeleteTask(task._id)}
                className={style.delete}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className={style.done_card_section_middle}>
          <div className={style.sec_up}>
            <span className={style.checklist}>
              Checlist({checkCount}/{checklist.length})
            </span>
            <span
              onClick={() => handleToggleShowAllTasks()}
              className={style.expand}
            >
              {!showAllTasks ? (
                <MdExpandLess color=" #767575" />
              ) : (
                <MdExpandMore color=" #767575" />
              )}
            </span>
          </div>
          <div className={style.sec_down}>
            {showAllTasks &&
              checklist?.map((task, i) => {
                return (
                  <div key={i} className={style.task_sec}>
                    <span className={style.check_box_sec}>
                      <input className={style.check_box} type="checkbox" />
                    </span>
                    <span className={style.task}>{task.text}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={style.done_card_section_down}>
          {dueDate && (
            <div className={style.btn_left}>
              <button>{dueDate}</button>
            </div>
          )}
          <div className={style.btn_right}>
            <button onClick={() => handleAddToBacklog("Done")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToToDo("Done")}>
              {loader !== 2 ? "TODO" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToInProgress("DONE")}>
              {loader !== 3 ? (
                "PROGRESS"
              ) : (
                <BeatLoader size={4} color="black" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoneCard;
