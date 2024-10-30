import React, { useState } from "react";
import { Card, Input, Button, Divider, Typography, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPolls } from "../../redux/actions"; // Assuming setPolls action is defined in the redux actions
import { generateUID } from "../../services/_DATA"; // Import the generateUID function
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Title } = Typography;

const NewPoll = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [loading, setLoading] = useState(false);

  // Redux hooks
  const authUser = useSelector((state) => state.provider.authedUser);
  const polls = useSelector((state) => state.provider.polls);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = () => {
    if (optionOne.trim() === "" || optionTwo.trim() === "") {
      return; // Ensure fields are not empty before submitting
    }

    // Create a new poll question object
    const newQuestion = {
      id: generateUID(), // Generate a unique ID
      author: authUser?.id?.id, // Use the authenticated user's ID
      timestamp: Date.now(), // Set the current timestamp
      optionOne: {
        votes: [],
        text: optionOne,
      },
      optionTwo: {
        votes: [],
        text: optionTwo,
      },
    };

    // Update the polls state with the new question
    const updatedPolls = {
      ...polls,
      [newQuestion.id]: newQuestion,
    };

    // Dispatch the updated polls to the redux store
    dispatch(setPolls(updatedPolls));

    setLoading(true);

    // Simulate a delay
    setTimeout(() => {
      setLoading(false);
      setOptionOne("");
      setOptionTwo("");
      navigate("/"); // Navigate back to the home page after submission
    }, 1000);
  };

  return (
    <Card title="Create a New Poll" style={{ width: "80%", marginTop: "50px" }}>
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item>
          <Title level={4}>Would you rather...</Title>
        </Form.Item>
        <Form.Item
          name="optionOne"
          rules={[{ required: true, message: "Please enter option one" }]}
        >
          <Input
            placeholder="Enter option one..."
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
          />
        </Form.Item>

        <Divider>OR</Divider>

        <Form.Item
          name="optionTwo"
          rules={[{ required: true, message: "Please enter option two" }]}
        >
          <Input
            placeholder="Enter option two..."
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            disabled={!optionOne || !optionTwo}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewPoll;
