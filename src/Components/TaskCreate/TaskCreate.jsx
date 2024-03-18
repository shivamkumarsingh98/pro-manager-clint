import React, { useContext, useEffect, useState } from "react";
import style from "./TaskCreate.module.css";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateTask } from "../../Redux/Board/BoardSlice";
import { getMonth } from "../../Utils/Date";
import { BeatLoader } from "react-spinners";

import { toggle } from "../../Redux/Board/BoardSlice";
import {
  createTodoAsync,
  reFatchAlltasksToggle,
} from "../../Redux/User/UserSlice";
import { generateUniqueHashedId } from "../../Utils/GenerateHashId";
const TaskCreate = () => {
  const [inputValues, setInputValues] = useState([]);
  let [inputsCount, setInputsCount] = useState(0);
  const [priority, setPriority] = useState("");
  const [taskToggle, setTaskToggle] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTilte] = useState("");
  let [checkList, setCheckList] = useState(0);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const handleToggleCreateTaskSec = () => {
    dispatch(toggleCreateTask());
  };

  const handleSetTitle = (text) => {
    if (inputValues[0]?.id && text && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setTilte(text);
  };
  const handleSelectPriority = (priority) => {
    if (inputValues[0]?.id && title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setPriority(priority);
  };

  const handleSaveTask = async () => {
    setLoader(true);
    let month = "";
    let currDate = "";
    const id = await generateUniqueHashedId(title);
    if (date) {
      const monthNumber =
        date?.split("-")[1][0] === "0"
          ? date?.split("-")[1][1]
          : date?.split("-")[1];
      currDate = date.split("-")[2];

      month = date ? getMonth(monthNumber) : "";
    }

    const taskInfo = {
      id: id,
      title: title,
      checklist: inputValues,
      priority: priority,
      dueDate: date ? `${month} ${currDate}th` : "",
      pureDate: date,
      colour:
        priority === "low-priority"
          ? "green"
          : priority === "high-priority"
          ? "red"
          : "blue",
    };

    dispatch(createTodoAsync(taskInfo));
  };

  const handleSetTick = (index) => {
    let taskIndex = inputValues.findIndex(({ id }) => id === index);
    let alreadyTick = inputValues[taskIndex].tick;
    if (alreadyTick) {
      inputValues[taskIndex].tick = false;
      setCheckList(checkList - 1);
    } else {
      inputValues[taskIndex].tick = true;
      setCheckList(checkList + 1);
    }
    setTaskToggle(!taskToggle);
  };
  const handleDeleteInput = (index) => {
    const filterInputValues = inputValues.filter(({ id }) => id !== index);
    const taskIndex = inputValues.findIndex(({ id }) => id === index);

    if (filterInputValues[0]?.id && title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }

    if (inputValues[taskIndex].tick) {
      setCheckList(checkList - 1);
    }

    setInputValues([...filterInputValues]);
  };
  const handleAddInputBox = (count) => {
    if (title && inputValues[0]?.text && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setInputValues([
      ...inputValues,
      {
        id: count + 1,
        tick: false,
        text: "",
      },
    ]);
    setInputsCount(count + 1);
  };
  const handleSetText = (index, text) => {
    if (priority && title && text) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    inputValues[index].text = text;
    setTaskToggle(!taskToggle);
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
      handleToggleCreateTaskSec();
    }
  }, [boardReFatchToggle]);
  return (
    <section className={style.task_container}>
      <div className={style.task_container_sec}>
        <div className={style.task_sec_up}>
          <div className={style.task_input_sec}>
            <label>
              Title <span className={style.red_dot}>*</span>
            </label>
            <input
              onChange={(e) => handleSetTitle(e.target.value)}
              type="text"
              placeholder="Enter Task Title"
            />
          </div>
          <div className={style.select_priority}>
            <div className={style.task_title}>
              <span>
                Select Priority <span className={style.red_dot}>*</span>
              </span>
            </div>
            <div className={style.select_opt}>
              <div
                onClick={() => handleSelectPriority("high-priority")}
                className={` ${style.opt} ${
                  priority === "high-priority" && style.select_priority_on
                }`}
              >
                <span className={style.red}></span>
                <span className={style.select_text}>HIGH PRIORITY</span>
              </div>
              <div
                onClick={() => handleSelectPriority("moderate-priority")}
                className={`${style.opt} ${
                  priority === "moderate-priority" && style.select_priority_on
                }`}
              >
                <span className={style.blue}></span>
                <span className={style.select_text}>MODERATE PRIORITY</span>
              </div>
              <div
                onClick={() => handleSelectPriority("low-priority")}
                className={`${style.opt} ${
                  priority === "low-priority" && style.select_priority_on
                }`}
              >
                <span className={style.green}></span>
                <span className={style.select_text}> LOW PRIORITY</span>
              </div>
            </div>
          </div>
          <div className={style.task_section}>
            <div>
              <span className={style.checklist_title}>
                Checklist {`(${checkList}/${inputValues.length})`}{" "}
                <span className={style.red_dot}>*</span>
              </span>
            </div>
            <div className={style.task_inputs}>
              {inputValues.map(({ id, text }, i) => {
                return (
                  <>
                    <div key={i} className={style.task_box}>
                      <div className={style.check_box}>
                        <input
                          onChange={(e) => handleSetTick(id)}
                          checked={inputValues[i].tick}
                          type="checkbox"
                        />
                      </div>
                      <div className={style.task_delete}>
                        <MdDelete
                          onClick={() => handleDeleteInput(id)}
                          color="#CF3636"
                        />
                      </div>

                      <div className={style.task_write}>
                        <input
                          onChange={(e) => handleSetText(i, e.target.value)}
                          type="text"
                          value={text}
                          placeholder="Write task"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className={style.task_add_box}>
              <span className={style.task_add_icon}>
                <IoIosAdd />
              </span>
              <span
                onClick={() => handleAddInputBox(inputsCount)}
                className={style.task_add_text}
              >
                Add New
              </span>
            </div>
          </div>
        </div>

        <div className={style.task_sec_down}>
          <div className={style.buttons_left}>
            <input
              onChange={(e) => setDate(e.target.value)}
              className={style.date_btn}
              type="date"
            />
          </div>
          <div className={style.buttons_right}>
            <button
              onClick={() => handleToggleCreateTaskSec()}
              className={style.cancel_btn}
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveTask()}
              disabled={!enableSaveButton ? true : false}
              className={`${style.save_btn} ${
                !enableSaveButton && style.disable_btn
              }`}
            >
              {!loader ? "Save" : <BeatLoader size={10} color="white" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskCreate;
