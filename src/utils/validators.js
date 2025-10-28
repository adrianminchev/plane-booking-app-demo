export const validateForm = (formData) => {
  const errors = [];
  const nameRegex = /^[A-Za-zА-Яа-я\s\-']+$/;
  const airportRegex = /^[A-Z]{3}$/;

  if (!formData.firstName.trim()) {
    errors.push("First Name is required");
  } else if (!nameRegex.test(formData.firstName.trim())) {
    errors.push(
      "First Name should contain only letters, spaces, hyphens, or apostrophes"
    );
  } else if (formData.firstName.trim().length < 2) {
    errors.push("First Name should be at least 2 characters long");
  }

  if (!formData.lastName.trim()) {
    errors.push("Last Name is required");
  } else if (!nameRegex.test(formData.lastName.trim())) {
    errors.push(
      "Last Name should contain only letters, spaces, hyphens, or apostrophes"
    );
  } else if (formData.lastName.trim().length < 2) {
    errors.push("Last Name should be at least 2 characters long");
  }

  if (!airportRegex.test(formData.departureAirport.toUpperCase())) {
    errors.push(
      "Departure Airport should be 3 uppercase letters (e.g., SOF, LON)"
    );
  }
  if (!airportRegex.test(formData.destinationAirport.toUpperCase())) {
    errors.push(
      "Destination Airport should be 3 uppercase letters (e.g., VAR, BER)"
    );
  }
  if (
    formData.departureAirport.toUpperCase() ===
    formData.destinationAirport.toUpperCase()
  ) {
    errors.push("Departure and Destination airports must be different");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(today.getFullYear() + 1);
  oneYearFromNow.setHours(23, 59, 59, 999);

  const departureDate = new Date(formData.departureDate);
  const returnDate = new Date(formData.returnDate);

  if (formData.departureDate && departureDate < today) {
    errors.push("Departure date cannot be in the past");
  }

  if (formData.returnDate && returnDate < today) {
    errors.push("Return date cannot be in the past");
  }

  if (formData.departureDate && departureDate > oneYearFromNow) {
    errors.push("Departure date cannot be more than 1 year from now");
  }

  if (formData.returnDate && returnDate > oneYearFromNow) {
    errors.push("Return date cannot be more than 1 year from now");
  }

  if (
    formData.departureDate &&
    formData.returnDate &&
    returnDate <= departureDate
  ) {
    errors.push("Return date must be after departure date");
  }

  return errors;
};
