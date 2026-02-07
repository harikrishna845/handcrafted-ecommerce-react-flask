import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;

    fetch(`http://127.0.0.1:5000/profile/${email}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (!email) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Please login first
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "30px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2>User Profile</h2>

        {user ? (
          <>
            <p style={{ marginTop: "20px" }}>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button
              onClick={handleLogout}
              style={{
                marginTop: "30px",
                padding: "12px 24px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Profile;
