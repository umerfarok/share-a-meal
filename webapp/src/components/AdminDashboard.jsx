import { Link } from 'react-router-dom';
import { useApi } from '../api';

const AdminDashboard = () => {
  const { data: users, error: usersError, isLoading: usersLoading } = useApi('/admin/users', 'users');
  const { data: listings, error: listingsError, isLoading: listingsLoading } = useApi('/admin/listings', 'listings');
  const { data: reports, error: reportsError, isLoading: reportsLoading } = useApi('/admin/reports', 'reports');

  if (usersLoading || listingsLoading || reportsLoading) {
    return 'Loading...';
  }

  if (usersError || listingsError || reportsError) {
    return 'An error occurred.';
  }
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