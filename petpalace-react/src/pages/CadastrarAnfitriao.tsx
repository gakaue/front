import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/CadastrarAnfitriao.css";

const CadastrarAnfitriao: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeHotel: "",
    endereco: "",
    cidade: "",
    estado: "",
    telefone: "",
    email: "",
    descricao: "",
    precoDiaria: "",
    imagem: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/anfitriao/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMensagem("✅ Hotel cadastrado com sucesso!");
        setFormData({
          nomeHotel: "",
          endereco: "",
          cidade: "",
          estado: "",
          telefone: "",
          email: "",
          descricao: "",
          precoDiaria: "",
          imagem: "",
        });
      } else {
        setMensagem("❌ Erro ao cadastrar o hotel. Tente novamente.");
      }
    } catch (error) {
      setMensagem("⚠️ Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="anfitriao-page">
      <Navbar activePage="cadastraranfitriao" />

      <div className="form-container">
        <h2>Cadastrar Hotel</h2>
        <p className="subtitle">
          Cadastre seu hotel e torne-se um anfitrião no{" "}
          <span className="brand">PetPalace!</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nomeHotel"
            placeholder="Nome do Hotel"
            value={formData.nomeHotel}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="descricao"
            placeholder="Descrição do hotel e serviços oferecidos..."
            value={formData.descricao}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="precoDiaria"
            placeholder="Preço da diária (R$)"
            value={formData.precoDiaria}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="imagem"
            placeholder="URL da imagem"
            value={formData.imagem}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Hotel"}
          </button>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>
      </div>
    </div>
  );
};

export default CadastrarAnfitriao;
