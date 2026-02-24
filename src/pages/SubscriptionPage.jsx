import { C } from '../tokens.js'
import { PERSONAL_PLANS } from '../data.js'
import TopNav from '../components/TopNav.jsx'
import { CheckItem } from '../components/shared.jsx'

export default function SubscriptionPage({ onStartReg, onLogin }) {
  return (
    <div className="sub-page">
      <TopNav onLogin={onLogin} onSubscribe={() => {}} loggedIn={false} />

      <div style={{ background:C.navy, color:C.white, padding:"0.5rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-sans)", fontSize:"0.8125rem" }}>
        <span style={{ opacity:0.6 }}>POC Demo — Abonnementspagina</span>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"3rem 1.5rem 5rem" }}>

        {/* Page header */}
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <div style={{ display:"inline-block", background:C.gray100, borderRadius:99, padding:"0.3rem 1rem", fontFamily:"var(--font-sans)", fontSize:"0.8rem", fontWeight:600, color:C.gray500, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"1rem" }}>Abonneren</div>
          <h1 style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(1.75rem,4vw,2.5rem)", fontWeight:700, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", color:C.navy, marginBottom:"1rem" }}>
            Kies het persoonlijk abonnement dat<br/>bij jou past
          </h1>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.gray500, lineHeight:"var(--lh-body)" }}>
            Regel direct gratis toegang tot Investment Officer<br/>Voor zakelijke e-mail adressen op naam
          </p>
        </div>

        {/* Banner — direct naar business flow */}
        <div className="sub-banner">
          <div style={{ flex:1 }}>
            <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"1.0625rem", lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", color:C.navy, marginBottom:"0.5rem" }}>
              Regel nu GRATIS toegang voor je team of organisatie
            </h3>
            <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, lineHeight:"var(--lh-body)", marginBottom:"1rem" }}>
              Organisaties in het wealth segment bieden wij gratis bedrijfsregelingen aan. Andere organisaties krijgen 6 maanden gratis toegang. Daarna volgt een aanbieding op maat.
            </p>
            <button className="btn-primary" style={{ padding:"0.625rem 1.5rem" }} onClick={() => onStartReg("business")}>
              Zakelijke regeling
            </button>
          </div>
          <div style={{ width:160, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:140, height:90, background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:8, position:"relative", boxShadow:"0 8px 24px rgba(12,24,46,0.2)" }}>
              <div style={{ position:"absolute", inset:8, border:"1px solid rgba(255,255,255,0.15)", borderRadius:4 }}/>
              <div style={{ position:"absolute", bottom:12, left:12, right:12 }}>
                {[70,50,60].map((w,i) => <div key={i} style={{ height:3, width:`${w}%`, background:"rgba(255,255,255,0.3)", borderRadius:2, marginBottom:4 }}/>)}
              </div>
            </div>
          </div>
          <div className="sub-banner-badge">GRATIS<br/>toegang<br/>voor<br/>wealth managers</div>
        </div>

        <p style={{ textAlign:"center", fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500, marginBottom:"2rem", lineHeight:"var(--lh-body)" }}>
          Kies één van de volgende persoonlijke registraties.<br/>Alleen toegang met een zakelijk e-mail adres op naam.
        </p>

        {/* Personal plan cards */}
        <div className="sub-cards">
          {PERSONAL_PLANS.map(p => (
            <div key={p.id} className="sub-card">
              <div className="sub-card-name">{p.name}</div>
              <div className="sub-card-sub">{p.sub}</div>
              <div>
                <span className="sub-card-price">{p.priceLabel}</span>
                {p.priceSuffix && <span className="sub-card-price-suffix"> {p.priceSuffix}</span>}
              </div>
              <button className="btn-red" style={{ marginTop:"1rem" }} onClick={() => onStartReg("personal_" + p.id)}>
                {p.cta}
              </button>
              <p className="sub-card-note">{p.ctaNote}</p>
              <div className="sub-card-features">
                <div className="sub-card-features-title">Wat je krijgt</div>
                {p.features.map((f,i) => <CheckItem key={i}>{f}</CheckItem>)}
              </div>
              <button className="btn-outline" onClick={() => alert(`POC: volledige feature lijst voor ${p.name}`)}>
                Toon alle features
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
