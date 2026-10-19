# Notes/Task API

A REST API for creating and managing notes using Node.js, Express, MongoDB, and Mongoose.

## Features

- CRUD operations for notes
- Request validation using express-validator
- Centralized error handling
- MongoDB ObjectId validation
- Filtering notes by completion status
- Sorting by selected fields
- Pagination with configurable page size
- Consistent JSON responses
- Environment-based configuration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- dotenv

## Setup

1. Clone the repository.
2. Install dependencies:

   `npm install`

3. Create a `.env` file in the project root:

   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development

4. Start the development server:

   `npm run dev`

## API Endpoints

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/health`    | Health check  |
| POST   | `/api/notes`     | Create a note |
| GET    | `/api/notes`     | List notes    |
| GET    | `/api/notes/:id` | Get a note    |
| PATCH  | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Query Parameters

- `completed=true` or `completed=false` — filter by completion status
- `sortBy=createdAt` — select a sort field
- `order=asc` or `order=desc` — choose sort direction
- `page=1` — select the page
- `limit=10` — choose the page size, up to 100

Example:

`GET /api/notes?completed=false&sortBy=createdAt&order=desc&page=1&limit=10`

## Error Handling

The API returns JSON error responses for validation failures, invalid IDs, missing notes, unknown routes, and unexpected server errors.
