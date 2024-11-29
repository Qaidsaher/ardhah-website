// src/types.js
import PropTypes from 'prop-types';

export const BookingPropType = PropTypes.shape({
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  details: PropTypes.string,
  image: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
});

export const BillboardPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  locationAddress: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  ads: PropTypes.object.isRequired,
  bookings: PropTypes.arrayOf(BookingPropType),
  locationLat: PropTypes.number,
  locationLng: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
});
