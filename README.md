# GitHub Manager

A small full‑stack application that demonstrates how to authenticate with Git
providers and manage repository settings through a GitHub‑style interface.

## Features

- OAuth login with GitHub
- List repositories and toggle an "auto review" flag per repo
- View basic profile information and total auto‑review enabled repositories

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A running [MongoDB](https://www.mongodb.com/) instance
- OAuth credentials for GitHub

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```
MONGO_URI=mongodb://localhost:27017/gitmanager
SESSION_SECRET=change_me
CLIENT_URL=http://localhost:5173
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
```

Then start the server:

```bash
npm start
```

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory containing:

```
VITE_BACKEND_URL=http://localhost:5000
```

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## License

This project is provided for educational purposes.
