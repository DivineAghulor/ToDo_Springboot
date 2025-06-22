# ToDo_AI Spring Boot API Documentation

## Prerequisites
- Java 24+
- Maven
- MySQL (running, with a database named `todo_ai`)

## Setup & Run
1. **Configure Database:**
   - Edit `src/main/resources/application.properties` with your MySQL username, password, and (optionally) JWT secret.
2. **Build & Run:**
   - In the project root, run:
     ```
     mvnw clean spring-boot:run
     ```
   - The app will start on `http://localhost:8080` by default.
3. **Database Migration:**
   - Flyway will auto-run migrations on startup.

## Authentication
- Register a user via `POST /api/users`.
- Login via `POST /api/auth/login` to receive a JWT token.
- For protected endpoints, add header:
  ```
  Authorization: Bearer <your-jwt-token>
  ```

## Endpoints

### User Endpoints
- `POST /api/users` — Register a new user
  - Request body: `{ "username": "string", "password": "string", "email": "string" }`
  - Response: User details (no password)
- `GET /api/users/{id}` — Get user details (JWT required)
- `PUT /api/users/{id}` — Update user (JWT required)
- `DELETE /api/users/{id}` — Delete user (JWT required)

### Auth Endpoint
- `POST /api/auth/login` — Login
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "<jwt>" }`

### Task Endpoints (JWT required)
- `POST /api/users/{userId}/tasks` — Create a new task
  - Request body: `{ "title": "string", "description": "string", "dueDate": "YYYY-MM-DD" }`
- `GET /api/users/{userId}/tasks` — List all tasks for user
- `GET /api/users/{userId}/tasks?completed=true|false` — Filter tasks by completion
- `GET /api/users/{userId}/tasks/{taskId}` — Get a specific task
- `PUT /api/users/{userId}/tasks/{taskId}` — Update a task
  - Request body: `{ "title": "string", "description": "string", "dueDate": "YYYY-MM-DD", "completed": true|false }`
- `DELETE /api/users/{userId}/tasks/{taskId}` — Delete a task

## Error Handling
- All errors return JSON with `status`, `error`, and `message` fields.
- Validation errors return a map of field names to error messages.

## Testing
- Use tools like Postman, Insomnia, or curl to test endpoints.
- Register, login, and use the JWT for all protected routes.

## Logging
- Logs are output to the console by default (see `UserService`, `TaskService`, controllers).

---
For further details, see the code and comments in each controller and service.
