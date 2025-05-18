import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/quranIcon.png";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import useFetch from "../hooks/useFetch";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const {
    data: response,
    error,
    loading,
  } = useFetch("https://api.alquran.cloud/v1/surah");

  const surahs = response?.data;

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...{error.message}</p>;

  return (
    <>
      {/* Основной хедер */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container py-2">
          <div className="d-flex justify-content-between align-items-center">
            {/* Кнопка для открытия бокового меню */}
            <button
              className="btn btn-outline-primary me-3"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FaBars size={20} />
            </button>

            {/* Логотип и название */}
            <div className="d-flex align-items-center flex-grow-1">
              <img
                src={logo}
                className="img-fluid rounded-2 me-2"
                height={40}
                width={50}
                alt="Quran-Nur"
              />
              <span
                className="fs-4 fw-bold text-primary"
                style={{ fontFamily: "'Scheherazade New', serif" }}
              >
                Quran-Nur
              </span>
            </div>

           
          </div>
        </div>
      </header>

      {/* Боковое меню */}
      <div
        className={`sidebar bg-white shadow-lg ${isSidebarOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "280px",
          zIndex: 1050,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          overflow: "auto"
        }}
      >
        {/* Заголовок бокового меню */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-primary text-white">
          <h5 className="mb-0 d-flex align-items-center">
            <FaBook className="me-2" />
            <span style={{ fontFamily: "'Scheherazade New', serif" }}>Surahs</span>
          </h5>
          <button 
            className="btn btn-link text-white p-0" 
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Навигация по сурам */}
        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          {surahs?.map((surah) => (
            <NavLink
              key={surah.number}
              to={`/surah/${surah.number}`}
              className="d-block px-3 py-2 text-decoration-none border-bottom hover-effect"
              style={{ 
                transition: 'all 0.2s ease',
                color: '#333'
              }}
              activeClassName="active-surah"
              onClick={toggleSidebar}
            >
              <div className="d-flex align-items-center">
                <span 
                  className="d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(78, 115, 223, 0.1)',
                    color: '#4e73df',
                    fontWeight: '600',
                    fontSize: '0.8rem'
                  }}
                >
                  {surah.number}
                </span>
                <div>
                  <div className="fw-medium">{surah.englishName}</div>
                  <div 
                    className="small text-muted"
                    style={{ fontFamily: "'Scheherazade New', serif" }}
                  >
                    {surah.name} • {surah.englishNameTranslation}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Подвал меню */}
        <div className="p-3 border-top bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <p className="small text-muted mb-0">Quran-Nur</p>
            <p className="small text-muted mb-0">v1.0.0</p>
          </div>
        </div>
        </div>

      {/* Затемнение фона */}
      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1040,
          }}
        />
      )}
    </>
  );
}

export default Header;
