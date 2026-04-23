# API Testing Plan - Math Platform

## Base URL
`http://localhost:5000/api`

## 1. Math Problems Tests (`/problems`)

| Test Case | Method | Endpoint | Body / Query | Expected Status | Expected Result |
|-----------|--------|----------|---------------|------------------|------------------|
| Create Problem | POST | `/problems` | `{ "question": "...", "answer": "...", "difficulty": "easy", "category": "..." }` | 201 Created | Object with `_id` |
| Get All | GET | `/problems` | None | 200 OK | Array of problems |
| Filter by Difficulty | GET | `/problems?difficulty=hard` | None | 200 OK | Only 'hard' problems |
| Get by ID | GET | `/problems/:id` | None | 200 OK | Single problem object |
| Update Problem | PUT | `/problems/:id` | `{ "answer": "Updated Answer" }` | 200 OK | Updated problem object |
| Delete Problem | DELETE | `/problems/:id` | None | 200 OK | Success message |
| Invalid ID | GET | `/problems/invalidid` | None | 400 Bad Request | "Invalid ID" message |
| Not Found | GET | `/problems/nonexistentid` | None | 404 Not Found | "Problem not found" |

## 2. Users Tests (`/users`)

| Test Case | Method | Endpoint | Body / Query | Expected Status | Expected Result |
|-----------|--------|----------|---------------|------------------|------------------|
| Create User | POST | `/users` | `{ "name": "...", "email": "...", "level": "beginner" }` | 201 Created | User object |
| Get All Users | GET | `/users` | None | 200 OK | Array of users |
| Duplicate Email | POST | `/users` | Same email as existing user | 400 Bad Request | MongoDB Duplicate Key Error |
| Delete User | DELETE | `/users/:id` | None | 200 OK | Success message |
