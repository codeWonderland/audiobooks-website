import { useEffect, useState } from 'react'

export const REPO = 'codeWonderland/audiobooks'
export const RELEASES_URL = `https://github.com/${REPO}/releases`
export const LATEST_RELEASE_URL = `${RELEASES_URL}/latest`

// Detect the visitor's OS so we can surface the most relevant download.
export function detectOS() {
  if (typeof navigator === 'undefined') return 'mac'
  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows'
  if (/Linux/i.test(platform) || /Linux|X11/i.test(ua)) return 'linux'
  return 'mac'
}

// Per-platform metadata. `match` finds the right asset in a release; `fallback`
// is a permanent "latest release" URL used if the GitHub API can't be reached.
export const PLATFORMS = {
  mac: {
    id: 'mac',
    name: 'macOS',
    detail: 'Apple silicon & Intel (.dmg)',
    requirement: 'macOS 12 Monterey or later',
    match: /\.dmg$/i,
    fallback: `${RELEASES_URL}/latest/download/Audiobooks-1.0.0.dmg`,
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    detail: '64-bit installer (.exe)',
    requirement: 'Windows 10 or later',
    match: /\.exe$/i,
    fallback: `${RELEASES_URL}/latest/download/audiobooks.exe`,
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    detail: 'Portable binary (.x86_64)',
    requirement: 'Most modern distributions',
    match: /\.(x86_64|AppImage)$/i,
    fallback: `${RELEASES_URL}/latest/download/audiobooks.x86_64`,
  },
}

// Resolve the best download URL for a platform, preferring the live release.
export function downloadUrl(key, release) {
  return (release && release.urls && release.urls[key]) || PLATFORMS[key].fallback
}

// Shared, module-level cache so every consumer triggers at most one API call.
let cached = null
let inflight = null

function fetchLatestRelease() {
  if (inflight) return inflight
  inflight = fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data) => {
      const urls = {}
      for (const key of Object.keys(PLATFORMS)) {
        const asset = (data.assets || []).find((a) => PLATFORMS[key].match.test(a.name))
        if (asset) urls[key] = asset.browser_download_url
      }
      cached = { version: data.tag_name || null, urls }
      return cached
    })
    .catch(() => null)
  return inflight
}

// Returns the latest release ({ version, urls }) once loaded, or null until then
// (and null if the API is unavailable — callers fall back to permanent URLs).
export function useLatestRelease() {
  const [release, setRelease] = useState(cached)
  useEffect(() => {
    if (cached) {
      setRelease(cached)
      return
    }
    let cancelled = false
    fetchLatestRelease().then((r) => {
      if (!cancelled) setRelease(r)
    })
    return () => {
      cancelled = true
    }
  }, [])
  return release
}
