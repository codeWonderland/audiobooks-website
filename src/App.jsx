import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import CloserLook from './components/Gallery.jsx'
import Download from './components/Download.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <CloserLook />
        <Download />
      </main>
      <Footer />
    </>
  )
}
