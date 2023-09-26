# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Setup

1. Clone the repository:

   git clone https://github.com/miroslavjagodic/react-crud-json-server.git

   cd your-project

2. Install dependencies:

   npm install

3. Start the React app:

   npm start

4. Start JSON server

   npm run start-server

## Project Structure

`src/` Contains the React application code.
`hooks` React query hooks to fetch the data.
`typings` Types
`utils` Helper functions and enums
`db.json` JSON file used by json-server to serve data.
`server.js` Handling CORS policy

## Note

- Filter by industry is not implemented due to the lack of time, but implementation and approach can be discussed
- Code is not cover by tests

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start-server`

Open [http://localhost:8000/customers](http://localhost:8000/customers) to view it in the browser.

The page will show customer data.\

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
