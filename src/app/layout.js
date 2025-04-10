// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'База отдыха',
  description: 'Уютное место для отдыха на природе',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}