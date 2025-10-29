import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-page">
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/" className="logo-text">
              <span className="highlight">Pet</span>Palace
            </Link>
          </div>

          {/* Menu hambúrguer (para mobile) */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Links da Navbar */}
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/reservar">Reservar</Link>

            {/* 🔹 Novo botão Torne-se um Anfitrião */}
            <Link to="/cadastraranfitriao" className="btn">
              Torne-se um Anfitrião
            </Link>

            {/* Botão Entrar */}
            <Link to="/login" className="btn">
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      {/* 🔹 Seção principal */}
      <section className="hero" style={{ marginTop: "80px" }}>
        <h1>Bem-vindo ao PetPalace</h1>
        <p>O melhor hotel de luxo para o seu pet</p>
        <Link to="/reservar" className="btn">
          Fazer Reserva
        </Link>
      </section>
    </div>
  );
};

export default Home;
