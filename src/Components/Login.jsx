import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../store/firebase";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!userData.email || !userData.password) {
        toast.error("Please fill in all fields");
        return;
      }
      
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        toast.success("Login Successful!", {
          onClose: () => {
            navigate("/");
          }
        });

        // Clear form after login
        setUserData({ email: "", password: "" });
      } catch (error) {
        setLoading(false);
        const errorMessage = 
          error.code === "auth/wrong-password" ? "Incorrect password. Please try again." :
          error.code === "auth/user-not-found" ? "No user found with this email." :
          error.code === "auth/invalid-email" ? "Invalid email address." :
          "An error occurred. Please try again.";
        
        toast.error(errorMessage);
      }
    },
    [userData, navigate]
  );

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const handleRegisterRedirect = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-sm text-blue-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg disabled:bg-gray-400 hover:bg-blue-600"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
