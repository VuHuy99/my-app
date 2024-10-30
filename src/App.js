import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import HomePage from "./pages/Home/Home";
import NewPollPage from "./pages/NewPollPage/NewPollPage";
import LeaderBoardPage from "./pages/LeaderBoardPage/LeaderBoardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NoMatch from "./pages/NoMatch/NoMatch";

import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { _getUsers, _getQuestions } from "./services/_DATA";
import { setUsers, setPolls } from "./redux/actions";
import PollQuestion from "./components/PollQuestion/PollQuestion";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";

function App() {
  const authedUser = useSelector((state) => state.provider.authedUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authedUserState, setAuthedUserState] = useState("");

  useEffect(() => {
    _getUsers().then((users) => {
      dispatch(setUsers(users));
    });
    _getQuestions().then((questions) => {
      dispatch(setPolls(questions));
    });
  }, [dispatch]);

  useEffect(() => {
    if (authedUser) {
      setAuthedUserState(authedUser.id);
    }
    setLoading(false);
  }, [authedUser]);
  return (
    <div className="app">
      {loading ? (
        <Spin />
      ) : authedUserState === "" ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        <Fragment>
          <Navbar authedUser={authedUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions/bad_id" element={<NoMatch />} />
            <Route
              path="/questions/:question_id"
              element={<PollQuestionWrapper />}
            />
            <Route path="*" element={<NoMatch />} />
            <Route path="/newpoll" element={<NewPollPage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/nomatch" element={<NoMatch />} />
          </Routes>
        </Fragment>
      )}
    </div>
  );
}

function PollQuestionWrapper() {
  const { question_id } = useParams();
  return <PollQuestion questionId={question_id} />;
}

export default App;
