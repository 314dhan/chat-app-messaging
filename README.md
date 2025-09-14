# Simple Chat App

A simple, real-time web-based chat application built with Node.js, Express, and a Vue.js frontend. Messages are stored in a local JSON file, acting as a simple database.

## Features

- **Real-time Messaging:** Send and receive messages instantly.
- **JSON Database:** Messages are persisted in a `db.json` file.
- **Vue.js Frontend:** A reactive and modern user interface.
- **Grouped Consecutive Messages:** Messages from the same user are grouped together for a cleaner look.
- **Delete All Messages:** A button to clear the entire chat history.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vue.js (via CDN), HTML, CSS
- **Database:** JSON file (`db.json`)

## Setup and Installation

1.  **Clone the repository (or download the files).**

2.  **Install dependencies:**
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```

3.  **Run the server:**
    ```bash
    node server.js
    ```

4.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000`.
