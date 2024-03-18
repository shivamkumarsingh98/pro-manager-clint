import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Register from "./Components/Register/Register";
import Homepage from "./Pages/HomePage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllCreatedTasksInfoAsync,
  getUserAllTasksAsync,
  getUserAsync,
  reFatchAlltasksToggle,
} from "./Redux/User/UserSlice";
import { useContext, useEffect } from "react";
import { getUserAllCreatedTasksInfo } from "./Redux/User/UserAPI";
import ShareTaskPage from "./Pages/ShareTaskPage/ShareTaskPage";
function App() {
  const dispatch = useDispatch();
  const userToggle = useSelector(reFatchAlltasksToggle);
  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getUserAllTasksAsync());
    dispatch(getUserAllCreatedTasksInfoAsync());
  }, [userToggle]);

  return (
    <div className="app-container">
      <div className="app-section">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/share/task/:taskId" element={<ShareTaskPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
