import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import userIcon from "../assets/img/user-icon.png"; // ícone padrão do perfil

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verifica se o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem("pp_token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("pp_token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <i className="fas fa-paw"></i>
          <Link to="/" className="logo-text">
            Pet<span className="highlight">Palace</span>
          </Link>
        </div>

        {/* Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/servicos">Serviços</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/reservar">Reservar</Link>

          {!isLoggedIn ? (
            <Link to="/login" className="btn">Entrar</Link>
          ) : (
            <div className="user-menu">
              <img
                src={userIcon}
                alt="Perfil"
                className="user-icon"
                onClick={() => navigate("/perfil")}
              />
              <div className="dropdown">
                <button onClick={() => navigate("/perfil")}>Meu Perfil</button>
                <button onClick={handleLogout}>Sair</button>
              </div>
            </div>
          )}
        </nav>

        {/* Menu hambúrguer */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
