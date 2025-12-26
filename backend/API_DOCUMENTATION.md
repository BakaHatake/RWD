# Backend API Documentation

Base URL: `http://localhost:8080` (or our railway URL which will be used on gobal testing)

## 📑 Quick Navigation

| Category | Description | Link |
| :--- | :--- | :--- |
| **Authentication & User** | Signup, Login, Password Reset, Profile | [Go to Section](#authentication--user) |
| **Cart Operations** | Add, Remove, View Cart Items | [Go to Section](#cart-operations) |
| **Order Management** | Place Order, View History | [Go to Section](#order-management) |
| **Products & Search** | Filter and Search | [Go to Section](#products--search) |
| **Wallet** | Balance and Transactions | [Go to Section](#wallet) |

---

## Backend Workflows

### 1. Authentication Flow
*   **Stateless JWT**: The backend uses JSON Web Tokens (JWT) for authentication.
*   **The "Key" System**: Each user is assigned a unique 8-character `key` upon signup. This key is used for wallet operations and internal identification.
*   **Session**: The frontend should store the `jwtToken`, `email`, and `key` received during login.

### 2. Password Reset Flow (OTP)
1.  **Request**: User requests an OTP via `/auth/forget`. (Rate limited: 1 OTP per 5 mins).
2.  **Verify**: User enters OTP. Backend verifies it via `/auth/verify` and temporarily authorizes the reset.
3.  **Reset**: User provides new password via `/auth/reset`. Backend updates the hash and deletes the OTP.

### 3. Order Lifecycle (Single Active Order)
*   **One-at-a-time**: A user can only have **one active order** at a time.
*   **Overwriting**: Placing a new order via `/auth/placeorder` will **automatically clear** any existing items in the cart and replace any previous active order for that user.
*   **Status**: Orders start as "Placed" and move through "Accepted" -> "Preparing" -> "Ready" -> "Picked".

### 4. Validation Rules
*   **Signup**:
    *   Name: 3 - 100 characters.
    *   Password: 4 - 100 characters.
    *   Email: Must be a valid email format.
*   **Login**:
    *   Email & Password required.

---

## Authentication & User

### 1. Signup
*   **Endpoint:** `/auth/signup`
*   **Method:** `POST`
*   **Description:** Creates a new user account.
*   **Request Body:**
    ```json
    {
      "name": "John Doe",
      "phone": "1234567890",
      "usn": "1XX19CS001",
      "gender": "Male",
      "email": "john@example.com",
      "password": "securepassword"
    }
    ```
*   **Response (Success - 201):**
    ```json
    {
      "message": "Singup successful",
      "success": true
    }
    ```
*   **Response (Error - 409):** `Email already exists` or `USN already exists`.
*   **Response (Server Error - 500):** Signup failed.

### 2. Login
*   **Endpoint:** `/auth/login`
*   **Method:** `POST`
*   **Description:** Authenticates a user.
*   **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword"
    }
    ```
*   **Response (Success - 200):**
    ```json
    {
      "message": "Login successful",
      "success": true,
      "jwtToke": "...", 
      "email": "john@example.com",
      "key": "A1B2C3D4",
      "user": "John Doe"
    }
    ```
*   **Response (Error - 409):** User does not exist / Invalid password.

### 3. Forgot Password
*   **Endpoint:** `/auth/forget`
*   **Method:** `POST`
*   **Description:** Sends an OTP to the user's email for password reset.
*   **Request Body:**
    ```json
    { "email": "john@example.com" }
    ```
*   **Response (Success - 200):** `{ "success": true, "message": "OTP sent to your email" }`
*   **Response (Error - 400/404/429):** Validation errors, User not found, Rate limit exceeded.

### 4. Verify OTP
*   **Endpoint:** `/auth/verify`
*   **Method:** `POST`
*   **Description:** Verifies the OTP sent to the user.
*   **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "otp": 123456
    }
    ```
*   **Response (Success - 200):** `{ "success": true, "message": "OTP verified successfully" }`

### 5. Reset Password
*   **Endpoint:** `/auth/reset`
*   **Method:** `POST`
*   **Description:** Resets the user's password.
*   **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "newPassword": "newpassword123",
      "confirmPassword": "newpassword123"
    }
    ```
*   **Response (Success - 200):** `{ "success": true, "message": "Password reset successfully" }`

### 6. Get Profile
*   **Endpoint:** `/auth/profile`
*   **Method:** `GET`
*   **Description:** Fetch user profile details and wallet balance.
*   **Query Params:**
    *   `key`: The user's unique key (Required).
*   **Example Request:**
    `GET http://localhost:8080/auth/profile?key=A1B2C3D4`
*   **Response (Success - 200):**
    ```json
    {
      "success": true,
      "body": {
        "name": "John Doe",
        "phone": "1234567890",
        "email": "john@example.com",
        "key": "A1B2C3D4",
        "balance": 500
      }
    }
    ```
*   **Response (Error - 400):** Key is required / User or Wallet not found.
*   **Response (Server Error - 500):** Server error.

---

## Cart Operations

### 7. Get Cart (Method A)
*   **Endpoint:** `/auth/cart`
*   **Method:** `POST`
*   **Request Body:** `{ "username": "john@example.com" }`
*   **Response (Success - 200):** `{ "message": "Cart fetched", "items": [...], "success": true }`

### 8. Get Cart (Method B)
*   **Endpoint:** `/auth/returncart`
*   **Method:** `POST`
*   **Request Body:** `{ "user": "john@example.com" }`
*   **Response (Success - 200):** `{ "items": [...], "success": true, "message": "Cart found" }`

### 9. Add to Cart
*   **Endpoint:** `/auth/add2cart`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "user": "john@example.com",
      "itemname": "Burger",
      "itemprice": 100,
      "itemsrc": "http://image.url"
    }
    ```
*   **Response (Success - 200):** `{ "success": true, "message": "Cart updated" }`

### 10. Delete Item
*   **Endpoint:** `/auth/delete-item`
*   **Method:** `POST`
*   **Request Body:** `{ "user": "john@example.com", "itemname": "Burger" }`
*   **Response (Success - 200):** `{ "success": true, "message": "Item deleted" }`

### 11. Decrease Quantity
*   **Endpoint:** `/auth/remove-quantity`
*   **Method:** `POST`
*   **Request Body:** `{ "user": "john@example.com", "itemname": "Burger" }`
*   **Response (Success - 200):** `{ "success": true, "message": "Quantity updated" }`

---

## Order Management

### 12. Place Order
*   **Endpoint:** `/auth/placeorder`
*   **Method:** `POST`
*   **Description:** Places a new order, clears the cart.
*   **Request Body:**
    ```json
    {
      "user": "john@example.com",
      "items": [...],
      "totalItems": 3,
      "totalAmount": 450
    }
    ```
*   **Response (Success - 200):** `{ "success": true, "message": "Order Placed" }`

### 13. Get Order
*   **Endpoint:** `/auth/getorder`
*   **Method:** `POST`
*   **Description:** Fetches the active order.
*   **Request Body:** `{ "user": "john@example.com" }`
*   **Response (Success - 200):** `{ "success": true, "data": [{...}] }`

---

## Products & Search

### 14. Filter Products
*   **Endpoint:** `/auth/filter`
*   **Method:** `POST`
*   **Request Body:** `{ "category": "All" }`
*   **Response (Success - 200):** `{ "success": true, "items": [...] }`

### 15. Search Products
*   **Endpoint:** `/auth/search`
*   **Method:** `POST`
*   **Request Body:** `{ "query": "pizza" }`
*   **Response (Success - 200):** `{ "success": true, "items": [...] }`

---

## Wallet

### 16. Get Wallet Balance
*   **Endpoint:** `/auth/getwallet`
*   **Method:** `POST`
*   **Request Body:** `{ "key": "USER_KEY" }`
*   **Response (Success - 200):** `{ "success": true, "balance": 500, "transactions": [] }`

### 17. Update Wallet
*   **Endpoint:** `/auth/updatewallet`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "key": "USER_KEY",
      "amount": 100,
      "utr": "TRANSACTION_ID"
    }
    ```
*   **Response (Success - 200):** `{ "success": true, "balance": 600 }`
