import React, { useEffect, useState } from "react";
import style from "./InProgressCard.module.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  backlogCollapse,
  inProgressCollapse,
  inProgressCollapseToggle,
  setDeleteTask,
  setEditTask,
  setInProgressCollapse,
  setShareTaskLink,
  toggle,
} from "../../../Redux/Board/BoardSlice";
import {
  addToBacklogAsync,
  addToDoneAsync,
  addToTodoAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";

const InProgressCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate, id } = task;
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loader, setLoader] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const Toggle = useSelector(inProgressCollapseToggle);
  const inProgressStatus = useSelector(setInProgressCollapse);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "INPROGRESS" }));
  };

  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "INPROGRESS" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleAddToDone = (from) => {
    dispatch(addToDoneAsync({ removeFrom: from, task: task }));
    setLoader(3);
  };
  const handleAddToBacklog = (from) => {
    setLoader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: task }));
  };
  const handleAddToToDo = (from) => {
    setLoader(2);
    dispatch(addToTodoAsync({ removeFrom: from, task: task }));
  };

  const handleShareTaskLink = (link) => {
    dispatch(setShareTaskLink({ shareLink: link }));
  };
  useEffect(() => {
    let checks = checklist?.filter(({ tick }) => tick === true);
    setCheckCount(checks.length);
    if (inProgressStatus) {
      setShowAllTasks(false);
    }
  }, [Toggle, boardReFatchToggle]);
  return (
    <section className={style.inprogress_container}>
      <div className={style.inprogress_section}>
        <div className={style.inprogress_section_up}>
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
        <div className={style.inprogress_section_middle}>
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
              checklist.map((task, i) => {
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

        <div className={style.inprogress_section_down}>
          {dueDate && (
            <div className={style.btn_left}>
              <button>{dueDate}</button>
            </div>
          )}
          <div className={style.btn_right}>
            <button onClick={() => handleAddToBacklog("INPROGRESS")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToToDo("INPROGRESS")}>
              {loader !== 2 ? "TODO" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToDone("INPROGRESS")}>
              {loader !== 3 ? "DONE" : <BeatLoader size={4} color="black" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InProgressCard;
