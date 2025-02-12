import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Register from './Components/Register';
import HomePage from './Components/HomePage';
import VideoPage from './Components/VideoPage';
import Login from './Components/Login';
import { useEffect, useState } from 'react';
import { AuthProvider } from './store/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper function to check authentication status
const isAuthenticated = () => {
  // You can replace this with your logic to verify the token or use a global state for authentication
  return localStorage.getItem('token') !== null;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  if (isAuthenticated()) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Check authentication when the app loads
    const authStatus = isAuthenticated();
    setIsAuthChecked(true);
  }, []);

  // Don't render routes until the authentication check is done
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/room/:id",
      element: <PrivateRoute element={<VideoPage />} /> // Protect this route
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <AuthProvider>
   
      <RouterProvider router={router} />
    
    <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    </AuthProvider>
  );
}

export default App;
