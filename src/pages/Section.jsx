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
  console.log(surahs);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...{error.message}</p>;

  return (
    <div>
      <div className="row g-4">
        {surahs &&
          surahs.map((surah) => {
            return (
              <div className="col-lg-4 col-sm-6 mb-1">
                <NavLink
                  className="d-block text-decoration-none"
                  to={`surah/${surah.number}`}
                >
                  <div className="card surah-card h-100 shadow-xs hover-shadow">
                    <div className="card-body d-flex justify-content-between p-2 align-items-center">
                      <div className="p-2">
                        <span className="surah-badge">{surah.number}</span>
                      </div>
                      <div className="p-2">
                        <div className="fw-bold fs-6 ">{surah.englishName}</div>
                        <div className="fw-bolder text-body-tertiary fs-10">
                          {surah.englishNameTranslation}
                        </div>
                      </div>
                      <div className="ms-auto p-2">
                        <div className="fs-10 fw-bold">{surah.name}</div>
                        <div className="fw-bolder text-body-tertiary fs-10">{surah.numberOfAyahs} Ayahs</div>
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
