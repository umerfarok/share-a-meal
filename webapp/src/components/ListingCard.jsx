import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const ListingCard = ({ listing }) => {
  const { restaurant, foodType, quantity, expirationDate, dietaryInfo } = listing;

  return (
    <div className="listing-card">
      <h3>{restaurant.name}</h3>
      <p>Food Type: {foodType}</p>
      <p>Quantity: {quantity}</p>
      <p>Expiration Date: {expirationDate ? new Date(expirationDate).toLocaleDateString() : 'N/A'}</p>
      <p>Dietary Info: {dietaryInfo || 'N/A'}</p>
      <Link to={`/claim/${listing._id}`}>Claim</Link>
    </div>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.shape({
    restaurant: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    foodType: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    expirationDate: PropTypes.string,
    dietaryInfo: PropTypes.string,
    _id: PropTypes.string.isRequired 
  }).isRequired
};




export default ListingCard;