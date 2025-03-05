import React from "react";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "../LandingPage.css"; 

const LandingPage = () => {
  const { isSignedIn } = useUser();  // Check if user is signed in
  const navigate = useNavigate();  // Hook to navigate between pages

  return (
    <div className="landing-container">
      <div className="overlay">
        <h1>Welcome to Our Women's Hair Salon</h1>
        <p>Book an appointment for a luxurious hair experience.</p>
        
        {/* Show button based on whether user is signed in */}
        {isSignedIn ? (
          <button onClick={() => navigate("/appointments")}>Go to Appointments</button>
        ) : (
          <div className="buttons">
            {/* If not signed in, show login/signup buttons */}
            <SignInButton mode="modal">
              <button>Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button>Sign Up</button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
