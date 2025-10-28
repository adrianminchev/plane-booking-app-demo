import { validateForm } from "./validators";

describe("validateForm", () => {
  const baseFormData = {
    firstName: "Anita",
    lastName: "Petrova",
    departureAirport: "SOF",
    destinationAirport: "ROM",
    departureDate: "2025-10-20",
    returnDate: "2025-10-24",
  };

  test("returns empty array for valid form data", () => {
    const errors = validateForm(baseFormData);
    expect(errors).toEqual([]);
  });

  test("validates first name requirements", () => {
    const invalidData = { ...baseFormData, firstName: "" };
    const errors = validateForm(invalidData);
    expect(errors).toContain("First Name is required");

    const invalidData2 = { ...baseFormData, firstName: "Anita123" };
    const errors2 = validateForm(invalidData2);
    expect(errors2).toContain(
      "First Name should contain only letters, spaces, hyphens, or apostrophes"
    );

    const invalidData3 = { ...baseFormData, firstName: "A" };
    const errors3 = validateForm(invalidData3);
    expect(errors3).toContain(
      "First Name should be at least 2 characters long"
    );
  });

  test("validates last name requirements", () => {
    const invalidData = { ...baseFormData, lastName: "" };
    const errors = validateForm(invalidData);
    expect(errors).toContain("Last Name is required");

    const invalidData2 = { ...baseFormData, lastName: "Petrova123" };
    const errors2 = validateForm(invalidData2);
    expect(errors2).toContain(
      "Last Name should contain only letters, spaces, hyphens, or apostrophes"
    );

    const invalidData3 = { ...baseFormData, lastName: "P" };
    const errors3 = validateForm(invalidData3);
    expect(errors3).toContain("Last Name should be at least 2 characters long");
  });

  test("validates airport codes format", () => {
    const invalidData = { ...baseFormData, departureAirport: "SO" };
    const errors = validateForm(invalidData);
    expect(errors).toContain(
      "Departure Airport should be 3 uppercase letters (e.g., SOF, LON)"
    );

    const invalidData2 = { ...baseFormData, destinationAirport: "ROME" };
    const errors2 = validateForm(invalidData2);
    expect(errors2).toContain(
      "Destination Airport should be 3 uppercase letters (e.g., VAR, BER)"
    );
  });

  test("validates different departure and destination airports", () => {
    const invalidData = {
      ...baseFormData,
      departureAirport: "SOF",
      destinationAirport: "SOF",
    };
    const errors = validateForm(invalidData);
    expect(errors).toContain(
      "Departure and Destination airports must be different"
    );
  });

  test("validates date order", () => {
    const invalidData = {
      ...baseFormData,
      departureDate: "2025-10-24",
      returnDate: "2025-10-20",
    };
    const errors = validateForm(invalidData);
    expect(errors).toContain("Return date must be after departure date");
  });

  test("accepts valid Cyrillic names", () => {
    const validData = {
      ...baseFormData,
      firstName: "Анна",
      lastName: "Колева",
    };
    const errors = validateForm(validData);
    expect(errors).toEqual([]);
  });

  test("accepts names with hyphens and apostrophes", () => {
    const validData = {
      ...baseFormData,
      firstName: "Mary-Ann",
      lastName: "O'Connor",
    };
    const errors = validateForm(validData);
    expect(errors).toEqual([]);
  });

  test("validates airport codes are case insensitive", () => {
    const validData = {
      ...baseFormData,
      departureAirport: "sof",
      destinationAirport: "rom",
    };
    const errors = validateForm(validData);
    expect(errors).toEqual([]);
  });

  test("returns multiple errors for multiple invalid fields", () => {
    const invalidData = {
      firstName: "A",
      lastName: "",
      departureAirport: "S",
      destinationAirport: "SOF",
      departureDate: "2025-10-20",
      returnDate: "2025-10-24",
    };
    const errors = validateForm(invalidData);
    expect(errors.length).toBeGreaterThan(1);
    expect(errors).toContain("First Name should be at least 2 characters long");
    expect(errors).toContain("Last Name is required");
    expect(errors).toContain(
      "Departure Airport should be 3 uppercase letters (e.g., SOF, LON)"
    );
  });
});
