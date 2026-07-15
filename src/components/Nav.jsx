import { useEffect, useState } from 'react'
import { GithubIcon } from './icons.jsx'
import iconUrl from '../assets/icon.svg'

const REPO_URL = 'https://github.com/codeWonderland/audiobooks'

function Logo() {
  return (
    <a href="#top" className="brand" aria-label="Audiobooks home">
      <img className="brand-icon" src={iconUrl} alt="" width="32" height="32" aria-hidden />
      <span className="brand-name">Audiobooks</span>
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Logo />
        <div className="nav-actions">
          <a
            className="nav-icon-link"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
          >
            <GithubIcon width="20" height="20" />
          </a>
          <a href="#download" className="btn btn-primary nav-cta">
            Download
          </a>
        </div>
      </div>
    </header>
  )
}
