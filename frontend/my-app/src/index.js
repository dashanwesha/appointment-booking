import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  console.error("Missing Clerk API Key. Check your .env file.");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <Router>
        <App />
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
