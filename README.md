# RWD — College Canteen Ordering Platform

A lightweight ordering system built for college canteens.  
Students can browse menus, place orders, and track order status.  
Shopkeepers can manage orders and update item availability.

---

## Features

### Student
- View canteens
- View menu items
- Add items to cart
- Checkout (UPI/Cash simulation)
- Track order status:
  - Placed → Accepted → Preparing → Ready → Picked

### Shopkeeper
- View incoming orders (5s polling)
- Accept or Reject orders
- Update order status
- Manage menu items
- Toggle Stock / Sold Out

---

## Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript (Fetch API)

### Backend
- Node.js  
- Express.js  
- Express Router

### Database
- MongoDB Atlas  
- Mongoose

### Hosting
- Vercel (Frontend)  
- Railway (Backend)

### Extra Tools
- Cloudinary (Images)  
- GitHub (Version Control)  
- Polling (Realtime Updates)

---

## Backend Responsibilities

- User authentication (JWT)
- Menu CRUD (add, update, delete, toggle)
- Order creation + tracking
- Payment simulation / verification
- Role-based API routing
- MongoDB schemas (User, Menu, Order, Payment)
- Backend deployment

---

## Goal
Deliver a clean and functional canteen ordering system suitable for college expo demonstration...


