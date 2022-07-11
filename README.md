# Bottlenote


[Live on Heroku!](https://bottlenote-app.herokuapp.com/)

## About
Bottlenote is an Evernote clone created by Matilda Zhang. Users can demo the app via a demo user, create a new account to use the app, or download the app and run it locally.

In its current state, Bottlenote allows users to create, read, update, and delete notes stored inside notebooks (which the user may also create, read, and delete). Notes that are deleted are stored in a Trash component from which users may restore them or delete them permanently. Data is unique to each user and cannot be accessed by any other user.

Text can be edited using the rich-text editor, Quill for React (documentation and source can be found at https://github.com/zenoamaro/react-quill).

### Splash Page: 
![image](https://user-images.githubusercontent.com/99449721/177308663-862989b7-2045-4105-b8b6-c17ad32a6841.png)

### Home Page:
![image](https://user-images.githubusercontent.com/99449721/177308843-655bbd8f-69ac-4059-b86c-6d72e20e6756.png)

### Note Page Example:
![image](https://user-images.githubusercontent.com/99449721/177311140-4f5f9b0e-983a-477f-95d5-416d719a3873.png)

## Technologies Used
This project was written in JavaScript and built using the PERN stack: PostgreSQL, Express, React, and Node.js.

This app's state is managed using Redux.

Additional languages include HTML5 & CSS.

## Downloading Bottlenote

1. Clone the repo by running this terminal command:
`git clone https://github.com/matilda-142857/bottlenote.git`

2. Use the command `npm install` to install all dependencies in both the frontend and backend root folders.

2. Setup a PSQL user to match your .env file.

3. Migrate and seed the database using the following script in the backend: `npm run reset`

4. Run `npm start` in both the backend and frontend folders.

5. Navigate your browser to localhost:3000.

## Future Features:
* Implementation of tags
* Allowing transferral of notes between folders
* Ability to export notes to other users or platforms
