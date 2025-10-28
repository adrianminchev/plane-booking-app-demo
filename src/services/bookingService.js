export const createNewBooking = (formData) => {
  return {
    id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    ...formData,
  };
};

export const resetFormData = () => ({
  firstName: "",
  lastName: "",
  departureAirport: "",
  destinationAirport: "",
  departureDate: "",
  returnDate: "",
});
