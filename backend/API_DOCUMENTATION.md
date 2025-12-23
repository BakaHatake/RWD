# Backend API Documentation

Base URL: `http://localhost:8080` (or our railway URL which will be used on gobal testing)

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
*   **Response (Error - 409):**
    ```json
    {
      "message": "Email already exists",
      "type": "email", 
      "success": false
    }
    // OR "USN already exists" (type: "usn")
    ```
*   **Response (Server Error - 500):**
    ```json
    { "message": "Signup failed", "success": false }
    ```

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
*   **Response (Error - 409):**
    ```json
    {
      "type": "email", // or "pass"
      "message": "User does not exist", // or "Invalid password"
      "success": false
    }
    ```
*   **Response (Server Error - 500):**
    ```json
    { "message": "Server error", "success": false }
    ```

### 3. Forgot Password
*   **Endpoint:** `/auth/forget`
*   **Method:** `POST`
*   **Description:** Sends an OTP to the user's email for password reset.
*   **Request Body:**
    ```json
    { "email": "john@example.com" }
    ```
*   **Response (Success - 200):**
    ```json
    { "success": true, "message": "OTP sent to your email" }
    ```
*   **Response (Error - 400):** Email is required.
*   **Response (Error - 404):** User does not exist.
*   **Response (Error - 429):** OTP already sent (rate limit).
*   **Response (Server Error - 500):** Failed to send OTP email.

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
*   **Response (Success - 200):**
    ```json
    { "success": true, "message": "OTP verified successfully" }
    ```
*   **Response (Error - 400):** 
    - Email and OTP are required
    - No OTP found / Invalid OTP
    - OTP expired

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
*   **Response (Success - 200):**
    ```json
    { "success": true, "message": "Password reset successfully" }
    ```
*   **Response (Error - 400):** Passwords do not match.

---

## Cart Operations

### 6. Get Cart (Method A)
*   **Endpoint:** `/auth/cart`
*   **Method:** `POST`
*   **Note:** This endpoint expects `username` in the body.
*   **Request Body:**
    ```json
    { "username": "john@example.com" }
    ```
*   **Response (Success - 200):**
    Returns cart items (or empty list if user found but no cart).
    ```json
    {
      "message": "Cart fetched",
      "items": [ ... ],
      "success": true
    }
    ```
*   **Response (Error - 400):** Username required.
*   **Response (Server Error - 500):** Server error.

### 7. Get Cart (Method B - "returncart")
*   **Endpoint:** `/auth/returncart`
*   **Method:** `POST`
*   **Description:** Another endpoint to fetch cart items.
*   **Request Body:**
    ```json
    { "user": "john@example.com" }
    ```
*   **Response (Success - 200):**
    ```json
    {
      "items": [ ... ],
      "success": true,
      "message": "Cart found"
    }
    ```
*   **Response (Error - 404):** Cart Not found.
*   **Response (Server Error - 500):** Server Error.

### 8. Add to Cart
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
*   **Response (Success - 200):**
    ```json
    { "success": true, "message": "Cart updated" }
    // OR { "success": true, "message": "New cart created" }
    ```
*   **Response (Error - 404):** User not found.
*   **Response (Server Error - 500):** Server Error.

### 9. Delete Item
*   **Endpoint:** `/auth/delete-item`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "user": "john@example.com", "itemname": "Burger" }
    ```
*   **Response (Success - 200):**
    ```json
    { "success": true, "message": "Item deleted" }
    ```
*   **Response (Error - 404):** Cart not found.
*   **Response (Server Error - 500):** Server Error.

### 10. Decrease Quantity
*   **Endpoint:** `/auth/remove-quantity`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "user": "john@example.com", "itemname": "Burger" }
    ```
*   **Response (Success - 200):**
    ```json
    { "success": true, "message": "Quantity updated" }
    ```
*   **Response (Error - 404):** Cart not found OR Item not found in cart.
*   **Response (Server Error - 500):** Server Error.

---

### 11. Place Order
*   **Endpoint:** `/auth/placeorder`
*   **Method:** `POST`
*   **Description:** Places a new order and clears the user's cart.
*   **Request Body:**
    ```json
    {
      "user": "john@example.com",
      "items": [ ... ],
      "totalItems": 3,
      "totalAmount": 450
    }
    ```
*   **Response (Success - 200):**
    ```json
    {
      "success": true,
      "message": "Order Placed"
    }
    ```
*   **Response (Error - 400):** Missing user or items.
*   **Response (Server Error - 500):** Server Error.

---

## Products & Search

### 11. Filter Products
*   **Endpoint:** `/auth/filter`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "category": "All" } 
    // or specific category like "Snacks"
    ```
*   **Response (Success - 200):**
    ```json
    {
      "success": true,
      "items": [ ... ]
    }
    ```
*   **Response (Server Error - 500):** Server error.

### 12. Search Products
*   **Endpoint:** `/auth/search`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "query": "pizza" }
    ```
*   **Response (Success - 200):**
    ```json
    { "success": true, "items": [ ... ] }
    ```
*   **Response (Server Error - 500):** Server error.

---

## Wallet

### 13. Get Wallet Balance
*   **Endpoint:** `/auth/getwallet`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "key": "USER_UNIQUE_KEY" }
    ```
*   **Response (Success - 200):**
    ```json
    {
      "success": true,
      "balance": 500,
      "transactions": []
    }
    ```
*   **Response (Error - 400):** Key is required.
*   **Response (Error - 404):** Invalid key.
*   **Response (Server Error - 500):** Server error.

### 14. Update Wallet
*   **Endpoint:** `/auth/updatewallet`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "key": "USER_UNIQUE_KEY",
      "amount": 100,
      "utr": "TRANSACTION_ID"
    }
    ```
*   **Response (Success - 200):**
    ```json
    {
      "success": true,
      "balance": 600
    }
    ```
*   **Response (Error - 400):** Valid key and non-zero amount required.
*   **Response (Error - 404):** Invalid key.
*   **Response (Server Error - 500):** Server error.
