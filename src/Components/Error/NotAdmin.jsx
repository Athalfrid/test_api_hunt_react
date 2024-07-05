import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotAdmin = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const userLogged = localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged"))
    : null;

    useEffect(() => {
      // Définir l'intervalle pour mettre à jour le décompte chaque seconde
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
  
      // Nettoyer l'intervalle et rediriger l'utilisateur une fois le temps écoulé
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000); // 5000 millisecondes = 5 secondes
  
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }, [navigate]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">402 - Admin Access only</h1>
      <p className="text-center">
        Sorry, the page you are looking for requires Admin privilegies !
      </p>
      <div className="d-flex justify-content-center">
        <p>
        You will be redirected to the home page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default NotAdmin;
