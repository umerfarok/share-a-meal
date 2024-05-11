import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './Auth/AuthContext';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import ConfirmSignUp from './Auth/ConfirmSignUp';
import Profile from './Auth/UserProfile';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import RouteGuard from './protectRoute';
import AdminDashboard from './components/AdminDashboard';
import CreateListing from './components/CreateListing';
import ListingList from './components/ListingList';
import ListingDetails from './components/ListingDetails';
import RestaurantRatings from './components/RestaurantRatings';
import RestaurantProfile from './components/RestaurantProfile';
import UpdateRestaurantProfile from './components/UpdateRestaurantProfile';
import Navbar from './components/Navbar/Navbar';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/about" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/listings" element={<ListingList />} />
              <Route path="/listings/:listingId" element={<ListingDetails />} />
              <Route
                path="/restaurants/:restaurantId/ratings"
                element={<RestaurantRatings />}
              />
              <Route path="/restaurant-profile" element={<RestaurantProfile />} />
              <Route
                path="/update-restaurant-profile"
                element={<UpdateRestaurantProfile />}
              />
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
    </AuthProvider>
  );
}

export default App;