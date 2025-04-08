
# Employee Management System (Backend)

## Table of Contents
- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
- [Environment Variables](#environment-variables)
- [GraphQL API Endpoints](#graphql-api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Project Description
This is the backend for an **Employee Management System** developed using **Node.js**, **Express**, **GraphQL**, and **MongoDB**. The application allows the management of employee data, including user authentication, employee creation, updates, and retrieval.

## Tech Stack
- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for Node.js.
- **GraphQL**: API query language for querying employee data.
- **Apollo Server**: To handle GraphQL queries and mutations.
- **MongoDB**: NoSQL database for storing employee and user data.
- **JWT (JSON Web Token)**: For secure user authentication.
- **Bcrypt.js**: For encrypting user passwords.
- **dotenv**: For managing environment variables.
- **Express Validator**: For validating incoming requests.

## Installation Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/duyen2310/COMP3133_101446598_Assignment1.git
    cd COMP3133_101446598_Assignment1
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root of your project and add the following:
    ```plaintext
MONGO_URI=mongodb+srv://truongthuykyduyen:aJBwsfCGziVTGvsb@mycluster.a0u4z.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster
DB_NAME=COMP3133_Assignment1
JWT_SECRET=your_secret_key
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

   The server will run on `http://localhost:3000`.

## Environment Variables
- `MONGO_URI`: The connection URI for your MongoDB instance.
- `DB_NAME`: Database name
- `JWT_SECRET`: The secret key for JWT authentication. Use a strong and secure secret.

