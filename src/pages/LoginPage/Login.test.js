import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Login from "./LoginPage";
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom'
// Mock matchMedia for Ant Design components that rely on it


const mockReducer = {
  provider: (state = { users: {}, authedUser: null }) => state, // Simple mock reducer
};

describe('LoginPage', () => {
  let storeMock;
  beforeAll(() => {
    // Mocking window.matchMedia to return a mock function
    global.matchMedia = global.matchMedia || function() {
      return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  beforeEach(() => {
    // Initialize the mock store with a basic state structure
    storeMock = configureStore({
      reducer: mockReducer, // Pass the mock reducer
      preloadedState: { 
        provider: {
          users: {
            user1: { id: "user1", name: "User One" },
            user2: { id: "user2", name: "User Two" },
          },
          authedUser: { id: "user1" }, // Assuming `authedUser` is part of the state
        },
      },
    });
  });
  test('will match snapshot',  () => {
      // eslint-disable-next-line testing-library/render-result-naming-convention
      var component = render(
          <MemoryRouter>
              <Provider store={storeMock}>
              <Login/>
              </Provider>
          </MemoryRouter>
      ) ;
      expect(component).toMatchSnapshot();
  })
  test("renders login page and displays loading spinner initially", async () => {
    render(
      <MemoryRouter>
              <Provider store={storeMock}>
              <Login/>
              </Provider>
          </MemoryRouter>
    );

    // Đảm bảo không có spinner khi component được render hoàn tất
    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
  });

  test("should render the login page with the title and dropdown", () => {
    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // test title and dropdown
    expect(screen.getByText("Please sign in to continue")).toBeInTheDocument();
  });
  test("should display user options in the dropdown", async () => {
        render(
          <Provider store={storeMock}>
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
     test("renders login page and displays loading spinner initially", async () => {
    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
    );
  });
  test("should display user options in the dropdown", async () => {
    render(
      <Provider store={storeMock}>
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

})

 






