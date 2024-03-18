import React, { useEffect, useState } from "react";
import style from "./ShareTask.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import {
  fetching,
  getShareTaskAsync,
  task,
  toggle,
} from "../../Redux/ShareTask/ShareTaskSlice";
import { PiCodesandboxLogoLight } from "react-icons/pi";
const ShareTask = () => {
  const [shareTask, setShareTask] = useState({});
  let [checkCount, setCheckCount] = useState(0);
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const taskToggle = useSelector(toggle);
  const fetchingData = useSelector(fetching);
  const fetchedTask = useSelector(task);

  const handleGetShareTask = () => {
    dispatch(getShareTaskAsync({ id: taskId }));
  };

  useEffect(() => {
    if (fetchedTask?.id) {
      let checks = fetchedTask?.checklist?.filter(({ tick }) => tick === true);
      setCheckCount(checks?.length);
      setShareTask(fetchedTask);
    }
    handleGetShareTask();
  }, [taskToggle]);

  return (
    <section className={style.share_task_container}>
      <div className={style.section_left}>
        <div className={style.brand_title}>
          <PiCodesandboxLogoLight size={25} />
          Pro Manage
        </div>
      </div>
      <div className={style.section_right}>
        {!fetchingData ? (
          <div className={style.section_box}>
            <div className={style.section_up}>
              <span className={style.priority_section}>
                <span
                  className={style.dot}
                  style={{ backgroundColor: `${shareTask?.colour}` }}
                ></span>
                <span className={style.priority_title}>
                  {shareTask.priority}
                </span>
              </span>
              <span className={style.title}>{shareTask?.title}</span>
            </div>
            <div className={style.section_down}>
              <div className={style.checks}>
                <span className={style.checklist_tag}>
                  Checlist({checkCount}/{shareTask?.checklist?.length})
                </span>
              </div>
              <div className={style.checklist_box}>
                {shareTask?.checklist?.map((task, i) => {
                  return (
                    <div key={i} className={style.checklist}>
                      <div className={style.values}>
                        <input
                          type="checkbox"
                          checked={task?.tick === true ? true : false}
                        />
                        <span>{task.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {shareTask?.dueDate && (
              <div className={style.date_section}>
                <span className={style.date_text}>Due Date</span>
                <span className={style.date}>{shareTask?.dueDate}</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            <HashLoader color="#17a2b8" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ShareTask;
