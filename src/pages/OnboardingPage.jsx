import { useState } from 'react'
import { C } from '../tokens.js'
import IOLogo from '../components/IOLogo.jsx'

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots({ total, current }) {
  return (
    <div style={{ display:"flex", gap:"6px", justifyContent:"center", marginBottom:"2rem" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: i === current ? 20 : 8, height:8, borderRadius:4, background: i === current ? C.navy : C.gray200, transition:"all 0.3s" }} />
      ))}
    </div>
  )
}

// ─── Skip button ──────────────────────────────────────────────────────────────
function SkipBtn({ onSkip }) {
  return (
    <button onClick={onSkip} style={{ background:"none", border:"none", fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray500, cursor:"pointer", textDecoration:"underline", textUnderlineOffset:2 }}>
      Overslaan
    </button>
  )
}

// ─── Stap 1: Bevestiging ─────────────────────────────────────────────────────
function StepBevestiging({ onNext, onDashboard }) {
  const ITEMS = [
    "Papers van marktpartijen",
    "Research database Morningstar",
    "Publicaties van partners",
    "1 redactioneel artikel per maand",
    "E-mail nieuwsbrieven",
  ]
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"100vh" }}>
      {/* Left */}
      <div style={{ padding:"3rem 4rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <IOLogo />
        <div style={{ marginTop:"3rem" }}>
          <h1 style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.75rem" }}>
            Bedankt!<br/>Je toegang is geactiveerd
          </h1>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.gray500, marginBottom:"2rem", lineHeight:"var(--lh-body)" }}>
            Je abonnement op Investment Officer is succesvol afgerond.<br/>
            Je hebt nu direct toegang tot onze content en tools.
          </p>

          <div style={{ marginBottom:"2rem" }}>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.gray500, marginBottom:"0.875rem" }}>WAT JE NU KUNT</div>
            {ITEMS.map(item => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:"0.625rem", marginBottom:"0.625rem" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.navy }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.8125rem", color:C.gray500, marginBottom:"2rem", fontStyle:"italic" }}>
            Je ontvangt een bevestiging en factuur per e-mail.
          </p>

          <div style={{ display:"flex", gap:"1rem" }}>
            <button className="btn-navy" style={{ padding:"0.875rem 2rem", fontSize:"1rem" }} onClick={onNext}>
              Naar de website
            </button>
            <button className="btn-secondary" style={{ padding:"0.875rem 2rem", fontSize:"1rem" }} onClick={onDashboard}>
              Ga naar je dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Right — visual */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #1B3A5C 100%)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        {/* Decorative background circles */}
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.03)", top:-100, right:-100 }}/>
        <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.03)", bottom:-50, left:-50 }}/>

        {/* Mock device illustration */}
        <div style={{ position:"relative", zIndex:1 }}>
          {/* Laptop */}
          <div style={{ width:320, height:200, background:C.gray700, borderRadius:"8px 8px 0 0", padding:12, boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ background:C.white, height:"100%", borderRadius:4, overflow:"hidden", position:"relative" }}>
              <div style={{ background:C.navy, height:28, display:"flex", alignItems:"center", padding:"0 0.75rem", gap:"0.5rem" }}>
                <IOLogo size={14} />
              </div>
              <div style={{ padding:"0.5rem 0.75rem" }}>
                <div style={{ background:C.red, height:4, width:"60%", borderRadius:2, marginBottom:6 }}/>
                <div style={{ background:C.gray100, height:3, width:"90%", borderRadius:2, marginBottom:4 }}/>
                <div style={{ background:C.gray100, height:3, width:"75%", borderRadius:2, marginBottom:4 }}/>
                <div style={{ background:C.gray100, height:3, width:"85%", borderRadius:2, marginBottom:8 }}/>
                <div style={{ background:C.gray200, height:60, borderRadius:4 }}/>
              </div>
            </div>
          </div>
          <div style={{ width:360, height:12, background:C.gray700, borderRadius:"0 0 4px 4px", margin:"0 auto" }}/>
          <div style={{ width:120, height:6, background:C.gray500, borderRadius:3, margin:"0 auto" }}/>

          {/* Phone */}
          <div style={{ position:"absolute", bottom:-20, right:-40, width:90, height:160, background:C.gray700, borderRadius:14, padding:6, boxShadow:"0 12px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ background:C.white, height:"100%", borderRadius:10, overflow:"hidden" }}>
              <div style={{ background:C.navy, height:20, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:20, height:3, background:"rgba(255,255,255,0.3)", borderRadius:2 }}/>
              </div>
              <div style={{ padding:"0.25rem" }}>
                <div style={{ background:C.red, height:3, width:"70%", borderRadius:2, marginBottom:4 }}/>
                <div style={{ background:C.gray100, height:2, width:"100%", borderRadius:2, marginBottom:3 }}/>
                <div style={{ background:C.gray100, height:2, width:"80%", borderRadius:2, marginBottom:3 }}/>
                <div style={{ background:C.gray200, height:50, borderRadius:3 }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Stap 2: App download ─────────────────────────────────────────────────────
function StepApp({ onNext, onSkip }) {
  return (
    <div style={{ minHeight:"100vh", background:C.white, display:"flex", flexDirection:"column" }}>
      {/* Top nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 2rem", borderBottom:`1px solid ${C.gray100}` }}>
        <IOLogo />
        <SkipBtn onSkip={onSkip} />
      </div>

      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"3rem 2rem" }}>
        <div style={{ maxWidth:560, width:"100%", textAlign:"center" }}>
          <ProgressDots total={4} current={0} />

          {/* App icon */}
          <div style={{ width:80, height:80, background:C.navy, borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", boxShadow:"0 8px 24px rgba(12,24,46,0.2)" }}>
            <span style={{ fontFamily:"var(--font-serif)", fontSize:"2rem", fontWeight:700, color:C.white }}>io</span>
          </div>

          <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.875rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.75rem" }}>
            Download de app en blijf altijd op de hoogte
          </h2>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"2.5rem" }}>
            Met de Investment Officer app leest u nieuws en analyses snel en overzichtelijk, ook onderweg.
          </p>

          {/* QR code placeholder */}
          <div style={{ display:"inline-block", background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12, padding:"1.25rem", marginBottom:"1.5rem", boxShadow:"0 4px 16px rgba(12,24,46,0.08)" }}>
            <div style={{ width:140, height:140, background:C.gray50, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              {/* Simulated QR pattern */}
              {[...Array(7)].map((_, row) =>
                [...Array(7)].map((_, col) => {
                  const isCorner = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
                  const isDark = isCorner || (row === 3 && col % 2 === 0) || (row % 2 === 0 && col === 3) || Math.random() > 0.5
                  return <div key={`${row}-${col}`} style={{ position:"absolute", left: col * 18 + 8, top: row * 18 + 8, width:14, height:14, background: isDark ? C.navy : "transparent", borderRadius:2 }}/>
                })
              )}
            </div>
            <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:C.gray500, marginTop:"0.75rem", textAlign:"center" }}>Scan met je telefoon</p>
          </div>

          {/* Store badges */}
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", marginBottom:"2.5rem" }}>
            {[["App Store","iOS"],["Google Play","Android"]].map(([store, platform]) => (
              <div key={store} style={{ border:`1px solid ${C.gray200}`, borderRadius:8, padding:"0.625rem 1.25rem", display:"flex", alignItems:"center", gap:"0.625rem", cursor:"pointer" }}>
                <div style={{ width:24, height:24, background:C.navy, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:C.white, fontSize:"0.6rem", fontWeight:700 }}>{platform[0]}</span>
                </div>
                <div>
                  <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", color:C.gray500, lineHeight:1 }}>Beschikbaar in de</div>
                  <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", fontWeight:700, color:C.navy, lineHeight:1.2 }}>{store}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary btn-full" onClick={onNext}>Volgende</button>
        </div>
      </div>
    </div>
  )
}

// ─── Stap 3: Nieuwsbrieven ────────────────────────────────────────────────────
const NEWSLETTERS = [
  { name:"Daily", desc:"Dagelijkse update van de redactie", freq:"Dagelijks" },
  { name:"Editor's Choice", desc:"Wekelijkse selectie van de redactie", freq:"Wekelijks" },
  { name:"Research Bulletin", desc:"Dagelijkse update met de meest recente analyse rapporten", freq:"Dagelijks" },
  { name:"Partner Mailings", desc:"Incidentele mailings van partners", freq:"Incidenteel" },
]

function StepNieuwsbrieven({ onNext, onSkip }) {
  const [active, setActive] = useState(NEWSLETTERS.map(() => true))

  return (
    <div style={{ minHeight:"100vh", background:C.white, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 2rem", borderBottom:`1px solid ${C.gray100}` }}>
        <IOLogo />
        <SkipBtn onSkip={onSkip} />
      </div>

      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"3rem 2rem" }}>
        <div style={{ maxWidth:560, width:"100%" }}>
          <ProgressDots total={4} current={1} />

          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ width:56, height:56, background:C.gray50, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.1-1.6-5.6-4.5-6.3V4c0-.8-.7-1.5-1.5-1.5S10.5 3.2 10.5 4v.7C7.6 5.4 6 7.9 6 11v5l-2 2v1h16v-1l-2-2z" fill={C.navy}/></svg>
            </div>
            <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.875rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.75rem" }}>
              Jouw nieuwsbrieven zijn ingesteld
            </h2>
            <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.gray500, lineHeight:"var(--lh-body)" }}>
              We hebben de volgende nieuwsbrieven voor je geactiveerd. Je kunt deze altijd aanpassen in je accountinstellingen.
            </p>
          </div>

          {NEWSLETTERS.map((nl, i) => (
            <div key={nl.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", border:`1px solid ${C.gray200}`, borderRadius:8, padding:"1rem 1.25rem", marginBottom:"0.625rem", background: active[i] ? "#FAFFFE" : C.white, transition:"background 0.2s" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", color:C.navy }}>{nl.name}</div>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8125rem", color:C.gray500, marginTop:"0.2rem" }}>{nl.desc}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.875rem", flexShrink:0 }}>
                <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:C.gray500 }}>{nl.freq}</span>
                <div onClick={() => setActive(prev => prev.map((v, j) => j === i ? !v : v))}
                  style={{ width:44, height:24, borderRadius:12, background: active[i] ? C.green : C.gray300, cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                  <div style={{ position:"absolute", top:3, left: active[i] ? 22 : 3, width:18, height:18, borderRadius:"50%", background:C.white, boxShadow:"0 1px 4px rgba(0,0,0,0.2)", transition:"left 0.2s" }}/>
                </div>
              </div>
            </div>
          ))}

          <button className="btn-primary btn-full" style={{ marginTop:"1.5rem" }} onClick={onNext}>Volgende</button>
        </div>
      </div>
    </div>
  )
}

// ─── Stap 4: LinkedIn ─────────────────────────────────────────────────────────
function StepLinkedIn({ onNext, onSkip }) {
  const [followed, setFollowed] = useState(false)

  return (
    <div style={{ minHeight:"100vh", background:C.white, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 2rem", borderBottom:`1px solid ${C.gray100}` }}>
        <IOLogo />
        <SkipBtn onSkip={onSkip} />
      </div>

      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"3rem 2rem" }}>
        <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>
          <ProgressDots total={4} current={2} />

          {/* LinkedIn icon */}
          <div style={{ width:72, height:72, background:"#0A66C2", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", boxShadow:"0 8px 24px rgba(10,102,194,0.25)" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>

          <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.875rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.75rem" }}>
            Volg ons op LinkedIn
          </h2>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"2rem" }}>
            Blijf op de hoogte van het laatste nieuws, analyses en evenementen van Investment Officer via LinkedIn.
          </p>

          {/* LinkedIn preview card */}
          <div style={{ border:`1px solid ${C.gray200}`, borderRadius:12, padding:"1.25rem", marginBottom:"2rem", textAlign:"left", background:C.gray50 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.875rem", marginBottom:"0.875rem" }}>
              <div style={{ width:48, height:48, background:C.navy, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:"var(--font-serif)", fontSize:"1.1rem", fontWeight:700, color:C.white }}>io</span>
              </div>
              <div>
                <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", color:C.navy }}>Investment Officer</div>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8rem", color:C.gray500 }}>Financial Services · 12.400 volgers</div>
              </div>
            </div>
            <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.8125rem", color:C.gray700, lineHeight:"var(--lh-body)", margin:0 }}>
              Het toonaangevende platform voor beleggingsprofessionals in Europa. Analyses, interviews en nieuws over de beleggingsindustrie.
            </p>
          </div>

          {followed ? (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", marginBottom:"1.5rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily:"var(--font-sans)", fontWeight:700, color:C.green }}>Je volgt Investment Officer!</span>
            </div>
          ) : (
            <button onClick={() => setFollowed(true)}
              style={{ display:"flex", alignItems:"center", gap:"0.625rem", background:"#0A66C2", color:C.white, border:"none", borderRadius:6, padding:"0.75rem 2rem", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", cursor:"pointer", margin:"0 auto 1.5rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Volgen op LinkedIn
            </button>
          )}

          <button className="btn-primary btn-full" onClick={onNext}>Volgende</button>
        </div>
      </div>
    </div>
  )
}

// ─── Stap 5: Afronden ─────────────────────────────────────────────────────────
function StepAfronden({ onFinish }) {
  return (
    <div style={{ minHeight:"100vh", background:C.white, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 2rem", borderBottom:`1px solid ${C.gray100}` }}>
        <IOLogo />
      </div>

      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"3rem 2rem" }}>
        <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>
          <ProgressDots total={4} current={3} />

          {/* Success animation */}
          <div style={{ width:80, height:80, borderRadius:"50%", background:"#EDFBF4", border:`2px solid ${C.green}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.875rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.75rem" }}>
            Je bent helemaal klaar!
          </h2>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"2.5rem" }}>
            Je account is volledig ingesteld. Ontdek nu alles wat Investment Officer te bieden heeft — van exclusieve analyses tot de laatste marktontwikkelingen.
          </p>

          {/* Feature highlights */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.875rem", marginBottom:"2.5rem", textAlign:"left" }}>
            {[
              { icon:"📰", title:"Premium artikelen", desc:"Exclusieve analyses en interviews" },
              { icon:"📊", title:"Morningstar data", desc:"Fondsenanalyse en marktdata" },
              { icon:"📬", title:"Nieuwsbrieven", desc:"Dagelijkse updates in uw inbox" },
              { icon:"📱", title:"Mobiele app", desc:"Altijd en overal toegang" },
            ].map(f => (
              <div key={f.title} style={{ border:`1px solid ${C.gray100}`, borderRadius:8, padding:"1rem", background:C.gray50 }}>
                <div style={{ fontSize:"1.5rem", marginBottom:"0.375rem" }}>{f.icon}</div>
                <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.875rem", color:C.navy, marginBottom:"0.2rem" }}>{f.title}</div>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8rem", color:C.gray500 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          <button className="btn-primary btn-full" style={{ fontSize:"1rem", padding:"1rem" }} onClick={onFinish}>
            Ga naar Investment Officer →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main OnboardingPage ──────────────────────────────────────────────────────
export default function OnboardingPage({ onFinish, onDashboard }) {
  const [step, setStep] = useState(0)

  const next = () => setStep(s => s + 1)
  const skip = () => setStep(s => s + 1)

  return (
    <div style={{ fontFamily:"var(--font-sans)" }}>
      {step === 0 && <StepBevestiging onNext={next} onDashboard={onDashboard} />}
      {step === 1 && <StepApp         onNext={next} onSkip={skip} />}
      {step === 2 && <StepNieuwsbrieven onNext={next} onSkip={skip} />}
      {step === 3 && <StepLinkedIn    onNext={next} onSkip={skip} />}
      {step === 4 && <StepAfronden    onFinish={onFinish} />}
    </div>
  )
}
