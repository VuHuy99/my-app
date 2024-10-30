import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import NewPoll from "./NewPollPage";
import { waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
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
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    store = mockStore({
      provider: {
        authedUser: "", // Change this to test authenticated states
      },
    });
  });
  const reactRedux = { useDispatch, useSelector };
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  test("renders loading spinner initially", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/newpoll"]}>
          <NewPoll />
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
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/newpoll"]}>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );
    // Wait for the loading spinner to disappear
    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
    // Check if HomePage is rendered
    expect(screen.getByText(/create a new poll/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter option one.../i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter option two.../i)
    ).toBeInTheDocument();
  });

  test("submit button test", async () => {
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    store.dispatch = mockDispatch;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );

    // Fill in the form

    const submit = screen.getByRole("button", { name: /Submit/i });
    expect(submit).toBeInTheDocument();
  });
  test("does not submit the form with empty inputs", () => {
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    store.dispatch = mockDispatch;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPoll />
        </MemoryRouter>
      </Provider>
    );
    // Try to submit the form without filling inputs
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check that the dispatch function was not called
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
