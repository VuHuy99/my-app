# Would You Rather

## Overview

The **Would You Rather** project is a web application built with React that allows users to participate in polling questions. Users can create, view, and answer "Would You Rather" questions. The app is designed with a user-friendly interface and is powered by Redux for state management.

## Features

- User authentication
- Creation of new polls
- Viewing of answered and unanswered polls
- Leaderboard displaying user rankings
- Responsive design with Ant Design components
- Error handling with a user-friendly NoMatch page for invalid routes

## Technologies Used

- React
- React Router
- Redux
- Ant Design
- Jest for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/would-you-rather.git
   Navigate into the project directory:
   ```

bash
Copy code
cd would-you-rather
Install the dependencies:

bash
Copy code
npm install
Running the Application
To start the development server, run:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000 to view the application.

Running Tests
This project uses Jest for testing. To run the tests, use the following command:

bash
Copy code
npm test
You can run tests in watch mode by pressing W during the test run.

Folder Structure
bash
Copy code
/would-you-rather
├── /public
├── /src
│ ├── /components
│ │ ├── Navbar
│ │ ├── PollQuestion
│ │ └── UserCard
│ ├── /pages
│ │ ├── Home
│ │ ├── NewPollPage
│ │ ├── LeaderBoardPage
│ │ ├── LoginPage
│ │ └── NoMatch
│ ├── /redux
│ │ ├── actions.js
│ │ └── reducers.js
│ ├── /services
│ │ └── \_DATA.js
│ ├── App.js
│ └── index.js
└── package.json
Usage
Login: Users can log in to the application. If they are not authenticated, they will be redirected to the login page.
Create Poll: Authenticated users can create new "Would You Rather" questions.
Answer Polls: Users can view and answer existing polls.
Leaderboard: Users can see the leaderboard ranking based on the number of answered polls.
Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.# Would You Rather

## Overview

The **Would You Rather** project is a web application built with React that allows users to participate in polling questions. Users can create, view, and answer "Would You Rather" questions. The app is designed with a user-friendly interface and is powered by Redux for state management.

## Features

- User authentication
- Creation of new polls
- Viewing of answered and unanswered polls
- Leaderboard displaying user rankings
- Responsive design with Ant Design components
- Error handling with a user-friendly NoMatch page for invalid routes

## Technologies Used

- React
- React Router
- Redux
- Ant Design
- Jest for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/would-you-rather.git
   Navigate into the project directory:
   ```

bash
Copy code
cd would-you-rather
Install the dependencies:

bash
Copy code
npm install
Running the Application
To start the development server, run:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000 to view the application.

Running Tests
This project uses Jest for testing. To run the tests, use the following command:

bash
Copy code
npm test
You can run tests in watch mode by pressing W during the test run.

Folder Structure
bash
Copy code
/would-you-rather
├── /public
├── /src
│ ├── /components
│ │ ├── Navbar
│ │ ├── PollQuestion
│ │ └── UserCard
│ ├── /pages
│ │ ├── Home
│ │ ├── NewPollPage
│ │ ├── LeaderBoardPage
│ │ ├── LoginPage
│ │ └── NoMatch
│ ├── /redux
│ │ ├── actions.js
│ │ └── reducers.js
│ ├── /services
│ │ └── \_DATA.js
│ ├── App.js
│ └── index.js
└── package.json
Usage
Login: Users can log in to the application. If they are not authenticated, they will be redirected to the login page.
Create Poll: Authenticated users can create new "Would You Rather" questions.
Answer Polls: Users can view and answer existing polls.
Leaderboard: Users can see the leaderboard ranking based on the number of answered polls.
Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.
