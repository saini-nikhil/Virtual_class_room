# Virtual Classroom

## Overview
Virtual Classroom is a web application that enables real-time video conferencing and interactive learning experiences. Built using **React**, this app leverages **ZegoCloud** for video and audio streaming, **Firebase** for authentication, and **Tailwind CSS** for styling.

## Features
- **Live Video Conferencing:** Seamless real-time communication powered by **ZegoCloud**.
- **User Authentication:** Secure authentication using **Firebase**.
- **Responsive UI:** Styled with **Tailwind CSS** for a modern and responsive design.
- **Interactive Learning:** Allows users to join and host virtual classes.
- **Scalability:** Designed to support multiple users simultaneously.

## Tech Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Video & Audio Streaming:** ZegoCloud
- **Authentication:** Firebase

## Installation
### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** or **yarn**

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/virtual-classroom.git
   cd virtual-classroom
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase Authentication and ZegoCloud:
   - Create a **Firebase** project and enable authentication (Email/Password or Google Sign-In).
   - Obtain your **ZegoCloud App ID** and **Server Secret** from the ZegoCloud dashboard.
   - Create a `.env` file in the root directory and add:
     ```env
     REACT_APP_ZEGO_APP_ID=your_zego_app_id
     REACT_APP_ZEGO_SERVER_SECRET=your_zego_server_secret
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
     ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open `http://localhost:3000` in your browser to use the Virtual Classroom.

## Deployment
To deploy the application, you can use **Vercel**, **Netlify**, or **Firebase Hosting**.

### Deploying on Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any queries or issues, feel free to contact:
- **GitHub:** [your-username](https://github.com/your-username)
- **Email:** your-email@example.com

