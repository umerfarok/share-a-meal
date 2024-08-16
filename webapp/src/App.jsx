import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Amplify } from 'aws-amplify';
import { AuthProvider } from './Auth/AuthContext';

import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import ConfirmSignUp from './Auth/ConfirmSignUp';
import Profile from './Auth/UserProfile';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import CreateListing from './components/CreateListing';
import ListingList from './components/ListingList';
import ListingDetails from './components/ListingDetails';
import RestaurantRatings from './components/RestaurantRatings';
import RestaurantProfile from './components/RestaurantProfile';
import UpdateRestaurantProfile from './components/UpdateRestaurantProfile';
import RouteGuard from './protectRoute';
import './styles.css';
import cognitoConfig from './Auth/cognitoConfig';

Amplify.configure({
  Auth: {
    region: cognitoConfig.region,
    userPoolId: cognitoConfig.userPoolId,
    userPoolWebClientId: cognitoConfig.userPoolWebClientId,
    oauth: cognitoConfig.oauth,
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/about" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
              <Route path="/admin" element={<RouteGuard><AdminDashboard /></RouteGuard>} />
              <Route path="/create-listing" element={<RouteGuard><CreateListing /></RouteGuard>} />
              <Route path="/listings" element={<ListingList />} />
              <Route path="/listings/:listingId" element={<ListingDetails />} />
              <Route path="/restaurants/:restaurantId/ratings" element={<RestaurantRatings />} />
              <Route path="/restaurant-profile" element={<RouteGuard><RestaurantProfile /></RouteGuard>} />
              <Route path="/update-restaurant-profile" element={<RouteGuard><UpdateRestaurantProfile /></RouteGuard>} />
              <Route path="/profile" element={<RouteGuard><Profile /></RouteGuard>} />
            </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;