# PLAINBCN-TRAININGS-WEB

Web to keep track of your progress in the internal trainings.

Built with ReactJS. Created with Create-React-App tool.

## Development

### .env
Create a .env.local file overriding .env variables.

### AAD APP
Create an AAD APP representing this web and:
- update its manifest with ```"accessTokenAcceptedVersion": 2```
- in Authentication, mark both Implicit and hybrid flows (Access token and ID Tokens)

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.