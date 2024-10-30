import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, Radio, Button, Avatar, Spin, Progress } from "antd";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { setAuthedUser, setPolls } from "../../redux/actions";
const PollQuestion = ({ questionId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [hasVote, setHasVote] = useState(false);

  // Redux state selectors
  const questions = useSelector((state) => state.provider.polls);
  const users = useSelector((state) => state.provider.users);
  const userAuth = useSelector((state) => state.provider.authedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get question and author information
  const question =
    questions && questions[questionId] ? questions[questionId] : {};
  const author = question ? users[question.author] : null;
  const optionOneVotes = question.optionOne?.votes?.length || 0; // Safely access votes
  const optionTwoVotes = question.optionTwo?.votes?.length || 0;
  const totalVotes = optionOneVotes + optionTwoVotes || 0;
  const optionOnePercent =
    ((optionOneVotes / totalVotes) * 100).toFixed(2) || 0;
  const optionTwoPercent =
    ((optionTwoVotes / totalVotes) * 100).toFixed(2) || 0;
  const userChoice = question.optionOne?.votes
    ? question.optionOne?.votes?.includes(userAuth.id.id)
      ? "optionOne"
      : "optionTwo"
    : "optionOne";
  // Set user data when author is available
  useEffect(() => {
    if (author) {
      setUser(author);
      setLoading(false);
    } else {
      navigate("/nomatch");
      setLoading(false);
    }
  }, [author, navigate]);

  // Check if the user has voted on the poll
  useEffect(() => {
    console.log(question);
    if (userAuth.id !== "" && question) {
      setHasVote(
        question?.optionOne?.votes?.some((item) => item === userAuth?.id?.id) ||
          question?.optionTwo?.votes?.some((item) => item === userAuth?.id?.id)
      );
    }
  }, [question, userAuth]);

  // Handle option change
  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle submit action
  const onSubmit = () => {
    if (selectedOption) {
      // Destructure question data
      const {
        id: questionId,
        author,
        timestamp,
        optionOne,
        optionTwo,
      } = question;

      // Create updated polls object
      const updatedPolls = {
        ...questions,
        [questionId]: {
          id: questionId,
          author,
          timestamp,
          optionOne: {
            ...optionOne,
            votes:
              selectedOption === "optionOne"
                ? [...optionOne.votes, userAuth?.id?.id]
                : optionOne.votes,
          },
          optionTwo: {
            ...optionTwo,
            votes:
              selectedOption === "optionTwo"
                ? [...optionTwo.votes, userAuth?.id?.id]
                : optionTwo.votes,
          },
        },
      };

      // Dispatch updated polls
      dispatch(setPolls(updatedPolls));

      // Update authenticated user's answers
      dispatch(
        setAuthedUser({
          id: userAuth?.id,
          answers: [...(userAuth?.answers || []), question.id],
        })
      );

      // Navigate to home after submission
      navigate("/");
    }
  };

  // Display loading spinner while loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin />
      </div>
    );
  }

  // Show error if question is not found
  if (!question) {
    return <div>Question not found!</div>;
  }
  const handleBack = () => {
    if (!author || !question) {
      return;
    }
    navigate("/");
  };
  return (
    <div>
      {!hasVote ? (
        <Card
          title={`${user ? user.name : "User"} asks:`}
          style={{ width: "80%" }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <Avatar
              size={150}
              src={user?.avatarURL || ""}
              icon={!user?.avatarURL ? <UserOutlined /> : null}
              style={{ marginRight: "20px" }}
            />
            <div>
              <h2>Would you rather</h2>
            </div>
          </div>
          <Radio.Group onChange={onOptionChange}>
            <Radio value="optionOne">{question.optionOne.text}</Radio>
            <Radio value="optionTwo">{question.optionTwo.text}</Radio>
          </Radio.Group>
          <div style={{ marginTop: 16 }}>
            <Button
              type="primary"
              onClick={onSubmit}
              disabled={!selectedOption}
              style={{ width: "100px", textAlign: "center" }}
            >
              Submit
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{`${user ? user.name : "User"} asks:`}</span>
            </div>
          }
          bordered={false}
          style={{ width: "80%" }}
        >
          <div style={{ display: "flex" }}>
            <Avatar
              size={150}
              src={user?.avatarURL || ""}
              icon={!user?.avatarURL ? <UserOutlined /> : null}
              style={{ marginRight: "20px", justifyItems: "center" }}
            />
            <div style={{ width: "100%" }}>
              <h3>Result</h3>
              {/* First poll option */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{question?.optionOne?.text}</span>
                  {userChoice === "optionOne" && (
                    <span>
                      <CheckCircleOutlined style={{ color: "orange" }} /> your
                      choice
                    </span>
                  )}
                </div>
                <Progress percent={optionOnePercent} strokeColor="green" />
                <p>
                  {optionOneVotes} out of {totalVotes} votes
                </p>
              </div>

              {/* Second poll option */}
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{question?.optionTwo?.text}</span>
                  {userChoice === "optionTwo" && (
                    <span>
                      <CheckCircleOutlined style={{ color: "orange" }} /> your
                      choice
                    </span>
                  )}
                </div>
                <Progress percent={optionTwoPercent} />
                <p>
                  {optionTwoVotes} out of {totalVotes} votes
                </p>
              </div>
              <Button
                type="default"
                style={{ marginTop: 10 }}
                onClick={handleBack}
              >
                Back
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PollQuestion;
