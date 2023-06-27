import '@/styles/reset.css'
import { Nunito } from 'next/font/google'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

const nunito = Nunito({ 
  subsets: ['latin'],
  weights: [400, 700],
 })

export const metadata = {
  title: 'Smart',
  description: 'Smart est un système de réservation de salles de réunion.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={nunito.className}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
