import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import iconAyah from "../assets/icon-ayahs.png";
import { NavLink } from "react-router-dom";
function Surah() {
  const [selectedQari, setSelectedQari] = useState("ar.abdulbasitmurattal");
  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [translatedSurah, setTranslatedSurah] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const { numberSurah } = useParams();

  const {
    data: audioQaris,
    loading,
    error,
  } = useFetch(
    `https://api.alquran.cloud/v1/edition/format/audio` // ✅ HTTPS
  );

  const { data: surahDetail } = useFetch(
    `https://api.alquran.cloud/v1/surah/${numberSurah}/${selectedQari}` // ✅ HTTPS
  );

  // Handle translation fetch
  useEffect(() => {
    if (selectedTranslation) {
      fetch(
        `https://api.alquran.cloud/v1/surah/${numberSurah}/${selectedTranslation}` // ✅ HTTPS
      )
        .then((res) => res.json())
        .then((data) => setTranslatedSurah(data));
    } else {
      setTranslatedSurah(null);
    }
  }, [selectedTranslation, numberSurah]);

  const { data: surahTranslation } = useFetch(
    "https://api.alquran.cloud/v1/edition/format/text" // ✅ HTTPS
  );

  const surahAyahs = surahDetail?.data.ayahs;
  const surahName = surahDetail?.data.name;
  const surahNumber = surahDetail?.data.number;
  const englishName = surahDetail?.data.englishName;
  const revelationType = surahDetail?.data.revelationType;

  // Handle audio play/pause
  const toggleAudio = (ayahNumber) => {
    if (currentlyPlaying === ayahNumber) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(ayahNumber);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...{error.message}</p>;

  return (
    <div className="container py-3 px-0 min-vh-100 bg-light">
      {/* Surah Header */}
      <div className="text-center mb-4 p-3 bg-white shadow-sm rounded-lg">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-2">
          <span className="badge bg-primary me-md-2 mb-2 mb-md-0 fs-6">
            Surah {surahNumber}
          </span>
          <h1
            className="display-5 text-dark mb-0 text-center"
            style={{ fontFamily: "'Scheherazade New', serif" }}
          >
            {surahName}
          </h1>
        </div>
        <h3 className="text-muted fs-5">{englishName}</h3>
        <p className="text-uppercase text-info fw-bold small">
          {revelationType}
        </p>
      </div>

      {/* Selection Row */}
      <div className="row mb-3 g-2">
        <div className="col-md-6">
          <select
            className="form-select form-select-sm shadow-sm"
            aria-label="Select Qari"
            value={selectedQari}
            onChange={(e) => setSelectedQari(e.target.value)}
          >
            {audioQaris?.data.map((qari) => (
              <option key={qari.identifier} value={qari.identifier}>
                {qari.englishName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            className="form-select form-select-sm shadow-sm"
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
          >
            <option value="">No Translation</option>
            {surahTranslation?.data.map((translation) => (
              <option
                value={translation.identifier}
                key={translation.identifier}
              >
                {translation.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ayahs List */}
      <div className="row g-2">
        {surahAyahs &&
          surahAyahs.map((ayah) => {
            const edition =
              translatedSurah?.data?.ayahs?.[ayah?.number - 1]?.text;
            return (
              <div className="col-12 mb-2" key={ayah.number}>
                <div className="card shadow-sm border-0 overflow-hidden">
                  {/* Main Ayah Row */}
                  <div className="row g-0 align-items-center">
                    {/* Compact Audio Player */}
                    <div className="col-2 col-md-1 p-1 bg-light d-flex justify-content-center">
                      <button
                        className="btn btn-sm btn-outline-primary rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                        onClick={() => toggleAudio(ayah.numberInSurah)}
                      >
                        {currentlyPlaying === ayah.numberInSurah ? (
                          <FaPause size={10} />
                        ) : (
                          <FaPlay size={10} />
                        )}
                      </button>
                      <audio
                        src={ayah.audio}
                        className="d-none"
                        onEnded={() => setCurrentlyPlaying(null)}
                        ref={(audio) => {
                          if (audio) {
                            currentlyPlaying === ayah.numberInSurah
                              ? audio.play()
                              : audio.pause();
                          }
                        }}
                      />
                    </div>

                    {/* Arabic Text */}
                    <div className="col-10 col-md-11 p-2 bg-white text-start d-flex justify-content-end align-items-end">
                      <span className="position-relative d-inline-flex align-items-center justify-content-center">
                        {/* Иконка аята */}
                        <img
                          src={iconAyah}
                          alt="Ayah icon"
                          style={{
                            width: "36px",
                            height: "36px",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            opacity: "0.9",
                          }}
                        />

                        {/* Номер аята */}
                        <span
                          className="position-absolute top-50 start-50 translate-middle"
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "700",
                            color: "#2a4db5",
                            textShadow: "0 1px 1px rgba(255,255,255,0.5)",
                            marginTop: "-1px",
                          }}
                        >
                          {ayah.numberInSurah}
                        </span>
                      </span>

                      <span
                        className="text-start mb-0 arabic-text"
                        style={{
                          fontFamily: "'Lateef', serif",
                          fontSize: "1.8rem",
                          lineHeight: "2.5rem",
                        }}
                      >
                        {ayah.text}
                      </span>
                    </div>
                  </div>

                  {/* Translation */}
                  {edition && (
                    <div className="row g-0">
                      <div className="col-12 p-2 bg-white border-top">
                        <p
                          className="text-start mb-0 small text-muted translation-text"
                          style={{ lineHeight: "1.6rem" }}
                        >
                          {edition}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Surah;
