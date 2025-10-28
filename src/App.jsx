import React, { useState, useEffect } from "react";
import "./styles/base/globals.css";
import "./styles/layout/App.css";
import BookingList from "./components/BookingList";
import BookingModal from "./components/BookingModal";
import BookingForm from "./components/BookingForm";
import { useBookings } from "./hooks/useBooking";
import { validateForm } from "./utils/validators";
import { createNewBooking, resetFormData } from "./services/bookingService";

function App() {
  const {
    bookings,
    page,
    hasMore,
    loading,
    loadBookings,
    deleteBooking,
    setBookings,
  } = useBookings();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState(resetFormData());

  useEffect(() => {
    loadBookings(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        hasMore &&
        !loading
      ) {
        loadBookings(page + 1, true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, loading, loadBookings]);

  const handleCreateBooking = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newBooking = createNewBooking(formData);
      setBookings((prev) => [newBooking, ...prev]);
      setFormData(resetFormData());
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking");
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      deleteBooking(id);
      alert("Booking deleted!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking");
    }
  };

  const handleViewBookingDetails = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const booking = bookings.find((b) => b.id === id);
      setSelectedBooking(booking);
    } catch (error) {
      console.error("Error loading booking details:", error);
      alert("Error loading booking details");
    }
  };

  return (
    <div className="app">
      <h1>Plane Booking Application</h1>
      <BookingForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateBooking}
        validateForm={() => validateForm(formData)}
      />
      <BookingList
        bookings={bookings}
        loading={loading}
        hasMore={hasMore}
        onDelete={handleDeleteBooking}
        onViewDetails={handleViewBookingDetails}
      />
      <BookingModal
        selectedBooking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}

export default App;
