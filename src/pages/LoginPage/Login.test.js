import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "./LoginPage";

// Mock matchMedia for Ant Design components that rely on it
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

const mockStore = configureStore([]);
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("App Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      provider: {
        users: {
          user1: { id: "user1", name: "User One" },
          user2: { id: "user2", name: "User Two" },
        },
      },
    });
  });

  test("renders login page and displays loading spinner initially", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Đảm bảo không có spinner khi component được render hoàn tất
    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
  });

  test("should render the login page with the title and dropdown", () => {
    store = mockStore({
      provider: {
        authedUser: { id: "user1", answers: [] },
        users: {
          user1: { id: "user1", name: "User One" },
          user2: { id: "user2", name: "User Two" },
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // test title và dropdown
    expect(screen.getByText("Please sign in to continue")).toBeInTheDocument();
  });

  test("should display user options in the dropdown", async () => {
    store = mockStore({
      provider: {
        authedUser: { id: "user1", answers: [] },
        users: {
          user1: { id: "user1", name: "User One" },
          user2: { id: "user2", name: "User Two" },
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // test dropdown
    const select = screen.getByText("Select a user");
    expect(select).toBeInTheDocument();

    fireEvent.mouseDown(select);

    await waitFor(() => {
      expect(screen.getByText("User One")).toBeInTheDocument();
    });
  });
});
