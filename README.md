# WTWR (What to Wear?): Back End

This back-end project is focused on creating a server for the WTWR application, to work with databases, set up security and testing, and deploy web applications on a remote machine.
The eventual goal is to create a server with an API and user authorization.

# Technologies used in my priject

1. Node.js

JavaScript runtime environment that lets you run JS on the server side.

2. Express.js

Web framework for Node.js that simplifies routing, middleware, and server setup.

3. MongoDB (via Mongoose)

NoSQL database for storing user and item data.

Flexible schema-less data model, great for JSON-like documents.

4. Mongoose

ODM (Object Data Modeling) library for MongoDB.

Provides schemas, models, and validation for MongoDB documents.

# project description and its functionality

I created several folders to handle different tasks.

1. controllers for storing files with functions that define routes
   This folder contains the core logic for handling API requests related to clothing items and users. It separates the controller logic from the route definitions, which helps keep the code modular and maintainable.

2. models for storing files with described schemas and models
   The /models directory defines the data schemas for MongoDB collections using Mongoose. It ensures our application's data is well-structured, validated, and consistent across the backend.

3. routes for storing files responsible for request routing
   The /routes folder defines all the Express.js endpoints for the backend. It acts as the entry point for client requests and connects them to the appropriate controller functions. I structured the routes by resource — users and clothing items — to follow RESTful best practices and keep the codebase modular and maintainable.
4. utils for storing supportive data
   The /routes folder in my backend project organizes and defines the API endpoints. I’ve followed RESTful principles and modular architecture to ensure the codebase is clean, scalable, and easy to maintain.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

### Backend link to github

https://github.com/wedderburn95/se_project_express

My backend is running on http://localhost:3001 (http://127.0.0.1:3001)

My domain name is https://rnr.pakasak.com
