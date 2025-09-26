# Coblin Assignment - Full-Stack Authentication System


A robust and secure full-stack user authentication system built with Node.js, Express, Prisma, PostgreSQL, React, and Tailwind CSS. This project provides a complete foundation for user management, including registration, login, JWT-based access/refresh tokens, and logout functionality.



## 📖 About The Project

This project serves as a comprehensive template for implementing a modern authentication system. It features a decoupled backend and frontend architecture, ensuring clear separation of concerns. The system is designed with best practices for security, scalability, and maintainability in mind.

-   **Backend**: A RESTful API built with **Node.js** and **Express**, handling all business logic and authentication. It uses **Zod** for strict type-safe validation.
-   **Database**: **PostgreSQL** is used for data persistence, managed by the powerful **Prisma ORM** for type-safe database access and migrations.
-   **Frontend**: A responsive and interactive UI built with **React** and styled with **Tailwind CSS**. It features beautifully designed, accessible components from **Shadcn/ui**.

---

## 🛠️ Built With

This project leverages a modern and powerful tech stack:

| Technology                                                                          | Description                                |
| ----------------------------------------------------------------------------------- | ------------------------------------------ |
| **Backend** |                                            |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.dot.js)             | JavaScript runtime environment             |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express)                | Web application framework for Node.js      |
| ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma)                   | Next-generation ORM for Node.js & TS       |
| ![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod&logoColor=white)             | TypeScript-first schema validation         |
| ![JWT](https://img.shields.io/badge/-JSON%20Web%20Tokens-000000?logo=jsonwebtokens) | Secure token-based authentication        |
| **Frontend** |                                            |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react)                     | JavaScript library for building UIs        |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite)                         | Next-generation frontend tooling           |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css) | A utility-first CSS framework            |
| ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black.svg)                    | Re-usable components built with Radix UI   |
| **Database** |                                            |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql)       | Open-source relational database            |

---

## ✨ Key Features

-   ✅ **Secure User Registration:** New user creation with password hashing.
-   ✅ **JWT Authentication:** Stateless authentication using JSON Web Tokens (Access & Refresh).
-   ✅ **Token Refresh Mechanism:** Seamlessly refresh expired access tokens without re-login.
-   ✅ **Type-Safe API:** Backend validation powered by Zod for robust data integrity.
-   ✅ **Environment Variable Management:** Securely manage configuration using `.env` files.
-   ✅ **Database Migrations:** Structured database schema management with Prisma Migrate.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

You'll need the following installed on your system:

-   [Node.js](https://nodejs.org/) (v16 or newer)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [PostgreSQL](https://www.postgresql.org/download/) database running locally or accessible.
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/sathwik-09/coblin-assignment.git
    cd coblin-assignment
    ```

2.  **Setup the Backend:**

    ```sh
    cd backend
    npm install
    ```

    -   Create a `.env` file from the example:
        ```sh
        cp .env.example .env
        ```
    -   Update the `.env` file with your credentials:
        ```env
        # PostgreSQL connection URL
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

        # JWT secrets (replace with long, random strings)
        JWT_SECRET="your_super_secret_jwt_key"
        JWT_REFRESH_SECRET="your_super_secret_refresh_key"
        ```

    -   Run database migrations to set up the schema:
        ```sh
        npx prisma migrate dev --name init
        ```

    -   Start the backend development server:
        ```sh
        npm run dev
        ```
        The backend will be running at `http://localhost:3000`.

3.  **Setup the Frontend:**
    (Open a new terminal window)

    ```sh
    cd ../frontend
    npm install
    ```

    
    -   Start the frontend development server:
        ```sh
        npm run dev
        ```
        The application will be accessible at `http://localhost:5173`.

---

## ⚙️ API Endpoints

The backend exposes the following API endpoints under the `/api` prefix:

| Method | Endpoint                  | Description                                |
| :----- | :------------------------ | :----------------------------------------- |
| `POST` | `/auth/register`          | Register a new user.                       |
| `POST` | `/auth/login`             | Log in a user and receive tokens.          |
| `POST` | `/auth/refresh-token`     | Obtain a new access token using a refresh token. |
| `GET` | `/users/profile`           | Displays the profile of the authenticated user. (Requires Auth). |

---

## 📂 Project Structure

The project is organized as a monorepo with separate directories for the backend and frontend.

