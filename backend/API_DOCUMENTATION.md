# Backend API Documentation

Base URL: `http://localhost:8080` (or your deployment URL)

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
*   **Response (Success):**
    ```json
    {
      "message": "Singup successful",
      "success": true
    }
    ```
*   **Response (Error):**
    ```json
    {
      "message": "Email already exists",
      "type": "email",
      "success": false
    }
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
*   **Response (Success):**
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

### 3. Forgot Password
*   **Endpoint:** `/auth/forget`
*   **Method:** `POST`
*   **Description:** Sends an OTP to the user's email for password reset.
*   **Request Body:**
    ```json
    { "email": "john@example.com" }
    ```
*   **Response:**
    ```json
    { "success": true, "message": "OTP sent to your email" }
    ```

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
*   **Response:**
    ```json
    { "success": true, "message": "OTP verified successfully" }
    ```

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

---

## Cart Operations

### 6. Get Cart (Method A)
*   **Endpoint:** `/auth/cart`
*   **Method:** `POST`
*   **Note:** This endpoint expects `username` in the body, unlike others which use `user` (email).
*   **Request Body:**
    ```json
    { "username": "john@example.com" }
    ```
*   **Response:**
    ```json
    {
      "message": "Cart fetched",
      "items": [ ... ],
      "success": true
    }
    ```

### 7. Get Cart (Method B - "returncart")
*   **Endpoint:** `/auth/returncart`
*   **Method:** `POST`
*   **Description:** Another endpoint to fetch cart items.
*   **Request Body:**
    ```json
    { "user": "john@example.com" }
    ```
*   **Response:**
    ```json
    {
      "items": [ ... ],
      "success": true,
      "message": "Cart found"
    }
    ```

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
*   **Response:**
    ```json
    { "success": true, "message": "Cart updated" }
    ```

### 9. Delete Item
*   **Endpoint:** `/auth/delete-item`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "user": "john@example.com", "itemname": "Burger" }
    ```
*   **Response:**
    ```json
    { "success": true, "message": "Item deleted" }
    ```

### 10. Decrease Quantity
*   **Endpoint:** `/auth/remove-quantity`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "user": "john@example.com", "itemname": "Burger" }
    ```

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
*   **Response:**
    ```json
    {
      "success": true,
      "items": [ ... ]
    }
    ```

### 12. Search Products
*   **Endpoint:** `/auth/search`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "query": "pizza" }
    ```
*   **Response:**
    ```json
    { "success": true, "items": [ ... ] }
    ```

---

## Wallet

### 13. Get Wallet Balance
*   **Endpoint:** `/auth/getwallet`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    { "key": "USER_UNIQUE_KEY" }
    ```
*   **Response:**
    ```json
    {
      "success": true,
      "balance": 500,
      "transactions": []
    }
    ```

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
