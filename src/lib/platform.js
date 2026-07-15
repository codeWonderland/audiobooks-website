// Detect the visitor's OS so we can surface the most relevant download.
export function detectOS() {
  if (typeof navigator === 'undefined') return 'mac'
  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows'
  if (/Linux/i.test(platform) || /Linux|X11/i.test(ua)) return 'linux'
  return 'mac'
}

export const PLATFORMS = {
  mac: {
    id: 'mac',
    name: 'macOS',
    file: 'Audiobooks-1.4.0-universal.dmg',
    detail: 'Universal · Apple silicon & Intel',
    requirement: 'macOS 12 Monterey or later',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    file: 'Audiobooks-Setup-1.4.0.exe',
    detail: '64-bit installer (.exe)',
    requirement: 'Windows 10 or later',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    file: 'Audiobooks-1.4.0.AppImage',
    detail: 'AppImage (.AppImage)',
    requirement: 'Most modern distributions',
  },
}
