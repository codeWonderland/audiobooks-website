import Reveal from './Reveal.jsx'
import libraryImg from '../assets/library.png'
import detailsImg from '../assets/title-details.png'
import playerImg from '../assets/player.png'
import { CloudIcon, FolderIcon, PlayIcon } from './icons.jsx'

const BLOCKS = {
  audible: {
    icon: CloudIcon,
    kicker: 'Bring it home',
    title: 'Download your Audible library',
    body: 'Sign in once and every title you own appears — cover art, chapters, and all. Pull books down to your drive with a tap, and they become yours to keep: offline, DRM-free, in clean M4B files.',
    points: ['Whole-library sync', 'One-tap downloads', 'Automatic DRM stripping'],
  },
  local: {
    icon: FolderIcon,
    kicker: 'Everything in one place',
    title: 'Browse the audiobooks you already own',
    body: 'Point Audiobooks at a folder and it reads the tags, stitches chapters together, and lines your local files up right next to your cloud titles. One shelf for the books you bought, ripped, or made yourself.',
    points: ['Open any folder', 'Reads embedded metadata', 'Rich title details view'],
  },
  player: {
    icon: PlayIcon,
    kicker: 'A room for listening',
    title: 'Play them in a player built for the night',
    body: 'Cover art washes into the background while you listen. Scrub by chapter, skip in fifteens, nudge the speed, and set a sleep timer — everything a good listen needs and nothing it doesn’t.',
    points: ['Chapter navigation', 'Adjustable speed', 'Sleep timer & resume'],
  },
}

function Block({ data }) {
  const Icon = data.icon
  return (
    <Reveal className="feat-block" y={28}>
      <span className="feat-kicker">
        <Icon width="17" height="17" />
        {data.kicker}
      </span>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
      <ul className="feat-points">
        {data.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </Reveal>
  )
}

function Shot({ img, alt }) {
  return (
    <Reveal className="shot-full" delay={0.06} y={40}>
      <div className="shot-full-frame">
        <img src={img} alt={alt} width="1896" height="980" loading="lazy" />
      </div>
    </Reveal>
  )
}

export default function Features() {
  return (
    <section className="section features" id="features">
      <div className="wrap">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">What it does</span>
            <h2>Three steps between a library and a long listen.</h2>
            <p>
              Get your books down, keep them in one place, and play them the way
              they deserve to be played.
            </p>
          </Reveal>
        </div>

        <Block data={BLOCKS.audible} />
        <Shot img={libraryImg} alt="Library grid showing cloud and downloaded audiobook covers with a now-playing panel" />

        <Block data={BLOCKS.local} />
        <Shot img={detailsImg} alt="Title details panel showing synopsis, runtime, and chapter count" />

        <Block data={BLOCKS.player} />
        <Shot img={playerImg} alt="Full-screen player with cover art washed into the background and playback controls" />
      </div>
    </section>
  )
}
