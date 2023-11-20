# SportsConnect Application

## Overview

Welcome to theSportsConnect application! This web application is built using React.js, Node.js, MongoDB, Express.js, HTML, and CSS. It serves as a social platform for sports enthusiasts, allowing users to connect based on their shared activities. With features like creating, reading, updating, and deleting activities or users, as well as the ability to create comments, this application aims to enhance the sports community experience.

## Token-Based Authentication

The SportsConnect application implements token-based authentication using JSON Web Tokens (JWT) on the server for enhanced security.

### How it Works

1. User Login:

Users can log in to the website by providing their credentials.
The server verifies the provided credentials, and upon successful authentication, generates a JWT containing user information.

2. Token Generation:

The server uses the jsonwebtoken library to create a JWT with a secret key and includes user information in the payload.

3. Token Storage:

The generated JWT is typically stored on the client side, such as in a browser's localStorage or sessionStorage.

4. Protected Routes:

Certain routes on the server are protected, requiring a valid JWT to access them.
The server verifies the JWT on protected routes, ensuring the user is authenticated.

5. Token Expiration:

The JWT includes an expiration time to enhance security.
Users need to re-authenticate and obtain a new token after the previous one expires.

## Features

### User Management

- Create: Users can register and create their profiles, providing essential information.
- Read: View user profiles to discover their activities and comments.
- Update: Users can modify their profiles and update information.

### Activity Management

- Create: Users can create new activities, specifying details such as sport, duration, city, and description.
- Read: Explore a variety of activities created by users on the platform.
- Update: Activity creators can edit their activity details.
- Delete: Remove activities that are no longer relevant.

### Social Interaction

1. Follow Users: Users can follow other sports enthusiasts to stay updated on their activities.
2. Participate: Join activities created by other users.
3. Homepage Wall: The homepage features a scrolling wall showcasing activities and updates from followed users.

### Comments

Add Comments: Users can leave comments on activities, fostering engagement and interaction.

## Technologies Used

- Frontend: React.js for building a responsive and dynamic user interface.
- Backend: Node.js and Express.js to handle server-side logic and API endpoints.
- Database: MongoDB for storing user profiles, activities, and comments.
- Styling: HTML and CSS for a visually appealing and user-friendly design.

## [Click here to acced the website](https://sportsconnect.netlify.app/)

Free server can take time before starting (1 or 2 minutes)

# To review the backend implementation, please [click here](https://github.com/Victor78600/SportsConnect-back)
