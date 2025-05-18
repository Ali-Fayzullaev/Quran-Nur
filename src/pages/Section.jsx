import useFetch from "../hooks/useFetch";
import "../styles/Section.css";
import { NavLink } from "react-router-dom";
function Section() {
  const {
    data: response,
    error,
    loading,
  } = useFetch("https://api.alquran.cloud/v1/surah");

  const surahs = response?.data;

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...{error.message}</p>;

  return (
    <div>
      <div className="row g-4">
        {surahs &&
          surahs.map((surah) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-1">
              <NavLink className="d-block text-decoration-none" to={`surah/${surah.number}`}>
                <div className="card surah-card h-100 shadow-xs hover-shadow">
                  <div className="card-body p-2 text-center">
                    <div className="surah-badge">{surah.number}</div>
                    <div className="surah-arabic my-1">{surah.name}</div>
                    <div className="surah-english text-muted small">
                      {surah.englishName}
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
            
            );
          })}
      </div>
    </div>
  );
}

export default Section;
