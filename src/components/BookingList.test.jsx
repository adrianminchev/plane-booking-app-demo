import React from "react";
import { render, screen } from "@testing-library/react";
import BookingList from "./BookingList";

const mockBookings = [
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
];

const mockOnDelete = jest.fn();
const mockOnViewDetails = jest.fn();

describe("BookingList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders title and bookings", () => {
    render(
      <BookingList
        bookings={mockBookings}
        loading={false}
        hasMore={true}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText("Listed Bookings")).toBeInTheDocument();
    expect(screen.getByText("Anita Petrova")).toBeInTheDocument();
    expect(screen.getByText("Maria Ivanova")).toBeInTheDocument();
  });

  test("shows no bookings message when empty", () => {
    render(
      <BookingList
        bookings={[]}
        loading={false}
        hasMore={false}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText("No bookings found")).toBeInTheDocument();
  });

  test("shows loading message when loading", () => {
    render(
      <BookingList
        bookings={mockBookings}
        loading={true}
        hasMore={true}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText("Loading more bookings...")).toBeInTheDocument();
  });

  test("shows scroll message when has more bookings", () => {
    render(
      <BookingList
        bookings={mockBookings}
        loading={false}
        hasMore={true}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(
      screen.getByText("Scroll down to view more of the listed bookings")
    ).toBeInTheDocument();
  });

  test("does not show scroll message when loading", () => {
    render(
      <BookingList
        bookings={mockBookings}
        loading={true}
        hasMore={true}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(
      screen.queryByText("Scroll down to view more of the listed bookings")
    ).not.toBeInTheDocument();
  });
});
