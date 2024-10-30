import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Leaderboard from "./LeaderBoardPage";

// Mock matchMedia to prevent issues with Ant Design components
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

// Create a mock store with redux-mock-store
const mockStore = configureStore([]);

describe("Leaderboard Component", () => {
  let store;

  beforeEach(() => {
    // Mock data for users and polls in the Redux store
    store = mockStore({
      provider: {
        users: {
          user1: { id: "user1", name: "User One", avatarURL: "avatar1.jpg" },
          user2: { id: "user2", name: "User Two", avatarURL: "avatar2.jpg" },
        },
        polls: {
          poll1: {
            id: "poll1",
            author: "user1",
            optionOne: { votes: ["user1"], text: "Option 1" },
            optionTwo: { votes: [], text: "Option 2" },
          },
          poll2: {
            id: "poll2",
            author: "user2",
            optionOne: { votes: ["user1", "user2"], text: "Option 1" },
            optionTwo: { votes: [], text: "Option 2" },
          },
        },
      },
    });
  });

  test("should render leaderboard title", () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Check if the "Leaderboard" title is displayed
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });

  test("should display users sorted by score", async () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Check that users appear on the leaderboard
    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();

    // Check that a score label is displayed for each user
    await waitFor(() => {
      const Score = screen.getAllByText(/Score/i);
      expect(Score.length).toBeGreaterThan(0);
    });

    // Check that "Answered questions" and "Created questions" labels are shown
    await waitFor(() => {
      const Answered = screen.getAllByText(/Answered questions/i);
      expect(Answered.length).toBeGreaterThan(0);
    });
    await waitFor(() => {
      const Created = screen.getAllByText(/Created questions/i);
      expect(Created.length).toBeGreaterThan(0);
    });

    // Verify user order (User One has more points, so they should be listed first)
    const userCards = screen.getAllByText(/User/);
    expect(userCards[0]).toHaveTextContent("User One");
    expect(userCards[1]).toHaveTextContent("User Two");
  });
});
