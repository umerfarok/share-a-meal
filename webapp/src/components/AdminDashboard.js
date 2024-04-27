import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../shared/utils/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get('/admin/users');
        setUsers(usersResponse.data);

        const listingsResponse = await api.get('/admin/listings');
        setListings(listingsResponse.data);

        const reportsResponse = await api.get('/admin/reports');
        setReports(reportsResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <Link to={`/admin/users/${user._id}`}>{user.email}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Listings</h3>
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <Link to={`/admin/listings/${listing._id}`}>{listing.foodType}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Reported Issues</h3>
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              <Link to={`/admin/reports/${report._id}`}>{report.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;