# wecca-website (wecca.org)
## Local Repo Setup (assuming you have NodeJS and NPM installed already):
- `git clone https://github.com/weccasoftware/wecca-website`
- `cd frontend`
  - `npm install`
  - `npm i slick-carousel react-slick font-awesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons`
- `cd backend`
  - `npm install`

### Two secrets file to deal with:
- `backend/secret.js` -> ask a dev
- `frontend/secrets.js` -. locally remove the dependency
 - In `Mail.js`, remove `import { MAIL_ACCOUNT } from "../secrets"`
   - Change `USERNAME: MAIL_ACCOUNT.Username` to `USERNAME: ""`
   - Change `PASSWORD: MAIL_ACCOUNT.Username` to `PASSWORD: ""`

## How to Locally Run: 
- `cd frontend`
  - `npm run start`
- `cd backend`
  - `npx nodemon index.js` <br/>
*Note that when you make changes to the server, you should modify the backend/index.js file and not the functions/index.js file.

## How to deploy to Firebase:
- Ensure you have a Firebase account with the Blaze plan set up (has already been set up, no need to worry until issue with pay as you go, though we haven't been close to paying).
- Check out the project in Firebase console to monitor the deployment
- Run `npm i -g firebase-tools` to install the Firebase Toolkit.
- Run `firebase login` to log in.
- Note: You likely don't need to run `firebase init` since `firebase.json` already exists.
- For any changes made to `backend/index.js`, copy them into `functions/index.js`.
- After making changes to the frontend, run `npm run build` in the `frontend` directory.
- Deploy changes to Firebase using `firebase deploy` (deploying to both functions and hosting).
