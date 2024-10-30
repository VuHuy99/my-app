// Navbar.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./Navbar"; // Adjust the path to your Navbar component
import { logoutUser } from "../../redux/actions"; // Adjust the path to your actions
import configureStore from "redux-mock-store"; // For mocking the Redux store

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
// Mock the Redux store and authUser state

const mockStore = configureStore([]);
describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      provider: {
        authedUser: {
          id: "user1",
          name: "Test User",
          avatarURL: "avatar1.jpg",
        },
      },
    });
  });

  test("renders Navbar with links and logout button", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Check if navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("New Poll")).toBeInTheDocument();
    expect(screen.getByText("Leader Board")).toBeInTheDocument();

    // Check if the logout button is rendered
    expect(
      screen.getByRole("button", { name: /Log out/i })
    ).toBeInTheDocument();

    // Check if the user info is displayed
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test("handles logout button click", () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch; // Mock dispatch function

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Click the logout button
    fireEvent.click(screen.getByRole("button", { name: /Log out/i }));

    // Check if the logout action was dispatched
    expect(dispatch).toHaveBeenCalledWith(logoutUser());
  });
});
