import { renderHook, act } from "@testing-library/react";
import { useBookings } from "./useBooking";
import { allBookings } from "../services/mockData";

jest.mock("../services/mockData", () => ({
  allBookings: [
    {
      id: 1,
      firstName: "Anita",
      lastName: "Petrova",
      departureAirport: "SOF",
      destinationAirport: "ROM",
      departureDate: "2025-10-20",
      returnDate: "2025-10-24",
    },
    {
      id: 2,
      firstName: "Maria",
      lastName: "Ivanova",
      departureAirport: "MIL",
      destinationAirport: "SOF",
      departureDate: "2025-10-24",
      returnDate: "2025-10-28",
    },
    {
      id: 3,
      firstName: "Peter",
      lastName: "Jelev",
      departureAirport: "SOF",
      destinationAirport: "VIE",
      departureDate: "2025-10-22",
      returnDate: "2025-10-26",
    },
    {
      id: 4,
      firstName: "Ivan",
      lastName: "Stratiev",
      departureAirport: "FLR",
      destinationAirport: "SOF",
      departureDate: "2025-10-20",
      returnDate: "2025-10-24",
    },
    {
      id: 5,
      firstName: "Silvia",
      lastName: "Nedyalkova",
      departureAirport: "MIL",
      destinationAirport: "SOF",
      departureDate: "2025-10-21",
      returnDate: "2025-10-25",
    },
  ],
}));

describe("useBookings", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("loads initial bookings", async () => {
    const { result } = renderHook(() => useBookings());

    expect(result.current.loading).toBe(false);
    expect(result.current.bookings).toEqual([]);

    await act(async () => {
      result.current.loadBookings(1);
      jest.advanceTimersByTime(500);
    });

    expect(result.current.bookings).toHaveLength(4);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.page).toBe(1);
  });

  test("loads more bookings on load more", async () => {
    const { result } = renderHook(() => useBookings());

    await act(async () => {
      result.current.loadBookings(1);
      jest.advanceTimersByTime(500);
    });

    await act(async () => {
      result.current.loadBookings(2, true);
      jest.advanceTimersByTime(500);
    });

    expect(result.current.bookings).toHaveLength(5);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.page).toBe(2);
  });

  test("deletes a booking and reloads the list", async () => {
    const { result } = renderHook(() => useBookings());

    await act(async () => {
      result.current.loadBookings(1);
      jest.advanceTimersByTime(500);
    });

    const initialBookings = result.current.bookings;

    await act(async () => {
      result.current.deleteBooking(1);
    });

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.bookings).not.toEqual(initialBookings);
  });

  test("returns early when already loading", async () => {
    const { result } = renderHook(() => useBookings());

    result.current.loading = true;

    await act(async () => {
      result.current.loadBookings(1);
    });

    expect(result.current.bookings).toEqual([]);
  });
});
