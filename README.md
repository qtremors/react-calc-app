# Calculator App

This is a full-stack calculator application with a React frontend and a Node.js backend. It supports basic arithmetic operations, history tracking, and theme switching.

## Features

- **Basic Arithmetic Operations:** Perform addition, subtraction, multiplication, division, percentage, square root, and exponentiation.
- **Responsive UI:** The user interface is designed to be fully responsive, ensuring a great experience on various screen sizes.
- **Expression Evaluation:** The backend handles complex mathematical expressions.
- **Enhanced Error Handling:** Provides specific error messages for invalid expressions, such as "Division by zero."
- **Calculation History:** Tracks previous calculations for easy reference and reuse.
- **Theme Switching:** Toggle between light and dark themes.
- **Keyboard Support:** Use your keyboard to input numbers and operations.

## Technologies Used

### Frontend (Client)
- React.js
- CSS (for styling and responsiveness)

### Backend (Server)
- Node.js
- Express.js
- math.js (for mathematical expression evaluation)
- CORS (for cross-origin resource sharing)

## Setup Instructions

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Calculator
    ```

2.  **Backend Setup:**
    Navigate to the `server` directory, install dependencies, and start the server.
    ```bash
    cd server
    npm install
    npm start
    ```
    The backend server will run on `http://localhost:5000`.

3.  **Frontend Setup:**
    Open a new terminal, navigate to the `client` directory, install dependencies, and start the React app.
    ```bash
    cd ../client
    npm install
    npm start
    ```
    The React development server will open the application in your browser, usually at `http://localhost:3000`.

## Usage

- Enter numbers and operations using the on-screen buttons or your keyboard.
- Use the `AC` button to clear all input.
- Use the `C` button to clear the last entered character.
- Click the history icon to view past calculations.
- Click the sun/moon icon to switch between light and dark themes.

