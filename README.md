# 📝 Task Tracker App

A simple and elegant task management application built using **React**. This app allows users to add, edit, delete, filter, and search tasks with persistent local storage support.

---

## 🚀 Features

- 🔐 Login using username (stored locally)
- ➕ Add new tasks with title and description
- ✅ Mark tasks as complete or pending
- 🔄 Edit existing tasks
- ❌ Delete tasks with confirmation
- 🔍 Real-time task search by title
- 🔃 Filter tasks by:
  - All
  - Completed
  - Pending
- 💾 Data stored in localStorage (per username)
- 🎯 Highlight searched task in the main list
- 🌐 Fully responsive layout (mobile & desktop)
- 🎨 Styled using **Vanilla CSS**

---

## 📁 Project Structure

src/
├── components/
│ ├── Login.jsx
│ ├── Dashboard.jsx
│ ├── TaskList.jsx
│ ├── TaskForm.jsx
│ ├── TaskItem.jsx
│ ├── TaskFilter.jsx
├── utils/
│ └── localStorage.js
├── App.jsx
├── main.jsx
└── index.css

- **Frontend**: React (Vite), Vanilla CSS
- **Routing**: React Router
- **Notifications**: react-toastify
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: localStorage
