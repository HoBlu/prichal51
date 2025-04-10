// components/Layout.js
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar isScrolled={isScrolled} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}