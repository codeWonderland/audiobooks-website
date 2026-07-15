import { GithubIcon } from './icons.jsx'
import iconUrl from '../assets/icon.svg'

const REPO_URL = 'https://github.com/codeWonderland/audiobooks'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Download', href: '#download' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Source on GitHub', href: REPO_URL },
      { label: 'Report an issue', href: `${REPO_URL}/issues` },
      { label: 'Contributing', href: '#contributing' },
      { label: 'License (MIT)', href: '#license' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Getting started', href: '#docs' },
      { label: 'Supported formats', href: '#formats' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <img className="brand-icon" src={iconUrl} alt="" width="32" height="32" aria-hidden />
              <span className="brand-name">Audiobooks</span>
            </div>
            <p>
              A quiet home for your audiobooks — download, collect, and listen,
              all on your own machine.
            </p>
            <a
              className="footer-gh"
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon width="18" height="18" />
              Star on GitHub
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} Audiobooks. Released under the MIT License.</span>
          <span className="footer-note">
            Not affiliated with Audible or Amazon. For use with content you own.
          </span>
        </div>
      </div>
    </footer>
  )
}
