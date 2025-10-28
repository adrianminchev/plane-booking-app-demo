import React from "react";
import BookingCard from "./BookingCard";
import "../../src/styles/components/BookingList.css";

const BookingList = ({
  bookings,
  loading,
  hasMore,
  onDelete,
  onViewDetails,
}) => {
  return (
    <div className="bookings">
      <h2>Listed Bookings</h2>
      {bookings.length === 0 && !loading ? (
        <p>No bookings found</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
      {loading && <div className="loading-more">Loading more bookings...</div>}
      {hasMore && !loading && bookings.length > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#666",
            padding: "20px",
          }}
        >
          Scroll down to view more of the listed bookings
        </p>
      )}
    </div>
  );
};

export default BookingList;
