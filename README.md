# Quizzy (Quiz Application System)

This Quiz Application System is developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides functionalities for three types of users: Student, Faculty, and Super User. Each user has their own directory within the project structure, and the system is hosted on different ports.

## User Roles and Functionalities

1. **Student**:
   - Login and signup functionality.
   - Browse quizzes and take quizzes.
   - View quiz scores.

2. **Faculty**:
   - Login and signup functionality.
   - Add new quizzes by providing proper questions.

3. **Super User**:
   - Login and signup functionality.
   - Monitor and manage students, faculties, and quizzes.
   - Perform actions like blocking/unblocking users.

## Project Structure

The project is divided into four directories:
1. **Student**: Runs on `http://127.0.0.1:3000`.
2. **Faculty**: Runs on `http://127.0.0.1:4000`.
3. **Super User**: Runs on `http://127.0.0.1:5000`.
4. **Server**: Runs on `http://localhost:8000`.

## Environment Variables

Each user directory (Student, Faculty, Super User) has an `.env` file containing the following environment variable:
- `VITE_SERVER_BASE_URL`: Base URL of the server.

The server directory has its own `.env` file containing the following environment variables:
- `PORT`: Port on which the server runs.
- `MONGODB_URI`: URI of the MongoDB database.
- `JWT_SECRET_KEY`: Secret key used for JWT authentication.

## How to Run the Application

To run each user directory and the server, navigate to their respective directories and execute the following command:

> npm run dev


## Note

Make sure to install the necessary dependencies using `npm install` before running the application.

Feel free to reach out for any further assistance or clarification.

Enjoy using the Quiz Application System!
