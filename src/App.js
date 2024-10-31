import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Import Routes instead of Switch
import HomePage from "./pages/Home/Home";
import NewPollPage from "./pages/NewPollPage/NewPollPage";
import LeaderBoardPage from "./pages/LeaderBoardPage/LeaderBoardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NoMatch from "./pages/NoMatch/NoMatch";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { _getUsers, _getQuestions } from "./services/_DATA";
import { setUsers, setPolls, logoutUser, setBadId } from "./redux/actions";
import PollQuestion from "./components/PollQuestion/PollQuestion";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";
function App() {
  const authedUser = useSelector((state) => state.provider.authedUser);
  const questions = useSelector((state) => state.provider.polls);
  const users = useSelector((state) => state.provider.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authedUserState, setAuthedUserState] = useState("");
  const location = useLocation();
  useEffect(() => {
    _getUsers().then((users) => {
      dispatch(setUsers(users));
    });
    _getQuestions().then((questions) => {
      dispatch(setPolls(questions));
    });
  }, [dispatch]);

  useEffect(() => {
    const currentPath = location.pathname;
    // Check for exact matches

    // If route is "/questions", check for "/questions/:question_id"
    if (currentPath.startsWith("/questions/")) {
      const questionId = currentPath.slice(11);
      const question =
        questions && questions[questionId] ? questions[questionId] : {};
      const author = question ? users[question.author] : null;
      console.log(currentPath);
      console.log(questionId);
      console.log(author);
      if (!author) {
        console.log("badi");
        dispatch(setBadId(true));
      }
    }

    dispatch(logoutUser());
  }, [performance?.navigation?.type === 1]);

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
