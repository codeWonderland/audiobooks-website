import Reveal from './Reveal.jsx'
import { SpeedIcon, TimerIcon, WaveIcon, LockIcon } from './icons.jsx'

const GRID = [
  { icon: SpeedIcon, title: 'Variable speed', body: 'From 0.5× to 3.5× in fine steps, pitch kept natural.' },
  { icon: TimerIcon, title: 'Sleep timer', body: 'Fade out after a set time or at the end of the chapter.' },
  { icon: WaveIcon, title: 'Chapter markers', body: 'Jump between chapters with a proper table of contents.' },
  { icon: LockIcon, title: 'Yours, privately', body: 'Files live on your machine. No tracking, no telemetry.' },
]

export default function CloserLook() {
  return (
    <section className="section closer" id="closer-look">
      <div className="wrap">
        <div className="section-head section-head--center">
          <Reveal>
            <span className="eyebrow">A closer look</span>
            <h2>The small things that make a long listen easy.</h2>
            <p>
              Deep midnight tones, warm amber light, and just the controls you
              reach for — nothing between you and the story.
            </p>
          </Reveal>
        </div>

        <div className="feat-grid">
          {GRID.map((g, i) => {
            const Icon = g.icon
            return (
              <Reveal key={g.title} className="feat-card" delay={i * 0.07} y={24}>
                <span className="feat-card-icon">
                  <Icon width="22" height="22" />
                </span>
                <h4>{g.title}</h4>
                <p>{g.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
