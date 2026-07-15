import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { detectOS, PLATFORMS } from '../lib/platform.js'
import { DownloadIcon } from './icons.jsx'

const ease = [0.2, 0.75, 0.2, 1]

export default function Hero() {
  const os = useMemo(() => detectOS(), [])
  const plat = PLATFORMS[os]

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
          <motion.span className="eyebrow" variants={item}>
            Audiobook player &amp; Audible downloader
          </motion.span>

          <motion.h1 variants={item}>
            Your whole shelf,
            <br />
            <em>off the cloud</em> and
            <br />
            into your ears.
          </motion.h1>

          <motion.p className="hero-sub" variants={item}>
            Audiobooks pulls your Audible library down to your own machine, sits
            it beside the audiobooks you already own, and plays every one of them
            in a listening room built for long nights.
          </motion.p>

          <motion.div className="hero-cta" variants={item}>
            <a href="#download" className="btn btn-primary">
              <DownloadIcon width="18" height="18" />
              Download for {plat.name}
            </a>
            <a href="#features" className="btn btn-ghost">
              See how it works
            </a>
          </motion.div>

          <motion.div className="hero-meta" variants={item}>
            <span>Free &amp; open source</span>
            <span className="hero-meta-dot" />
            <span>No account required</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
