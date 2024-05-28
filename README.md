# chat-app
this is chat app where user can send mesage and gifs

## Features

- Real-time messaging with Socket.IO
- User registration and authentication
- Admin can add GIFs
- Users can purchase GIFs using Stripe
- Users can send purchased GIFs to friends

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Socket.IO**: Enables real-time communication.
- **MongoDB**: NoSQL database for storing user and GIF data.
- **UploadThing**: Handles gifs uploads.
- **Tailwind CSS**: Utility-first CSS framework for designing responsive and modern UIs.
- **Stripe**: Payment processing platform for handling purchases of GIFs.
- **Express**: Web framework for Node.js, used in the custom server configuration.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/anilstha1/chat-app.git
   cd chat-app
   ```
2. **Install the dependencies:**
    
    ```bash
    cd chat-app-admin
    npm install
    cd ../chat-app-client
    npm install
    ```

3. **setup Environment Variables:**
    Create a .env file in the /chat-app-admin and /chat-app-client of your project and copy environment variables form .env.sample

4. **Start the development server:**
    ```bash
    cd chat-app-admin
    npm run dev
    cd ../chat-app-client
    npm run dev
    ```
5. Open your browser and navigate to http://localhost:3000.

