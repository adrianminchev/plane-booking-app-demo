import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingModal from "./BookingModal";

const mockSelectedBooking = {
  id: 1,
  firstName: "Anita",
  lastName: "Petrova",
  departureAirport: "SOF",
  destinationAirport: "ROM",
  departureDate: "2025-10-20",
  returnDate: "2025-10-24",
};

const mockOnClose = jest.fn();

describe("BookingModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not render anything when selectedBooking is null", () => {
    const { container } = render(
      <BookingModal selectedBooking={null} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders modal with correct booking data", () => {
    render(
      <BookingModal
        selectedBooking={mockSelectedBooking}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Booking Details")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element.textContent === "Name: Anita Petrova";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element.textContent === "From: SOF";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element.textContent === "To: ROM";
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Departure:/)).toBeInTheDocument();
    expect(screen.getByText(/Return:/)).toBeInTheDocument();
  });

  test("formats dates correctly", () => {
    render(
      <BookingModal
        selectedBooking={mockSelectedBooking}
        onClose={mockOnClose}
      />
    );

    const departureText = screen.getByText(/Departure:/);
    const returnText = screen.getByText(/Return:/);

    expect(departureText).toBeInTheDocument();
    expect(returnText).toBeInTheDocument();
  });

  test("calls onClose when clicking overlay", () => {
    render(
      <BookingModal
        selectedBooking={mockSelectedBooking}
        onClose={mockOnClose}
      />
    );

    const overlay = screen
      .getByText("Booking Details")
      .closest(".modal-overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking Close button", () => {
    render(
      <BookingModal
        selectedBooking={mockSelectedBooking}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not call onClose when clicking inside modal", () => {
    render(
      <BookingModal
        selectedBooking={mockSelectedBooking}
        onClose={mockOnClose}
      />
    );

    const modalContent = screen.getByText("Booking Details");
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
