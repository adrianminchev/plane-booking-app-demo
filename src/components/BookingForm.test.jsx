import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "./BookingForm";

const mockSetFormData = jest.fn();
const mockOnSubmit = jest.fn();
const mockValidateForm = jest.fn();

const defaultProps = {
  formData: {
    firstName: "",
    lastName: "",
    departureAirport: "",
    destinationAirport: "",
    departureDate: "",
    returnDate: "",
  },
  setFormData: mockSetFormData,
  onSubmit: mockOnSubmit,
  validateForm: mockValidateForm,
};

describe("BookingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form correctly", () => {
    render(<BookingForm {...defaultProps} />);

    expect(
      screen.getByText("Book Your Plane Flight Today!")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("First Name (letters only)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Last Name (letters only)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Departure Airport (3 letters)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Destination Airport (3 letters)")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Booking" })
    ).toBeInTheDocument();
  });

  test("shows alert when submitting with empty fields", async () => {
    window.alert = jest.fn();
    render(<BookingForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", { name: "Create Booking" });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill all fields");
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("allows input in form fields and converts airport to uppercase", async () => {
    render(<BookingForm {...defaultProps} />);

    const firstNameInput = screen.getByPlaceholderText(
      "First Name (letters only)"
    );
    await userEvent.type(firstNameInput, "Maria");
    expect(mockSetFormData).toHaveBeenCalled();

    const airportInput = screen.getByPlaceholderText(
      "Departure Airport (3 letters)"
    );

    mockSetFormData.mockClear();

    await userEvent.type(airportInput, "sof");

    expect(mockSetFormData).toHaveBeenCalledTimes(3);

    const calls = mockSetFormData.mock.calls;
    const departureAirportValues = calls.map(
      (call) => call[0].departureAirport
    );

    expect(departureAirportValues).toContain("S");
    expect(departureAirportValues).toContain("O");
    expect(departureAirportValues).toContain("F");

    expect(departureAirportValues[departureAirportValues.length - 1]).toBe("F");
  });

  test("validates dates on submit", async () => {
    window.alert = jest.fn();
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 2);
    const futureDateString = futureDate.toISOString().split("T")[0];

    const propsWithData = {
      ...defaultProps,
      formData: {
        firstName: "Peter",
        lastName: "Jelev",
        departureAirport: "SOF",
        destinationAirport: "VAR",
        departureDate: futureDateString,
        returnDate: futureDateString,
      },
    };

    render(<BookingForm {...propsWithData} />);

    const submitButton = screen.getByRole("button", { name: "Create Booking" });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Departure date cannot be more than 1 year from now"
    );
  });

  test("calls validateForm and onSubmit on successful validation", async () => {
    window.alert = jest.fn();
    mockValidateForm.mockReturnValue([]);

    const today = new Date().toISOString().split("T")[0];
    const propsWithData = {
      ...defaultProps,
      formData: {
        firstName: "Ivan",
        lastName: "Stratiev",
        departureAirport: "SOF",
        destinationAirport: "VAR",
        departureDate: today,
        returnDate: today,
      },
    };

    render(<BookingForm {...propsWithData} />);

    const submitButton = screen.getByRole("button", { name: "Create Booking" });
    fireEvent.click(submitButton);

    expect(mockValidateForm).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("shows alert when validateForm returns errors", async () => {
    window.alert = jest.fn();
    mockValidateForm.mockReturnValue(["Error 1", "Error 2"]);

    const today = new Date().toISOString().split("T")[0];
    const propsWithData = {
      ...defaultProps,
      formData: {
        firstName: "Silvia",
        lastName: "Nedyalkova",
        departureAirport: "SOF",
        destinationAirport: "VAR",
        departureDate: today,
        returnDate: today,
      },
    };

    render(<BookingForm {...propsWithData} />);

    const submitButton = screen.getByRole("button", { name: "Create Booking" });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Error 1\nError 2");
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
