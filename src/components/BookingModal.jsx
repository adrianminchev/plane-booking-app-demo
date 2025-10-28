import React from "react";
import "../../src/styles/components/BookingModal.css";

const BookingModal = ({ selectedBooking, onClose }) => {
  if (!selectedBooking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Booking Details</h3>
        <div className="modal-content">
          <p>
            <strong>Name:</strong> {selectedBooking.firstName}{" "}
            {selectedBooking.lastName}
          </p>
          <p>
            <strong>From:</strong> {selectedBooking.departureAirport}
          </p>
          <p>
            <strong>To:</strong> {selectedBooking.destinationAirport}
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {new Date(selectedBooking.departureDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Return:</strong>{" "}
            {new Date(selectedBooking.returnDate).toLocaleDateString()}
          </p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingModal;
