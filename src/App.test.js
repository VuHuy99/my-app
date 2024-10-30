import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import App from "./App";
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
        authedUser: null, // Change this to test authenticated states
      },
    });
  });
  test("renders loading spinner initially", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );

    // Check if LoginPage is rendered
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Adjust based on actual content of LoginPage
  });

  test("renders HomePage when user is authenticated", async () => {
    store = mockStore({
      provider: {
        authedUser: { id: "user123" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    // Wait for the loading spinner to disappear
    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
    // Check if HomePage is rendered
    expect(screen.getByText(/home/i)).toBeInTheDocument(); // Adjust based on actual content of HomePage
  });
});
