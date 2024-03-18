import React, { useState } from "react";
import style from "./Board.module.css";
import { getCurrentDate } from "../../Utils/Date";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import {
  setBackLogCollapse,
  setDoneCollapse,
  setInProgressCollapse,
  setToDoCollapse,
  toggleCreateTask,
} from "../../Redux/Board/BoardSlice";

import BacklogCardPage from "../../Pages/CardsPage/BacklogCardPage/BacklogCardPage";
import ToDoCardPage from "../../Pages/CardsPage/ToDoCardPage/ToDoPage";
import DoneCardpage from "../../Pages/CardsPage/DoneCardPage/DoneCardpage";
import InProgressCardPage from "../../Pages/CardsPage/InProgressCardPage/InProgressCardPage";
import {
  backlog,
  done,
  fetching,
  getUserAllThisMonthTasksAsync,
  getUserAllThisWeekTasksAsync,
  getUserAllThisYearTasksAsync,
  getUserAllTodayTasksAsync,
  inProgress,
  todo,
  user,
} from "../../Redux/User/UserSlice";
const Board = () => {
  const taskBoxes = {
    1: "backlogs",
    2: "todo",
    3: "inprogress",
    4: "done",
  };

  const userTodoTasks = useSelector(todo);
  const fetchingData = useSelector(fetching);
  const userBacklogTasks = useSelector(backlog);
  const userInProgressTasks = useSelector(inProgress);
  const userDoneTasks = useSelector(done);
  const dispatch = useDispatch();
  const userInfo = useSelector(user);
  const date = getCurrentDate();
  const handleToggleCreateTaskSec = () => {
    dispatch(toggleCreateTask());
  };
  const handleGetUserAllTodayTasks = (date) => {
    try {
      const timeZoneVal = {
        1: "today",
        2: "week",
        3: "month",
        4: "year",
      };

      if (date === timeZoneVal[1]) {
        dispatch(getUserAllTodayTasksAsync());
      } else if (date === timeZoneVal[2]) {
        dispatch(getUserAllThisWeekTasksAsync());
      } else if (date === timeZoneVal[3]) {
        dispatch(getUserAllThisMonthTasksAsync());
      } else {
        dispatch(getUserAllThisYearTasksAsync());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCollapseAll = (taskBoxNumber, value) => {
    if (taskBoxNumber === taskBoxes["1"]) {
      dispatch(setBackLogCollapse({ status: value }));
    } else if (taskBoxNumber === taskBoxes["2"]) {
      dispatch(setToDoCollapse({ status: value }));
    } else if (taskBoxNumber === taskBoxes["3"]) {
      dispatch(setInProgressCollapse({ status: value }));
    } else {
      dispatch(setDoneCollapse({ status: value }));
    }
  };

  return (
    <section className={style.board_main_box}>
      <div className={style.board_container}>
        <div className={style.borad_sec_1}>
          <span className={style.board_welcome}>Welcome! {userInfo?.name}</span>
          <span className={style.board_date}>{date}</span>
        </div>
        <div className={style.board_sec_2}>
          <span className={style.section_title}>Board</span>
          <span className={style.board_filters}>
            <select
              onChange={(e) => handleGetUserAllTodayTasks(e.target.value)}
              className={style.options}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </span>
        </div>
        <div className={style.board_sec_3}>
          <div className={style.board_box}>
            <div className={style.board_box_up_sec}>
              <div className={style.box}>
                <span className={style.text}>Backlogs</span>
                <span onClick={() => handleCollapseAll(taskBoxes["1"], true)}>
                  <VscCollapseAll size={21} />
                </span>
              </div>
            </div>
            <div className={style.tasks_sec}>
              {!fetchingData ? (
                userBacklogTasks?.map((task, i) => {
                  return (
                    <div key={i} className={style.task_box}>
                      <BacklogCardPage task={task} />
                    </div>
                  );
                })
              ) : (
                <div className={style.loading}>
                  <HashLoader color="#17a2b8" />
                </div>
              )}
            </div>
          </div>
          <div className={style.board_box}>
            <div className={style.board_box_up_sec}>
              <div className={style.box}>
                <span className={style.text}>To do</span>
                <span className={style.add_icon}>
                  <IoIosAdd
                    onClick={() => handleToggleCreateTaskSec()}
                    size={25}
                  />
                  <span onClick={() => handleCollapseAll(taskBoxes["2"], true)}>
                    <VscCollapseAll size={21} />
                  </span>
                </span>
              </div>
            </div>
            <div className={style.tasks_sec}>
              {!fetchingData ? (
                userTodoTasks?.map((task) => {
                  return (
                    <div className={style.task_box}>
                      <ToDoCardPage task={task} />
                    </div>
                  );
                })
              ) : (
                <div className={style.loading}>
                  <HashLoader color="#17a2b8" />
                </div>
              )}
            </div>
          </div>
          <div className={style.board_box}>
            <div className={style.board_box_up_sec}>
              <div className={style.box}>
                <span className={style.text}>In pogress</span>
                <span onClick={() => handleCollapseAll(taskBoxes["3"], true)}>
                  <VscCollapseAll size={21} />
                </span>
              </div>
            </div>
            <div className={style.tasks_sec}>
              {!fetchingData ? (
                userInProgressTasks?.map((task, i) => {
                  return (
                    <div key={i} className={style.task_box}>
                      <InProgressCardPage task={task} />
                    </div>
                  );
                })
              ) : (
                <div className={style.loading}>
                  <HashLoader color="#17a2b8" />
                </div>
              )}
            </div>
          </div>
          <div className={style.board_box}>
            <div className={style.board_box_up_sec}>
              <div className={style.box}>
                <span className={style.text}>Done</span>
                <span onClick={() => handleCollapseAll(taskBoxes["4"], true)}>
                  <VscCollapseAll size={21} />
                </span>
              </div>
            </div>
            <div className={style.tasks_sec}>
              {!fetchingData ? (
                userDoneTasks?.map((task) => {
                  return (
                    <div className={style.task_box}>
                      <DoneCardpage task={task} />
                    </div>
                  );
                })
              ) : (
                <div className={style.loading}>
                  <HashLoader color="#17a2b8" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;
