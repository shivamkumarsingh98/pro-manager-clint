import React, { useEffect, useState } from "react";
import style from "./BacklogCard.module.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  backlogCollapse,
  backlogCollapseToggle,
  setDeleteTask,
  setEditTask,
  setShareTaskLink,
} from "../../../Redux/Board/BoardSlice";
import { useSelector } from "react-redux";
import {
  addToDoneAsync,
  addToInProgressAsync,
  addToTodoAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";
import { addToInProgress } from "../../../Redux/User/UserAPI";
const BacklogCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate, id } = task;
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const toggle = useSelector(backlogCollapseToggle);
  const backLogsStatus = useSelector(backlogCollapse);
  const [loader, setLoader] = useState(0);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const dispatch = useDispatch();

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "BACKLOG" }));
  };

  const handleAddToToDo = (from) => {
    setLoader(1);
    dispatch(addToTodoAsync({ removeFrom: from, task: task }));
  };
  const handleAddToDone = (from) => {
    setLoader(3);
    dispatch(addToDoneAsync({ removeFrom: from, task: task }));
  };
  const handleAddToInProgress = (from) => {
    setLoader(2);
    dispatch(addToInProgressAsync({ removeFrom: from, task: task }));
  };

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "BACKLOG" }));
  };

  const handleShareTaskLink = (link) => {
    dispatch(setShareTaskLink({ shareLink: link }));
  };

  useEffect(() => {
    let checks = checklist?.filter(({ tick }) => tick === true);
    setCheckCount(checks.length);
    if (backLogsStatus) {
      setShowAllTasks(false);
    }
    if (loader) {
      setLoader(0);
    }
  }, [toggle, boardReFatchToggle]);

  return (
    <section className={style.backlog_card_container}>
      <div className={style.backlog_card_section}>
        <div className={style.backlog_card_section_up}>
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
        <div className={style.backlog_card_section_middle}>
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

        <div className={style.backlog_card_section_down}>
          {dueDate && (
            <div className={style.btn_left}>
              <button>{dueDate}</button>
            </div>
          )}
          <div className={style.btn_right}>
            <button onClick={() => handleAddToToDo("BACKLOG")}>
              {loader !== 1 ? "TODO" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToInProgress("BACKLOG")}>
              {loader !== 2 ? (
                "PROGRESS"
              ) : (
                <BeatLoader size={4} color="black" />
              )}
            </button>
            <button onClick={() => handleAddToDone("BACKLOG")}>
              {loader !== 3 ? "DONE" : <BeatLoader size={4} color="black" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BacklogCard;
