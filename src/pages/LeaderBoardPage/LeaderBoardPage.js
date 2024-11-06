import React from "react";
import { Card, Avatar, Typography, Row, Col, Divider } from "antd";
import { useSelector } from "react-redux";

const { Text } = Typography;

const Leaderboard = () => {
  // Accessing data from the Redux store
  const users = useSelector((state) => state.provider.users) || {};
  const quetionSelector = useSelector((state) => state.provider.polls) || [];
  // Function to calculate the score
  const calculateScore = (user) => {
    if (!quetionSelector) {
      return 0; // Return 0 if quetionSelector is not available
    }
    const quetion = Object.values(quetionSelector);
    // Calculate answered questions by checking if the user ID is present in votes
    const answeredQuestions = quetion.filter(
      (item) =>
        item.optionOne.votes.includes(user.id) ||
        item.optionTwo.votes.includes(user.id)
    ).length;
    // Calculate created questions by matching author ID
    const createdQuestions = quetion.filter(
      (item) => item.author === user.id
    ).length;

    return answeredQuestions + createdQuestions;
  };

  // Sort users by score in descending order
  const sortedUsers = Object.values(users).sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  );

  return (
    <div style={{ width: "80%", marginTop: "30px" }}>
      <h1>Leaderboard</h1> {/* Add this line */}
      {sortedUsers.map((user, index) => (
        <Card
          key={user.id}
          style={{
            marginBottom: "20px",
            backgroundColor: "white",
            border: "2px solid #e0e0e0", // Highlight top user
          }}
          bordered
        >
          <Row align="middle">
            {/* Avatar and Username */}
            <Col
              span={5}
              style={{
                textAlign: "center",
                borderRight: "2px solid #e0e0e0",
                marginRight: "10px",
              }}
            >
              <Avatar
                size={100}
                src={user.avatarURL}
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Text strong>{user.name}</Text>
              </div>
            </Col>

            {/* Stats */}
            <Col span={14} style={{ textAlign: "left" }}>
              <div>
                <Text>Answered questions</Text>
                <Text style={{ float: "right", marginRight: "15px" }}>
                  {
                    Object.values(quetionSelector).filter(
                      (item) =>
                        item.optionOne.votes.includes(user.id) ||
                        item.optionTwo.votes.includes(user.id)
                    ).length
                  }
                </Text>
              </div>
              <Divider />
              <div>
                <Text>Created questions</Text>
                <Text style={{ float: "right", marginRight: "15px" }}>
                  {
                    Object.values(quetionSelector).filter(
                      (item) => item.author === user.id
                    ).length
                  }
                </Text>
              </div>
            </Col>

            {/* Score */}
            <Col span={4} style={{ textAlign: "center" }}>
              <Card
                size="small"
                bordered
                style={{
                  width: "100%",
                  borderColor: "rgb(224, 224, 224)",
                }}
              >
                <Text style={{ fontSize: "14px" }}>Score</Text>
                <Divider style={{ margin: "5px 0" }} />
                <Text
                  strong
                  style={{
                    fontSize:
                      index === 0
                        ? "24px"
                        : index === 1
                        ? "22px"
                        : index === 2
                        ? "20px"
                        : "19px",
                    color:
                      index === 0
                        ? "#f27222"
                        : index === 1
                        ? "#1677ff"
                        : index === 2
                        ? "rgb(82, 196, 26)"
                        : "white",
                  }}
                >
                  {calculateScore(user)}
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default Leaderboard;
