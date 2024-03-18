import React, { useEffect } from "react";
import Home from "../../Components/Home/Home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  reFatchAlltasksToggle,
  toggle,
  user,
} from "../../Redux/User/UserSlice";
const Homepage = () => {
  let token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();
  const userToggle = useSelector(toggle);
  const handleNavigateToLoginPage = (route) => {
    navigate(route);
  };

  useEffect(() => {
    if (!token) {
      handleNavigateToLoginPage("/login");
    }
  }, [userToggle]);

  if (token) {
    return (
      <div>
        <Home />
      </div>
    );
  }
};

export default Homepage;
