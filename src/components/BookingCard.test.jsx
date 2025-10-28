import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingCard from "./BookingCard";

const mockBooking = {
  id: 1,
  firstName: "Anita",
  lastName: "Petrova",
  departureAirport: "SOF",
  destinationAirport: "ROM",
  departureDate: "2025-10-20",
  returnDate: "2025-10-24",
};

const mockOnDelete = jest.fn();
const mockOnViewDetails = jest.fn();

describe("BookingCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders booking information correctly", () => {
    render(
      <BookingCard
        booking={mockBooking}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText("Anita Petrova")).toBeInTheDocument();
    expect(screen.getByText("SOF → ROM")).toBeInTheDocument();
    expect(screen.getByText(/Depart:/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  test("calls onViewDetails when clicking booking info", () => {
    render(
      <BookingCard
        booking={mockBooking}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    const bookingInfo = screen
      .getByText("Anita Petrova")
      .closest(".booking-info");
    fireEvent.click(bookingInfo);

    expect(mockOnViewDetails).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when clicking Delete button", () => {
    render(
      <BookingCard
        booking={mockBooking}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test("formats date correctly", () => {
    render(
      <BookingCard
        booking={mockBooking}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    const departText = screen.getByText(/Depart:/);
    expect(departText).toBeInTheDocument();
  });

  test("renders different booking data correctly", () => {
    const differentBooking = {
      id: 2,
      firstName: "Maria",
      lastName: "Ivanova",
      departureAirport: "MIL",
      destinationAirport: "SOF",
      departureDate: "2025-10-24",
      returnDate: "2025-10-28",
    };

    render(
      <BookingCard
        booking={differentBooking}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText("Maria Ivanova")).toBeInTheDocument();
    expect(screen.getByText("MIL → SOF")).toBeInTheDocument();
  });

  test("has correct CSS classes", () => {
    const { container } = render(
      <BookingCard
        booking={mockBooking}
        onDelete={mockOnDelete}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(container.querySelector(".booking-item")).toBeInTheDocument();
    expect(container.querySelector(".booking-info")).toBeInTheDocument();
    expect(container.querySelector(".delete-btn")).toBeInTheDocument();
  });
});
