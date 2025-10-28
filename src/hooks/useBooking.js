import { useState, useEffect } from "react";
import { allBookings } from "../services/mockData";

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deletedBookings, setDeletedBookings] = useState(new Set());

  const loadBookings = async (pageNum = 1, append = false) => {
    if (loading) return;
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const availableBookings = allBookings.filter(
        (booking) => !deletedBookings.has(booking.id)
      );
      const itemsPerPage = 4;
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const mockData = availableBookings.slice(startIndex, endIndex);

      if (append) {
        setBookings((prev) => [...prev, ...mockData]);
      } else {
        setBookings(mockData);
      }

      setHasMore(endIndex < availableBookings.length);
      setPage(pageNum);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = (id) => {
    setDeletedBookings((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    if (deletedBookings.size > 0) {
      loadBookings(1, false);
    }
  }, [deletedBookings]);

  return {
    bookings,
    page,
    hasMore,
    loading,
    loadBookings,
    deleteBooking,
    setBookings,
  };
};
