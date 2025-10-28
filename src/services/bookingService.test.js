import { createNewBooking, resetFormData } from "./bookingService";

describe("bookingService", () => {
  describe("createNewBooking", () => {
    test("creates new booking with unique ID", () => {
      const formData = {
        firstName: "Anita",
        lastName: "Petrova",
        departureAirport: "SOF",
        destinationAirport: "ROM",
        departureDate: "2025-10-20",
        returnDate: "2025-10-24",
      };

      const result = createNewBooking(formData);

      expect(result).toMatchObject({
        firstName: "Anita",
        lastName: "Petrova",
        departureAirport: "SOF",
        destinationAirport: "ROM",
        departureDate: "2025-10-20",
        returnDate: "2025-10-24",
      });

      expect(result.id).toMatch(/^booking-/);
      expect(result.id).toContain("-");
    });

    test("generates different IDs for different bookings", () => {
      const formData = {
        firstName: "Anita",
        lastName: "Petrova",
      };

      const booking1 = createNewBooking(formData);
      const booking2 = createNewBooking(formData);

      expect(booking1.id).not.toBe(booking2.id);
    });
  });

  describe("resetFormData", () => {
    test("returns empty form data object", () => {
      const result = resetFormData();

      expect(result).toEqual({
        firstName: "",
        lastName: "",
        departureAirport: "",
        destinationAirport: "",
        departureDate: "",
        returnDate: "",
      });
    });
  });
});
