import React from "react";
import { Card, Avatar, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const PollCard = ({ question, user, unanswered }) => {
  // Accessing the specific question using the question_id from the questions object

  // If question or user is undefined, return an error message or a fallback

  if (!question || !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Loading...
        <Spin />
      </div>
    );
  }
  return (
    <Card
      style={{
        borderRadius: "5px",
        margin: "20px 20px 20px 20px",
      }}
      bordered={true}
      title={`${user.name} asks:`}
      type="inner"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          size={100}
          src={user.avatarURL || ""}
          icon={!user.avatarURL ? <UserOutlined /> : null}
          style={{ marginRight: "20px" }}
        />
        <div style={{ flexGrow: 1 }}>
          <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            Would you rather
          </p>
          <p style={{ fontSize: "14px", color: "#888" }}>
            {question.optionOne.text} or {question.optionTwo.text}?
          </p>
        </div>
      </div>
      <Link
        to={`/questions/${question.id}`}
        style={{
          marginTop: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          style={{
            width: "50%",
            backgroundColor: unanswered ? undefined : "#347928",
          }}
        >
          {unanswered ? "Answer Poll" : "View Poll"}
        </Button>
      </Link>
    </Card>
  );
};

export default PollCard;
