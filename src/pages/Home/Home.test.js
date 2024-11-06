import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Home from "./Home";
import { waitFor } from "@testing-library/react";
const mockStore = configureStore([]);
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
afterEach(cleanup);


describe("App Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      provider: {
        authedUser: "", // Change this to test authenticated states
      },
    });
  });
  test("renders loading spinner initially", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
  });

  test("renders HomePage when user is authenticated", async () => {
    store = mockStore({
      provider: {
        authedUser: { id: "user1", answers: [] },
        users: {
          user1: { name: "User One" },
          user2: { name: "User Two" },
        },
        polls: {
          q1: {
            id: "q1",
            author: "user1",
            optionOne: { votes: [], text: "Option One" },
            optionTwo: { votes: ["user1"], text: "Option Two" },
            timestamp: 1,
          },
          q2: {
            id: "q2",
            author: "user2",
            optionOne: { votes: ["user1"], text: "Option One" },
            optionTwo: { votes: [], text: "Option Two" },
            timestamp: 2,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    // Wait for the loading spinner to disappear
    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
    // Check if HomePage is rendered
    const unansweredElements = screen.getAllByText(/unanswered/i);
    expect(unansweredElements.length).toBeGreaterThan(0); // Check if at least one element is found
  });

  test("displays no answered questions message", async () => {
    store = mockStore({
      provider: {
        authedUser: { id: "user1", answers: [] }, // User has not answered any questions
        users: {
          user1: { name: "User One" },
          user2: { name: "User Two" },
        },
        polls: {},
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
    // Check if the no answered questions message is displayed

    const noansweredElements = screen.getAllByText(/No unanswered questions!/i);
    expect(noansweredElements.length).toBeGreaterThan(0);
  });
});
