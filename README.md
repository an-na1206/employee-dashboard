# Employee App — Backend Integration (Assignment 3)

Employee management app with a React (Vite) frontend and a Node.js + Express + MongoDB backend.

## Tech Stack
- **Frontend:** React 19 + Vite (pre-built `dist` bundle, served by the backend)
- **Backend:** Node.js, Express, Mongoose — all backend code lives in `app/app.js`
- **Database:** MongoDB (MongoDB Atlas)

## Setup
1. Install dependencies:
   ```
   cd app
   yarn install
   ```
2. Create a `.env` file (see `.env.example`) and add your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
   PORT=5000
   ```
3. Start the server (serves the API and the frontend build):
   ```
   node app.js
   ```
   The app runs on `http://localhost:5000`.

## API Endpoints
| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/api/employees`        | Get all employees               |
| GET    | `/api/employees/:id`    | Get a single employee by id     |
| POST   | `/api/employees`        | Add a new employee              |
| PUT    | `/api/employees/:id`    | Update an employee by id        |
| DELETE | `/api/employees/:id`    | Delete an employee by id        |

## Notes
- All backend code (schema, model, routes, server) is written in `app/app.js`.
- The frontend build (`dist`) is served statically by the same server; the given frontend source/build is not modified.
