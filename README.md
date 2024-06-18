# Company Task Management System

Welcome to the Company Task Management System! This system allows efficient management of users and task assignments within our organization. The backend is built with Flask, a Python web framework, providing robust and scalable API endpoints. On the frontend, we utilize React with TypeScript for a modern and type-safe user interface.

## Features

- **User Management**: Manage users including creation, update, deletion, and retrieval of user details.
- **Task Assignment**: Assign tasks to users with due dates, descriptions, and statuses (e.g., in progress, completed).
- **Department Management**: Organize users into departments for streamlined collaboration.
- **Dashboard**: Provides insights into task completion rates, departmental performance, and pending tasks.

## Technologies Used

- **Backend**: Flask, SQLAlchemy (ORM for database operations), Flask-RESTful (API development)
- **Frontend**: React, TypeScript, Axios (HTTP client for making API requests)
- **Database**: SQLite (for development), PostgreSQL (recommended for production)

## Installation

### Prerequisites

- Python 3.7+
- Node.js 12+
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Ngaremaina/Company-System
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```


4. Run the Flask application:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```

3. Start the React development server:
   ```bash
   npm start  # or yarn start
   ```

4. Access the application in your browser at `http://localhost:3000`.

## API Endpoints

- **GET /users**: Fetch all users.
- **POST /users**: Create a new user.
- **GET /users/:id**: Fetch user details by ID.
- **PATCH /users/:id**: Update user details.
- **DELETE /users/:id**: Delete user by ID.
- **GET /tasks**: Fetch all tasks.
- **POST /tasks**: Create a new task.
- **GET /tasks/:id**: Fetch task details by ID.
- **PATCH /tasks/:id**: Update task details.
- **DELETE /tasks/:id**: Delete task by ID.
- **GET /departments**: Fetch all departments.
- **POST /departments**: Create a new department.
- **GET /departments/:id**: Fetch department details by ID.
- **PATCH /departments/:id**: Update department details.
- **DELETE /departments/:id**: Delete department by ID.


## License

This project is licensed under the Apache License - see the LICENSE file for details.
