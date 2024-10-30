import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PollCard from "./UserCard";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
describe("PollCard Component", () => {
  const mockQuestion = {
    id: "question1",
    optionOne: { text: "Option One" },
    optionTwo: { text: "Option Two" },
  };

  const mockUser = {
    name: "User One",
    avatarURL: "avatar1.jpg",
  };

  test("should render a loading spinner if question or user is undefined", () => {
    render(
      <Router>
        <PollCard question={null} user={null} unanswered={true} />
      </Router>
    );

    // Check for the loading spinner
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("should render the user's name and poll question", () => {
    render(
      <Router>
        <PollCard question={mockQuestion} user={mockUser} unanswered={true} />
      </Router>
    );

    // Check for the user's name
    expect(screen.getByText("User One asks:")).toBeInTheDocument();

    // Check for the poll question text
    expect(screen.getByText("Would you rather")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockQuestion.optionOne.text} or ${mockQuestion.optionTwo.text}?`
      )
    ).toBeInTheDocument();
  });

  test("should render Answer Poll button when unanswered is true", () => {
    render(
      <Router>
        <PollCard question={mockQuestion} user={mockUser} unanswered={true} />
      </Router>
    );

    // Check for the "Answer Poll" button
    const answerButton = screen.getByRole("button", { name: /Answer Poll/i });
    expect(answerButton).toBeInTheDocument();
  });

  test("should render View Poll button when unanswered is false", () => {
    render(
      <Router>
        <PollCard question={mockQuestion} user={mockUser} unanswered={false} />
      </Router>
    );

    // Check for the "View Poll" button with custom styling
    const viewButton = screen.getByRole("button", { name: /View Poll/i });
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toHaveStyle("background-color: #347928");
  });
});
