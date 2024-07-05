import React from "react";
import { NavLink } from "react-router-dom";
import "./HomeStyle.css"; // Ajoutez votre CSS personnalisé ici

const Home = () => {
  const userLogged = localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged"))
    : null;

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to WIKIHUNT</h1>
        {userLogged && userLogged.isLogged ? (
          <p>Hello, {userLogged.name.charAt(0).toUpperCase() + userLogged.name.slice(1)}! Glad to see you back.</p>
        ) : (
          <p>Welcome! Please <NavLink to="/login">Login</NavLink> or <NavLink to="/register">Register</NavLink> to get started.</p>
        )}
      </div>
      
      <div className="content-section">
        <h2>Recent Articles</h2>
        {/* Ajoutez ici une liste d'articles ou de contenus récents */}
        <p>Check out the latest updates and articles from our community.</p>
      </div>
      
      <div className="about-section">
        <h2>About WIKIHUNT</h2>
        <p>WIKIHUNT is a platform where you can explore, discover, and contribute to a wide range of topics. Whether you're looking for information or want to share your knowledge, WIKIHUNT is the place to be.</p>
      </div>
      
      <div className="cta-section">
        <h2>Get Involved</h2>
        {userLogged && userLogged.isLogged ? (
          <p>Start contributing now! Head to the <NavLink to="/profile">Profile</NavLink> section to update your information or begin a new search.</p>
        ) : (
          <p>Join our community! <NavLink to="/register">Register</NavLink> today and start exploring.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
