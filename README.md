# Minesweeper by Charly client UI

This project contains the User Interface for the [Minesweeper API](https://github.com/totemcaf/ms-api).

You can find it at http://ec2-3-87-195-146.compute-1.amazonaws.com:5000

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Comments for reviewers

This application should not be considered a full production version. It is a simple UI for the companion API.

It has not automatic tests, and it has no server side proxy (backend for front end) to comunicate
the API from backend to backend.

In case the latency to the API were considerable, no provision for blocking user actions until receiving the
response was provided, nor alternative strategy to handle multiple user actions while the request is in progress.

No provision for list of games growing too much is given.

The modularization of view components can be improved.

This application contains a simple API client (ms.js) for the Minesweeper API.
 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

This will deploy your just build project to the remote server.

Open your browser at http://ec2-3-87-195-146.compute-1.amazonaws.com:5000/ and enjoy.
