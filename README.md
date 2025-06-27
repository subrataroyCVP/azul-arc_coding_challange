# MERN Stack - Employee Management System

This is a full-stack employee management application built with the MERN stack. It features a React frontend with Material-UI and React-Hook-Form.

## Features

-   View all employees.
-   Add a new employee with name, email, DOB, address, and photo.
-   Update existing employee information using the same form modal.
-   Delete an employee.
-   Robust form validation using React-Hook-Form.
-   Photo uploads handled as base64 strings.
-   Modern UI built with Material-UI.

## Tech Stack

-   **Frontend:** React, Hooks, Context API, Axios, Material-UI, React-Hook-Form
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with Mongoose)

## Project Structure
```
/
|----- client/ # React Frontend
|----- server/ # Node.js/Express Backend
```
## Setup & Installation

### Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB (local or Atlas)
- `@mui/icons-material` for icons

### 1. Running Both Concurrently (Recommended)

- Add environment variables based on example files:
  ```sh
  chmod +x setup_env.sh
  bash setup_env.sh
  ```
- Install all dependencies:
  ```sh
  npm install-dev
  ```
- Start both server and client:
  ```sh
  npm run dev
  ```

### 2. Backend Setup (Manual)

```sh
cd server
cp .env.example .env 
npm install
npm run dev
```

### 3. Frontend Setup (Manual)

```sh
cd client
cp .env.example .env
npm install
npm start
```

