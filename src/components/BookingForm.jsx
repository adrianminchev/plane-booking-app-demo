import React from "react";
import "../../src/styles/components/BookingForm.css";

const BookingForm = ({ formData, setFormData, onSubmit, validateForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.departureAirport.trim() ||
      !formData.destinationAirport.trim() ||
      !formData.departureDate ||
      !formData.returnDate
    ) {
      alert("Please fill all fields");
      return;
    }

    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(today.getFullYear() + 1);
    const departureDateObj = new Date(formData.departureDate);
    const returnDateObj = new Date(formData.returnDate);

    if (departureDateObj > oneYearFromNow) {
      alert("Departure date cannot be more than 1 year from now");
      return;
    }

    if (returnDateObj > oneYearFromNow) {
      alert("Return date cannot be more than 1 year from now");
      return;
    }

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    onSubmit();
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Book Your Plane Flight Today!</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="First Name (letters only)"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name (letters only)"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="Departure Airport (3 letters)"
          value={formData.departureAirport}
          onChange={(e) =>
            setFormData({
              ...formData,
              departureAirport: e.target.value.toUpperCase(),
            })
          }
          maxLength="3"
        />
        <input
          type="text"
          placeholder="Destination Airport (3 letters)"
          value={formData.destinationAirport}
          onChange={(e) =>
            setFormData({
              ...formData,
              destinationAirport: e.target.value.toUpperCase(),
            })
          }
          maxLength="3"
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          value={formData.departureDate}
          onChange={(e) =>
            setFormData({ ...formData, departureDate: e.target.value })
          }
          min={today}
          max={maxDateString}
        />
        <input
          type="date"
          value={formData.returnDate}
          onChange={(e) =>
            setFormData({ ...formData, returnDate: e.target.value })
          }
          min={formData.departureDate || today}
          max={maxDateString}
        />
      </div>

      <button type="submit">Create Booking</button>
    </form>
  );
};

export default BookingForm;
