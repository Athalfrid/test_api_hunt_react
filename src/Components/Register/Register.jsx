import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [regexError, setRegexError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la concordance des mots de passe
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    } else {
      setPasswordError("");
    }

    // Vérification de la regex pour le mot de passe
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!password.match(passwordRegex)) {
      setRegexError(
        "Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)"
      );
      return;
    } else {
      setRegexError("");
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        console.log(response);
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="card-title mb-4 text-center">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 form-group">
          <label htmlFor="name" className="form-label">
            Nom :
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmer le mot de passe :
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {passwordError && (
          <div className="alert alert-danger" role="alert">
            {passwordError}
          </div>
        )}
        {regexError && (
          <div className="alert alert-danger" role="alert">
            {regexError}
          </div>
        )}
        <div className="mb-3 form-group">
          <button type="submit" className="btn btn-primary">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
