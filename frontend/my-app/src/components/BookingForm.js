import { useState } from "react";
import axios from "axios";

const BookingForm = ({ refreshAppointments }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", time: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://appointment-booking-avhh.onrender.com/api/book", formData);

      if (response.status === 201 || response.status === 200) {
        alert(`✅ Appointment booked successfully!`);

        // Reset form fields
        setFormData({ name: "", phone: "", date: "", time: "" });

        // 🔥 Refresh appointments list
        refreshAppointments();
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "❌ Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
        <input type="tel" name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Booking..." : "Book Appointment"}</button>
      </form>
    </div>
  );
};

export default BookingForm;
