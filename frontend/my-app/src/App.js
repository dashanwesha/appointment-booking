import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import LandingPage from "./components/LandingPage";
import AppointmentsList from "./components/AppointmentsList";
import BookingForm from "./components/BookingForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  const fetchAppointments = () => {
    axios.get("http://localhost:5000/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/appointments"
        element={
          <>
            <SignedIn>
              <div className="container">
                <h1>Appointment Booking</h1>
                {/* Pass fetchAppointments to trigger refresh after booking */}
                <BookingForm refreshAppointments={fetchAppointments} />
                <h2>Upcoming Appointments</h2>
                {/* Pass appointments to display the latest list */}
                <AppointmentsList appointments={appointments} fetchAppointments={fetchAppointments} />
              </div>
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default App;
