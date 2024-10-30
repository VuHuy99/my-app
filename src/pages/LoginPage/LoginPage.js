// pages/LoginPage.js
import { Col, Row, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthedUser } from "../../redux/actions";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [usersOption, setUsersOption] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Get the users from the Redux store
  const usersSelector = useSelector((state) => state.provider.users);

  // Populate the user options for the dropdown
  useEffect(() => {
    if (usersSelector) {
      const listUser = Object.values(usersSelector).map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsersOption(listUser);
    }
  }, [usersSelector]);

  // Handle selection change from the dropdown
  const handleChange = (value) => {
    setSelectedUser(value);
  };

  // Handle login when the user submits the form
  const handleLogin = (e) => {
    e.preventDefault();

    // Find the user based on the selectedUser (id)
    const user = Object.values(usersSelector).find(
      (user) => user.id === selectedUser
    );

    if (user) {
      dispatch(setAuthedUser({ id: user, answer: [] }));
      navigate("/");
    }
  };

  return (
    <div className="Loginpage" align="center">
      <Row gutter={[16, 16]} className="table">
        <Col span={24} className="title">
          <span className="title-content">
            Welcome to the Would You Rather App!
          </span>
          <span>Please sign in to continue</span>
        </Col>
        <Col span={24}>
          <img
            src="/images/avatars/avatars.jpg"
            alt="Avatar"
            className="imageAvatars"
          />
        </Col>
        <Col span={24}>
          <span
            style={{ color: "#FF6600", fontWeight: "bold", fontSize: "18px" }}
          >
            Sign In
          </span>
        </Col>
        <Col span={24}>
          <form className="form">
            <div>
              {/* User selection dropdown */}
              <Select
                placeholder="Select a user"
                onChange={handleChange}
                options={usersOption}
                value={selectedUser || undefined}
              />
            </div>
            <div>
              {/* Login button, disabled if no user is selected */}
              <Button
                type="primary"
                onClick={handleLogin}
                disabled={!selectedUser}
              >
                Login
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
