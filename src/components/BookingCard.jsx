import React from "react";
import "../../src/styles/components/BookingCard.css";

const BookingCard = ({ booking, onDelete, onViewDetails }) => {
  return (
    <div className="booking-item">
      <div className="booking-info" onClick={() => onViewDetails(booking.id)}>
        <strong>
          {booking.firstName} {booking.lastName}
        </strong>
        <span>
          {booking.departureAirport} → {booking.destinationAirport}
        </span>
        <span>
          Depart: {new Date(booking.departureDate).toLocaleDateString()}
        </span>
      </div>
      <button onClick={() => onDelete(booking.id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default BookingCard;
