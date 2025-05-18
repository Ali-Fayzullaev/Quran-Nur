import React from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import Section from '../pages/Section'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function RootLayout() {

  const location = useLocation();
  const isSurahPage = location.pathname.startsWith("/surah");

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white p-3">
        <Header />
      </header>

      <main className="flex-grow-1 container my-4">
        <Outlet />
      </main>

      <footer className="bg-dark text-white text-center p-3 mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default RootLayout
