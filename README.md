# Lead and Interaction Tracking System

## Project Overview

This Lead and Interaction Tracking System is designed to manage restaurant leads, interactions, and performance metrics effectively. It provides features such as:

- Lead management (adding and tracking restaurant leads).
- Contact management (managing multiple points of contact).
- Interaction tracking (recording calls and orders).
- Call planning (scheduling calls based on frequency).
- Performance metrics (categorizing accounts as well-performing or underperforming).

Built with **Node.js**, **Express**, and **MongoDB** in an **MVC** architecture, the system ensures scalability and performance for B2B applications.

---

## System Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **MongoDB**: v4.0 or higher
- **Operating System**: Windows, macOS, or Linux

---

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Sid2728/KAM.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following:

   ```env
   MONGO_URI=your_mongoDB_uri
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the MongoDB server:

   ```bash
   mongosh
   ```

---

## Running Instructions

To start the server, use:

```bash
npm start
```

The server will run on the specified `PORT` (default: 5000).

Access the API at `http://localhost:5000/`.

---

## API Documentation
### Base URL: `https://kam-5lqh.onrender.com`
### Authentication

#### Register

- **URL**: `/api/auth/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "KAM"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login

- **URL**: `/api/auth/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

### Restaurants

#### Add Restaurant

- **URL**: `/api/restaurants`
- **Method**: POST
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "name": "Pizza Palace",
    "address": "123 Main St",
    "status": "new",
    "contacts": [
      {
        "name": "Jane Smith",
        "role": "Manager",
        "phone": "123-456-7890",
        "email": "jane@example.com"
      }
    ],
    "keyAccountManager": "<USER_ID>"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<RESTAURANT_ID>",
    "name": "Pizza Palace",
    "address": "123 Main St",
    "status": "new",
    "contacts": [...],
    "keyAccountManager": "<USER_ID>"
  }
  ```

#### Get All Restaurants

- **URL**: `/api/restaurants`
- **Method**: GET
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  [
    {
      "_id": "<RESTAURANT_ID>",
      "name": "Pizza Palace",
      "address": "123 Main St",
      "status": "new",
      "contacts": [...],
      "keyAccountManager": "<USER_ID>"
    }
  ]
  ```

#### Update Restaurant

- **URL**: `/api/restaurants/:id`
- **Method**: PUT
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "name": "Updated Pizza Palace",
    "status": "engaged"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<RESTAURANT_ID>",
    "name": "Updated Pizza Palace",
    "address": "123 Main St",
    "status": "engaged",
    "contacts": [...],
    "keyAccountManager": "<USER_ID>"
  }
  ```

#### Delete Restaurant

- **URL**: `/api/restaurants/:id`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "message": "Restaurant deleted successfully"
  }
  ```

#### Get Performance Metrics

- **URL**: `/api/restaurants/metrics/calculate`
- **Method**: GET
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  [
    {
      "name": "Pizza Palace",
      "status": "engaged",
      "address": "123 Main St",
      "totalOrders": 5,
      "totalOrderValue": 2500,
      "lastInteractionDate": "2024-12-22T15:00:00.000Z",
      "performanceCategory": "Well-Performing"
    }
  ]
  ```

### Interactions

#### Add Interaction

- **URL**: `/api/interactions`
- **Method**: POST
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "restaurantId": "<RESTAURANT_ID>",
    "type": "call",
    "details": "Discussed order requirements",
    "interactionDate": "2024-12-23",
    "orderDetails": {
      "orderId": "ORD123",
      "orderAmount": 200,
      "orderDate": "2024-12-22"
    }
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<INTERACTION_ID>",
    "restaurantId": "<RESTAURANT_ID>",
    "type": "call",
    "details": "Discussed order requirements",
    "interactionDate": "2024-12-23",
    "orderDetails": { ... }
  }
  ```

#### Get Interactions by Restaurant

- **URL**: `/api/interactions/restaurant/:restaurantId`
- **Method**: GET
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  [
    {
      "_id": "<INTERACTION_ID>",
      "restaurantId": "<RESTAURANT_ID>",
      "type": "call",
      "details": "Discussed order requirements",
      "interactionDate": "2024-12-23",
      "orderDetails": { ... }
    }
  ]
  ```

#### Delete Interaction

- **URL**: `/api/interactions/:id`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "message": "Interaction deleted successfully"
  }
  ```

### Call Plans

#### Create Call Plan

- **URL**: `/api/call-plans`
- **Method**: POST
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "restaurantId": "<RESTAURANT_ID>",
    "frequency": 7,
    "lastCallDate": "2024-12-20"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<CALL_PLAN_ID>",
    "restaurantId": "<RESTAURANT_ID>",
    "frequency": 7,
    "lastCallDate": "2024-12-20",
    "nextCallDate": "2024-12-27"
  }
  ```

#### Get Call Plans

- **URL**: `/api/call-plans`
- **Method**: GET
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  [
    {
      "_id": "<CALL_PLAN_ID>",
      "restaurantId": "<RESTAURANT_ID>",
      "frequency": 7,
      "lastCallDate": "2024-12-20",
      "nextCallDate": "2024-12-27"
    }
  ]
  ```

#### Update Call Plan

- **URL**: `/api/call-plans/:id`
- **Method**: PUT
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "frequency": 14,
    "lastCallDate": "2024-12-23"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<CALL_PLAN_ID>",
    "restaurantId": "<RESTAURANT_ID>",
    "frequency": 14,
    "lastCallDate": "2024-12-23",
    "nextCallDate": "2024-12-30"
  }
  ```

#### Get Restaurants Requiring Calls Today

- **URL**: `/api/call-plans/today`
- **Method**: GET
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  [
    {
      "restaurantId": "<RESTAURANT_ID>",
      "restaurantName": "Pizza Palace",
      "nextCallDate": "2024-12-24"
    }
  ]
  ```

#### Delete Call Plan

- **URL**: `/api/call-plans/:id`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "message": "Call plan deleted successfully"
  }
  ```


