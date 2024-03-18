import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteTask,
  setEditTask,
  setShareTaskLink,
  toDoCollapse,
  toDoCollapseToggle,
} from "../../../Redux/Board/BoardSlice";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { BeatLoader } from "react-spinners";

import style from "./ToDoCard.module.css";
import {
  addToBacklogAsync,
  addToDoneAsync,
  addToInProgressAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";
const ToDoCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate, id } = task;

  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [checkCount, setCheckCount] = useState(0);
  const [loader, setloader] = useState(0);
  const toggle = useSelector(toDoCollapseToggle);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const toDoStatus = useSelector(toDoCollapse);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "TODO" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "TODO" }));
  };
  const handleAddToBacklog = (from) => {
    setloader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: task }));
  };
  const handleAddToInProgress = (from) => {
    setloader(2);
    dispatch(addToInProgressAsync({ removeFrom: from, task: task }));
  };
  const handleAddToDone = (from) => {
    setloader(3);
    dispatch(addToDoneAsync({ removeFrom: from, task: task }));
  };

  const handleShareTaskLink = (link) => {
    dispatch(setShareTaskLink({ shareLink: link }));
  };

  useEffect(() => {
    let checks = checklist?.filter(({ tick }) => tick === true);
    setCheckCount(checks.length);
    if (toDoStatus) {
      setShowAllTasks(false);
    }
    if (loader) {
      setloader(0);
    }
  }, [toggle, boardReFatchToggle]);
  return (
    <section className={style.todo_card_container}>
      <div className={style.todo_card_section}>
        <div className={style.todo_card_section_up}>
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
                onClick={() => handleDeleteTask(task?._id)}
                className={style.delete}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className={style.todo_card_section_middle}>
          <div className={style.sec_up}>
            <span className={style.checklist}>
              Checlist( {checkCount}/{checklist.length})
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
              checklist.map((task, i) => {
                return (
                  <div key={i} className={style.task_sec}>
                    <span className={style.check_box_sec}>
                      {" "}
                      <input className={style.check_box} type="checkbox" />
                    </span>
                    <span className={style.task}>{task.text}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={style.todo_card_section_down}>
          {dueDate && (
            <div className={style.btn_left}>
              <button>{dueDate}</button>
            </div>
          )}
          <div className={style.btn_right}>
            <button onClick={() => handleAddToBacklog("TODO")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToInProgress("TODO")}>
              {loader !== 2 ? (
                "PROGRESS"
              ) : (
                <BeatLoader size={4} color="black" />
              )}
            </button>
            <button onClick={() => handleAddToDone("TODO")}>
              {loader !== 3 ? "DONE" : <BeatLoader size={4} color="black" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToDoCard;
