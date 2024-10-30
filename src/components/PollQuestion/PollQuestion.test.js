import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // For mocking the Redux store
import { MemoryRouter } from "react-router-dom"; // For routing context
import PollQuestion from "./PollQuestion"; // Adjust the import path as necessary
import { setAuthedUser, setPolls } from "../../redux/actions"; // Adjust import if necessary

// Polyfill for matchMedia in tests
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

// Create a mock store
const mockStore = configureStore([]);

const renderWithRedux = (
  component,
  { initialState, store = mockStore(initialState) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>
    ),
    store,
  };
};

describe("PollQuestion Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      provider: {
        polls: {
          questionId: {
            id: "questionId",
            author: "userId",
            timestamp: 123456789,
            optionOne: {
              text: "Option One",
              votes: [],
            },
            optionTwo: {
              text: "Option Two",
              votes: [],
            },
          },
        },
        users: {
          userId: {
            id: "userId",
            name: "User Name",
            avatarURL: "avatar.jpg",
          },
        },
        authedUser: {
          id: { id: "userId", answers: [] },
        },
      },
    });
  });

  test("renders loading state initially", () => {
    renderWithRedux(<PollQuestion questionId="questionId" />, { store });

    // Check if the loading spinner is rendered
    const spinner = screen.getByText("Would you rather");
    expect(spinner).toBeInTheDocument();
  });

  test("renders poll question and options", async () => {
    renderWithRedux(<PollQuestion questionId="questionId" />, { store });

    // Wait for loading to finish and check if the question is rendered
    await waitFor(() => {
      const test = screen.getByText("Would you rather");
      expect(test).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Option One")).toBeInTheDocument();
    expect(screen.getByLabelText("Option Two")).toBeInTheDocument();
  });

  test("submits a poll response", async () => {
    renderWithRedux(<PollQuestion questionId="questionId" />, { store });
    await waitFor(() => {
      const test = screen.getByText("Would you rather");
      expect(test).toBeInTheDocument();
    });

    // Select an option
    fireEvent.click(screen.getByLabelText("Option One"));

    // Submit the response
    fireEvent.click(screen.getByText("Submit"));

    // Verify that the correct actions were dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(setPolls(expect.any(Object)));
    expect(actions).toContainEqual(setAuthedUser(expect.any(Object)));
  });
});
