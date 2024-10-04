# Workflow Builder Application

This is a simple React-based application that demonstrates how to fetch users, create a post, and fetch comments using JSONPlaceholder's API. The app allows users to select a user, create a post for that user, and view comments for the post.

## Features

- Fetches users from JSONPlaceholder API.
- Allows creating a new post for a selected user.
- Fetches comments related to a created post.
- Displays post creation response and associated comments.
- Error handling for API requests and loading state feedback.

---

## Setup Instructions

1. Clone the repository or Unzip the file
2. Run npm install
3. Run npm start (for starting the application on http://localhost:3000)


### API Chain Diagram Overview

    +---------------------------------+
    |                                 |
    |         User Interaction        |
    |                                 |
    +---------------------------------+
                    |
                    v
    +------------------------------------------------+
    |     Fetch Users (GET request)                  |
    |    https://jsonplaceholder.typicode.com/users  |
    +------------------------------------------------+
                    |
                    v
    +----------------------------------------------+
    |                                              |
    |        User Selects and Inputs Post Info      |
    |                                              |
    +----------------------------------------------+
                    |
                    v
    +---------------------------------------------------+
    |   Create Post (POST request)                      |
    |   https://jsonplaceholder.typicode.com/posts      |
    |   Request Body: {title, body, userId}             |
    +---------------------------------------------------+
                    |
                    v
    +---------------------------------------------------------------+
    |                                                               |
    |        Fetch Comments (GET request)                           |
    | https://jsonplaceholder.typicode.com/comments?postId={postId} |
    +---------------------------------------------------------------+
                    |
                    v
    +-----------------------------+
    |    Display Comments to User  |
    +-----------------------------+
