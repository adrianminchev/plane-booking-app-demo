# Plane Ticket Booking Application

A modern React-based web application for booking, viewing, and managing plane tickets.  
Includes real-time validation, smooth UI interactions, and comprehensive test coverage.

---

## Quick Start

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm start
```
Application runs at: [http://localhost:3000](http://localhost:3000)

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Build for Production
```bash
npm run build
```

---

## ✨ Features

- **Create Bookings:** Interactive form with real-time validation  
- **View Bookings:** Paginated list with infinite scroll  
- **Delete Bookings:** Remove bookings with confirmation dialog  
- **Booking Details:** Modal with detailed booking info  
- **Form Validation:** Client-side validation in real time  
- **Date Restrictions:** No past dates, max 1 year in advance  
- **Airport Validation:** 3-letter codes, departure ≠ destination  

---

## 🧪 Testing

The application includes **comprehensive test coverage**:

- **41 Total Tests** covering all components and utilities  
- **Component Tests:** Rendering, user interactions, props  
- **Hook Tests:** State management and side effects  
- **Utility Tests:** Validation and service functions  

Run all tests:
```bash
npm test
```

---

## 📁 Project Structure
```text
src/
├── components/
│   ├── BookingForm.jsx
│   ├── BookingList.jsx
│   ├── BookingCard.jsx
│   └── BookingModal.jsx
├── hooks/
│   └── useBooking.js
├── services/
│   ├── bookingService.js
│   └── mockData.js
├── utils/
│   └── validators.js
└── styles/
```

---

## ✅ Ready to Use?

Run:
```bash
npm start
```
Then open your browser and start booking flights!

---
