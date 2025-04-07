# Employee Management Software - Frontend

## About
This is the frontend application for the Employee Management Software, built using Angular. It provides a user-friendly interface for managing employee records, including features like adding, updating, deleting, and viewing employee details. The application is designed to interact with a backend API (not included in this repository) to perform CRUD operations.

## Features
View a list of employees with details such as name, ID, department, and role.
Add new employees with a form.
Edit existing employee details.
Delete employees from the system.
Responsive design for desktop and mobile devices.
Real-time data updates (requires backend integration).

## Technologies Used
Angular: Frontend framework for building the application.
TypeScript: For type-safe JavaScript code.
Angular Material: UI component library for a modern look and feel.
RxJS: For handling asynchronous operations and API calls.
HTML/SCSS: For structuring and styling the UI.
Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Version 16.x or later (includes npm).
Angular CLI: Install globally using npm install -g @angular/cli.
A code editor like Visual Studio Code (recommended).

## Project Structure

employee-management-frontend/
```bash
├── src/
│   ├── app/
│   │   ├── components/           # Reusable UI components (e.g., employee-list, employee-form)
│   │   ├── services/             # Services for API calls and business logic
│   │   ├── models/               # TypeScript interfaces for data models (e.g., Employee)
│   │   ├── app.component.*       # Root component
│   │   └── app.module.ts         # Main module
│   ├── assets/                   # Static files (images, icons, etc.)
│   ├── environments/             # Environment-specific configurations
│   └── styles.scss               # Global styles
├── angular.json                  # Angular configuration file
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```
