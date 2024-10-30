import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { PoweroffOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((state) => state.provider.authedUser); // Adjusted selector
  const [user, setUser] = useState("");
  // Set initial key based on current URL
  const getInitialKey = () => {
    switch (location.pathname) {
      case "/newpoll":
        return "2";
      case "/leaderboard":
        return "3";
      default:
        return "1";
    }
  };
  const keyinit = getInitialKey();
  useEffect(() => {
    if (authUser.id !== "") {
      setUser(authUser);
    }
  }, []);

  useEffect(() => {
    if (authUser.id !== "") {
      setUser(authUser);
    }
  }, [authUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  const handleOnChange = (key) => {
    // Navigate based on the selected tab
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/newpoll");
        break;
      case "3":
        navigate("/leaderboard");
        break;
      default:
        navigate("/");
    }
  };

  const items = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      label: <Link to="/newpoll">New Poll</Link>,
    },
    {
      key: "3",
      label: <Link to="/leaderboard">Leader Board</Link>,
    },
  ];

  const OperationsSlot = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {authUser !== "" && (
        <>
          <img
            src={user?.id?.avatarURL}
            alt={user?.id?.name}
            style={{ borderRadius: "50%", width: "70px", height: "70px" }}
          />
          <span style={{ marginLeft: "-5px", marginRight: "10px" }}>
            {user?.id?.name}
          </span>
        </>
      )}
      <Button type="primary" icon={<PoweroffOutlined />} onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );

  return (
    <nav className="nav">
      <Tabs
        defaultActiveKey={undefined}
        items={items}
        onChange={handleOnChange}
        tabBarExtraContent={OperationsSlot}
      />
    </nav>
  );
};

export default Navbar;
