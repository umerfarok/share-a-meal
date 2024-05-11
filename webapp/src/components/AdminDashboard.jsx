import { Link } from 'react-router-dom';
import { useGetApi } from '../api';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)({
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '10px',
});

const AdminDashboard = () => {
  const { data: users, error: usersError, isLoading: usersLoading } = useGetApi('/admin/users', 'users');

  if (usersLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (usersError) {
    return <Typography variant="h4">An error occurred.</Typography>;
  }

  return (
    <StyledContainer>
      <Typography variant="h2">Admin Dashboard</Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3">Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Is Restaurant</TableCell>
                <TableCell>Restaurant Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Link to={`/admin/users/${user._id}`}>{user.email}</Link>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.isRestaurant ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {user.isRestaurant && user.restaurantInfo ? (
                      <div>
                        <p>Name: {user.restaurantInfo.name}</p>
                        <p>Location: {user.restaurantInfo.location}</p>
                        <p>Contact Info: {user.restaurantInfo.contactInfo}</p>
                        <p>Operating Hours: {user.restaurantInfo.operatingHours}</p>
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StyledContainer>
  );
};

export default AdminDashboard;