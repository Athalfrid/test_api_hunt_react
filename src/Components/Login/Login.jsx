import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setStoredUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Charger l'utilisateur connecté depuis le localStorage
  useEffect(() => {
    const user = localStorage.getItem("userLogged") ? JSON.parse(localStorage.getItem("userLogged")) : null;
    if (user) {
      navigate("/");
    }
  }, [navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const loggedUser = {
          userId: data.userId,
          name: data.name,
          token: data.token,
          isLogged: true,
          role: data.role,
        };
        setStoredUser(loggedUser);
        localStorage.setItem("userLogged", JSON.stringify(loggedUser)); // Sauvegarder dans localStorage
        navigate("/");
      } else {
        if (response.status === 401) {
          const data = await response.json();
          setError(data.message);
        } else if (response.status === 400) {
          setError("Requête invalide. Veuillez vérifier vos informations.");
        } else {
          setError("Erreur lors de la connexion.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Erreur lors de la connexion.");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="card-title mb-4 text-center">Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 form-group">
          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
            autoFocus
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
          <button type="submit" className="btn btn-primary">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
