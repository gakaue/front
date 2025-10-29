import React, { useEffect, useRef, useState, FormEvent } from "react";
import "../styles/Reservar.css";
import Navbar from "../components/Navbar";

interface Hotel {
  nome: string;
  coords: [number, number];
  cidade: string;
  img: string;
}

const Reservar: React.FC = () => {
  const [showOtherPetType, setShowOtherPetType] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [hoteis, setHoteis] = useState<Hotel[]>([]);
  const [hotelSelecionado, setHotelSelecionado] = useState<Hotel | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const otherPetTypeInputRef = useRef<HTMLInputElement>(null);
  const mapaRef = useRef<HTMLDivElement>(null);
  const mapaInstancia = useRef<any>(null);

  useEffect(() => {
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    const leafletScript = document.createElement("script");
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.async = true;
    leafletScript.onload = () => {
      const cidades = [
        { nome: "São Paulo", lat: -23.55, lon: -46.63 },
        { nome: "Rio de Janeiro", lat: -22.91, lon: -43.17 },
        { nome: "Brasília", lat: -15.79, lon: -47.88 },
        { nome: "Belo Horizonte", lat: -19.92, lon: -43.94 },
        { nome: "Curitiba", lat: -25.42, lon: -49.27 },
      ];

      const locais = cidades.map((c, i) => ({
        nome: `Hotel ${c.nome}`,
        coords: [c.lat, c.lon] as [number, number],
        cidade: c.nome,
        img: `https://placedog.net/600/400?id=${i}`,
      }));

      setHoteis(locais);

      if (mapaRef.current && (window as any).L) {
        const L = (window as any).L;
        const mapa = L.map(mapaRef.current).setView([-14.235, -51.9253], 4.2);
        mapaInstancia.current = mapa;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapa);

        locais.forEach((local) => {
          const marker = L.marker(local.coords).addTo(mapa);
          marker.bindPopup(`<b>${local.nome}</b><br>${local.cidade}`);
        });

        setTimeout(() => mapa.invalidateSize(), 300);
      }
    };

    document.body.appendChild(leafletScript);

    return () => {
      leafletCSS.remove();
      leafletScript.remove();
      if (mapaInstancia.current) mapaInstancia.current.remove();
    };
  }, []);

  const handlePetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowOtherPetType(e.target.value === "other");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Reserva enviada com sucesso para ${hotelSelecionado?.nome || "o hotel selecionado"}!`);
    if (formRef.current) formRef.current.reset();
    setShowOtherPetType(false);
    setHotelSelecionado(null);
  };

  const selecionarHotel = (hotel: Hotel) => {
    setHotelSelecionado(hotel);
    if (mapaInstancia.current) {
      mapaInstancia.current.setView(hotel.coords, 11, { animate: true });
    }
  };

  return (
    <div className="reservar-page">
      <Navbar activePage="reservar" />

      <section className="reserva-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por cidade, hotel ou região..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="reserva-flex-airbnb">
          <div className="hotel-list-airbnb">
            {hoteis
              .filter((h) => h.nome.toLowerCase().includes(search.toLowerCase()) || h.cidade.toLowerCase().includes(search.toLowerCase()))
              .map((hotel, i) => (
                <div
                  key={i}
                  className={`hotel-card-airbnb ${hotelSelecionado?.nome === hotel.nome ? "selecionado" : ""}`}
                  onClick={() => selecionarHotel(hotel)}
                >
                  <img src={hotel.img} alt={hotel.nome} />
                  <div className="hotel-info-airbnb">
                    <h4>{hotel.nome}</h4>
                    <p><i className="fas fa-map-marker-alt"></i> {hotel.cidade}</p>
                    <p>A partir de R$ 79/noite • Aceita cães e gatos</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="map-form-container">
            <div className="map-wrapper-airbnb">
              <div id="mapa" ref={mapaRef}></div>
            </div>

            <div className="form-container-airbnb">
              {hotelSelecionado ? (
                <>
                  <h3>Reservar no {hotelSelecionado.nome}</h3>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome do Tutor</label>
                    <input type="text" id="nome" required />

                    <label htmlFor="pet">Nome do Pet</label>
                    <input type="text" id="pet" required />

                    <label htmlFor="petType">Tipo de Pet</label>
                    <select id="petType" onChange={handlePetTypeChange}>
                      <option value="">Selecione</option>
                      <option value="dog">Cachorro</option>
                      <option value="cat">Gato</option>
                      <option value="other">Outro</option>
                    </select>

                    {showOtherPetType && (
                      <input
                        type="text"
                        placeholder="Qual outro animal?"
                        ref={otherPetTypeInputRef}
                      />
                    )}

                    <label htmlFor="checkin">Check-in</label>
                    <input type="date" id="checkin" required />

                    <label htmlFor="checkout">Check-out</label>
                    <input type="date" id="checkout" required />

                    <button type="submit" className="submit-btn">Confirmar Reserva</button>
                  </form>
                </>
              ) : (
                <p>Selecione um hotel para continuar</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservar;
