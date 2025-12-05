# Chat App Backend 

This is the backend for the **Real-Time Chat Application** built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

---

## Features

* User registration & login (JWT auth)
* Real-time chat with Socket.IO
* MongoDB for storing users & messages
* REST API for authentication & messages

---

## Installation

```bash
git clone https://github.com/Subham-Karn/Chat-Web-Server
```bash
cd chat-app-backend
```bash
npm install
```

##  Tech Stack (Server)

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO
* JWT + bcrypt

---

## Folder Structure

```
server/
│── controllers/
│── schemas/
│── routes/
│── index.js
│── package.json
```

---

##  Setup

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Create `.env`

```
PORT=5000
MONGO_URL=your_mongo_uri
JWT_SECRET=your_secret_key
```

### 3️⃣ Start server

```
npm run dev
```

---

## API Routes

| Method | Route              | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register user     |
| POST   | /api/auth/login    | Login user        |
| GET    | /api/messages/:id  | Get chat messages |
| POST   | /api/messages/send | Send message      |

---

## 💬 Socket.IO Events

* `join` – join user room
* `sendMessage` – send chat
* `receiveMessage` – receive chat

---


## Live Demo: 
[Click Here](https://server-chatwebapp.onrender.com)
---

