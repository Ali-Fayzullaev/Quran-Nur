import logo from "../assets/quranIcon.png"

function Header() {
  return (
    <div>
      <img src={logo} className="img-fluid rounded-2" height={40} width={50} alt="Qran-Nur" />
       Quran-Nur
      
    </div>
  )
}

export default Header