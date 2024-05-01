import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from "./Auth/AuthContext";
// import Home from "./Home";
// import Contact from "./Contact";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ConfirmSignUp from "./Auth/ConfirmSignUp";
import Profile from "./Auth/UserProfile";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import RouteGuard from "./protectRoute";
import AdminDashboard from "./components/AdminDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retries: (failureCount, error) => {
        // Only retry if the error was a network error
        if (error.message === 'Network Error') {
          // Retry up to 3 times, with a delay of 1 second between retries
          return failureCount <= 1 ? 1000 : false;
        }
        // Do not retry for other types of errors
        return false;
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li><Link to="/admin">AdminDashboard</Link></li>
            </ul>
          </nav>

          <main>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/about" element={<Profile />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
              <Route path="/admin" element={<AdminDashboard />} />

              <Route
                path="/profile"
                element={
                  <RouteGuard>
                    <Profile />
                  </RouteGuard>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider >
  );
}

export default App;