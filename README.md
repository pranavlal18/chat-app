# 💬 Chatty – Real-Time Chat App

A full-stack real-time chat application built using the **MERN Stack** (MongoDB, Express, React, Node.js), with **Socket.io** for instant messaging and **JWT authentication** for secure user sessions.

---

## 📌 Features

- 🔐 **JWT Authentication** – Secure login and token-based access.
- ⚡ **Real-time Messaging** – Powered by Socket.io.
- 🧑‍🤝‍🧑 **Online User Tracking** – See who's online instantly.
- 💬 **One-to-One Chats** – Private chat functionality.
- 🌐 **Responsive UI** – Built with TailwindCSS and DaisyUI.
- 💾 **MongoDB Backend** – Fast and scalable NoSQL database.
- ⚙️ **Global State Management** – Zustand for lightweight global state handling.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TailwindCSS + DaisyUI
- Zustand (State Management)
- Axios

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT)
- bcrypt (Password hashing)

---

## 📁 Folder Structure

```bash
chatty/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/      # Zustand state
│   │   └── App.js
├── server/             # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── server.js
