import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import { Tabs, Spin, Alert } from "antd";
import PollCard from "../../components/UserCard/UserCard"; // Assuming UserCard is PollCard

const Home = () => {
  const [view, setView] = useState("unanswered");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authUser = useSelector((state) => state.provider.authedUser);
  const userSelector = useSelector((state) => state.provider.users);
  const pollSelector = useSelector((state) => state.provider.polls);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await pollSelector;
        setQuestions(
          Object.values(questionsData).sort((a, b) => b.timestamp - a.timestamp)
        );
      } catch (err) {
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [pollSelector]);

  const filteredQuestions = questions.filter((q) => {
    // Check if authUser has answers

    if (authUser?.id === "" || authUser?.answers?.length === 0) {
      return false;
    }

    // Check if the question has been answered by the authUser
    const answered =
      q?.optionOne?.votes?.some((item) => item === authUser?.id?.id) ||
      q?.optionTwo?.votes?.some((item) => item === authUser?.id?.id);

    // Return questions based on the selected view
    return view === "unanswered" ? !answered : answered;
  });
  const tabItems = [
    {
      key: "unanswered",
      label: "Unanswered",
      children: (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <li key={q.id}>
                <PollCard
                  question={q}
                  user={userSelector[q.author]}
                  unanswered={true}
                />
              </li>
            ))
          ) : (
            <span>No unanswered questions!</span>
          )}
        </ul>
      ),
    },
    {
      key: "answered",
      label: "Answered",
      children: (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <li key={q.id}>
                <PollCard
                  question={q}
                  user={userSelector[q.author]}
                  unanswered={false}
                />
              </li>
            ))
          ) : (
            <span>No answered questions!</span>
          )}
        </ul>
      ),
    },
  ];
  const onChange = (value) => {
    setView(value); // Set the view based on the selected tab
  };
  return (
    <div className="homePage">
      {loading && <Spin />}
      {error && <Alert message={error} type="error" />}
      {!loading && !error && (
        <Tabs
          defaultActiveKey="unanswered"
          onChange={onChange}
          centered
          items={tabItems}
          type="card"
        />
      )}
    </div>
  );
};

export default Home;
