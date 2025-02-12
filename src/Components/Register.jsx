import { useState } from "react";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { FormSchema } from "./FormikSchema";
import { toast } from "react-toastify";
import { auth, createUserWithEmailAndPassword } from "../store/firebase";

const Register = () => {
  const [password, setPassword] = useState(true);
  const [cpassword, setCpassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleChange = () => setPassword(!password);
  const toggleChange1 = () => setCpassword(!cpassword);

  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values, action) => {
      if (values.password !== values.cpassword) {
        toast.error("Passwords do not match!");
        return;
      }
    
      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          values.email, 
          values.password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
    
        action.resetForm();
        toast.success("Registration Successful!", {
          onClose: () => {
            navigate("/");
          }
        });
      } catch (error) {
        setLoading(false);
        const errorMessage = 
          error.code === "auth/email-already-in-use" ? "Email already in use." :
          error.code === "auth/invalid-email" ? "Invalid email address." :
          error.code === "auth/weak-password" ? "Password should be at least 6 characters." :
          "Registration failed. Please try again.";
        
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.username && touched.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && touched.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={password ? "password" : "text"}
                name="password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-sm text-blue-500"
                onClick={toggleChange}
              >
                {password ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
              </span>
            </div>
            {errors.password && touched.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={cpassword ? "password" : "text"}
                name="cpassword"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-sm text-blue-500"
                onClick={toggleChange1}
              >
                {cpassword ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
              </span>
            </div>
            {errors.cpassword && touched.cpassword && <span className="text-red-500 text-sm">{errors.cpassword}</span>}
          </div>

          <div className="d-grid mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold disabled:bg-gray-400 hover:bg-blue-600"
            >
              {loading ? "Submitting..." : "Register Now"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <NavLink to="/login" className="text-sm text-blue-500 hover:text-blue-700">
              Already have an account? Login here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
