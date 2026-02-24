import { C } from '../tokens.js'
import { img } from '../images.js'

export default function IOLogo({ size = 32 }) {
  const logoSrc = img("logo")
  if (logoSrc) {
    return <img src={logoSrc} alt="Investment Officer" style={{ height: size * 0.75, width:"auto", display:"block" }} />
  }
  return (
    <svg width={size * 2.8} height={size * 0.75} viewBox="0 0 112 30" fill="none">
      <text x="0" y="22" fontFamily="'Merriweather', serif" fontSize="26" fontWeight="700" fill={C.navy}>io</text>
      <line x1="38" y1="4" x2="38" y2="26" stroke={C.navy} strokeWidth="1.5"/>
      <text x="44" y="15" fontFamily="'Merriweather Sans', sans-serif" fontSize="9.5" fontWeight="700" fill={C.navy}>investment</text>
      <text x="44" y="26" fontFamily="'Merriweather Sans', sans-serif" fontSize="9.5" fontWeight="400" fill={C.navy}>officer</text>
    </svg>
  )
}
