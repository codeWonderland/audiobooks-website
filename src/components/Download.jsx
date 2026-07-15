import { useMemo } from 'react'
import Reveal from './Reveal.jsx'
import { detectOS, PLATFORMS } from '../lib/platform.js'
import { AppleIcon, WindowsIcon, LinuxIcon, DownloadIcon } from './icons.jsx'

const ORDER = ['mac', 'windows', 'linux']
const ICON = { mac: AppleIcon, windows: WindowsIcon, linux: LinuxIcon }

export default function Download() {
  const os = useMemo(() => detectOS(), [])

  return (
    <section className="section download" id="download">
      <div className="download-halo" aria-hidden />
      <div className="wrap">
        <div className="section-head download-head">
          <Reveal>
            <span className="eyebrow">Get Audiobooks</span>
            <h2>Pick your platform and start listening.</h2>
            <p>
              Version 1.4.0 · free and open source. Every build is identical —
              your library comes with you across machines.
            </p>
          </Reveal>
        </div>

        <div className="dl-grid">
          {ORDER.map((key, i) => {
            const p = PLATFORMS[key]
            const Icon = ICON[key]
            const recommended = key === os
            return (
              <Reveal
                key={key}
                className={`dl-card ${recommended ? 'dl-card--rec' : ''}`}
                delay={i * 0.08}
                y={28}
              >
                {recommended && <span className="dl-badge">Detected on your device</span>}
                <span className="dl-icon">
                  <Icon width="30" height="30" />
                </span>
                <h3>{p.name}</h3>
                <p className="dl-detail">{p.detail}</p>
                <a
                  className={`btn ${recommended ? 'btn-primary' : 'btn-ghost'} dl-btn`}
                  href={`#download-${key}`}
                >
                  <DownloadIcon width="18" height="18" />
                  Download
                </a>
                <span className="dl-req">{p.requirement}</span>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
