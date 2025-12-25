# Canteen Connect - Full Stack RWD Project

## 📖 Overview
**Canteen Connect** is a complete full-stack web application designed to digitize campus dining. It features a robust **Node.js/Express backend** managing users, orders, and wallets, paired with a responsive **React frontend** for a seamless student experience.

---

## 🏗️ Project Architecture

The project is divided into two main components within the root directory:

```
c:/RWD
├── backend/              # Node.js + Express API Server
├── react/                # React.js + Vite Client Application
└── assets/               # Shared static assets (icons, etc.)
```

### 1. 🖥️ Frontend (`/react`)
Built with **React (Vite)**, focusing on responsive design and smooth user interaction.
*   **Core Stack**: React 18, React Router DOM, Vanilla CSS (Scoped).
*   **Key Directories**:
    *   `src/jsxfolder`: React Components (`Canteen.jsx`, `Cart.jsx`, `menu.jsx`, etc.)
    *   `src/css`: Scoped CSS modules to prevent styling conflicts.
*   **Features**: Dynamic routing for kitchens, cart management, real-time scheduled ordering.

### 2. 🔌 Backend (`/backend`)
A RESTful API built with **Node.js** and **Express**, connecting to a MongoDB database.
*   **Core Stack**: Node.js, Express.js, Mongoose, JWT (JSON Web Tokens).
*   **Key Directories**:
    *   `controller/`: Business logic for Auth, Cart, Orders.
    *   `models/`: Mongoose schemas (User, Order, Item).
    *   `routes/`: API route definitions (`auth.js`, etc.).
    *   `middleware/`: Authentication checks.
*   **Documentation**: Detailed API references available in [`backend/API_DOCUMENTATION.md`](file:///c:/RWD/backend/API_DOCUMENTATION.md).

---

## 🚀 Key Workflows

### 🔐 Authentication & Security
*   **JWT Auth**: Stateless authentication using JSON Web Tokens.
*   **Key System**: Unique 8-char `key` assigned to users for wallet transactions and identification.
*   **Password Reset**: OTP-based verification flow via email.

### 🛒 Ordering Process
1.  **Selection**: Users browse kitchens (`/menu`) and add items to Cart (`/kitchen`).
2.  **Cart Management**: Items are stored in the backend cart collection.
3.  **Payment**: Wallet interactions verify balance and deduct amounts securely.
4.  **Order Placement**: Backend moves items from `Cart` to `Orders` collection.

---

## 🛠️ Setup & Installation

### Backend Setup
1.  Navigate to backend: `cd backend`
2.  Install dependencies: `npm install`
3.  Start server: `npm start` (Runs on Port 8080)

### Frontend Setup
1.  Navigate to frontend: `cd react`
2.  Install dependencies: `npm install`
3.  Start dev server: `npm run dev` (Runs on Port 5173)

---

## 📂 detailed File Structure

```
c:/RWD
├── backend/
│   ├── controller/       # Logic: authController, cartController
│   ├── models/           # DB Schemas: User, Order, Item
│   ├── routes/           # Endpoints: /auth/login, /auth/cart
│   ├── server.js         # Entry Point
│   └── API_DOCUMENTATION.md # Full API Reference
│
├── react/
│   ├── src/
│   │   ├── jsxfolder/    # UI Components
│   │   ├── css/          # Stylesheets
│   │   └── main.jsx      # DOM Rendering
│   └── package.json      # Dependencies
│
└── assets/               # Project-wide static files
```
