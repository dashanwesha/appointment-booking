import { useEffect, useState } from "react";
import axios from "axios";


const AppointmentsList = ({ appointments, fetchAppointments }) => {
  // const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

 

  const handleCancel = async (id) => {
    try {
      await axios.delete(`https://appointment-booking-avhh.onrender.com/api/appointments/${id}`);
      
      // 🔥 Refresh the list after deletion
      fetchAppointments();
    } catch (err) {
      console.error("Error canceling appointment:", err);
    }
  };

  return (
    <ul className="appointments-list">
      {appointments.length > 0 ? (
        appointments.map((a) => (
          <li key={a._id}>
            <p>{a.name} - {a.time}</p>
            <p>Appointment Date: {new Date(a.date).toLocaleDateString()}</p>
            <button onClick={() => handleCancel(a._id)} className="cancel-btn">
              Cancel
            </button>
          </li>
        ))
      ) : (
        <p>No appointments yet.</p>
      )}
    </ul>
  );
};

export default AppointmentsList;
