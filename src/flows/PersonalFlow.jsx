import { useState } from 'react'
import { C } from '../tokens.js'
import { JOB_ROLES } from '../data.js'
import { classifyEmailForReg } from '../utils.js'
import TopNav from '../components/TopNav.jsx'
import { ProgressBar, RegSidebar, EmailChip } from '../components/shared.jsx'

export default function PersonalFlow({ selectedPlan, onComplete, onBack, onGoLogin }) {
  const [step, setStep]             = useState("email")
  const [email, setEmail]           = useState("")
  const [firstName, setFirstName]   = useState("")
  const [lastName, setLastName]     = useState("")
  const [jobRole, setJobRole]       = useState("")
  const [password, setPassword]     = useState("")
  const [chosenPlan, setChosenPlan] = useState(selectedPlan || null)
  const [privateOverride, setPrivateOverride] = useState(false)

  const totalSteps   = chosenPlan === "pro" ? 4 : 3
  const STEP_NUM     = { email:1, private_warning:1, generic_block:1, existing:1, enterprise:1, whitelist:1, profile:2, plan:3, payment:3, confirm:4, done:4 }
  const currentStep  = STEP_NUM[step] || 1

  function handleEmailSubmit(e) {
    e.preventDefault()
    const type = classifyEmailForReg(email)
    if (type === "generic")                  { setStep("generic_block"); return }
    if (type === "private" && !privateOverride) { setStep("private_warning"); return }
    if (type === "existing")                 { setStep("existing"); return }
    if (type === "enterprise")               { setStep("enterprise"); return }
    if (type === "whitelist")                { setStep("whitelist"); return }
    setStep("profile")
  }

  function handleProfileSubmit(e) {
    e.preventDefault()
    if (chosenPlan) setStep(chosenPlan === "pro" ? "payment" : "confirm")
    else setStep("plan")
  }

  function handlePlanSelect(planId) {
    setChosenPlan(planId)
    setStep(planId === "pro" ? "payment" : "confirm")
  }

  return (
    <div className="reg-layout">
      <TopNav onLogin={onGoLogin} onSubscribe={onBack} loggedIn={false} />
      <div className="reg-container">
        <div className="reg-main">
          <ProgressBar total={totalSteps} current={currentStep} />

          {/* ── E-mail ── */}
          {step === "email" && (
            <>
              <h2 className="reg-step-title">Maak een gratis account<br/>en kies daarna jouw abonnement</h2>
              <p className="reg-step-sub">Vul uw persoonlijke gegevens in zodat we uw account kunnen aanmaken.</p>
              <div className="demo-hint">
                <strong>Demo scenario's:</strong><br/>
                <strong>info@aegon.com</strong> → generiek adres geblokkeerd<br/>
                <strong>nieuw@gmail.com</strong> → privé e-mail waarschuwing<br/>
                <strong>demo@abnamro.com</strong> → bestaand account<br/>
                <strong>nieuw@abnamro.com</strong> → enterprise-regeling gevonden<br/>
                <strong>nieuw@wealthpro.com</strong> → whitelist organisatie<br/>
                <strong>nieuw@aegon.com</strong> → normale registratie
              </div>
              <form onSubmit={handleEmailSubmit}>
                <div className="input-group">
                  <label className="input-label">Jouw zakelijk e-mailadres</label>
                  <input className="input-field" type="email" placeholder="Gebruik uw zakelijke email" value={email} onChange={e => setEmail(e.target.value)} autoFocus required />
                </div>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"1.25rem" }}>
                  Door verder te gaan, maken we een account voor je aan als je er nog geen hebt. Hiermee ga je akkoord met onze{" "}
                  <button className="link-btn" style={{ fontSize:"0.85rem" }} type="button">Algemene Voorwaarden</button>{" "}
                  en erken je dat je kennis hebt genomen van het{" "}
                  <button className="link-btn" style={{ fontSize:"0.85rem" }} type="button">Privacybeleid.</button>
                </p>
                <button className="btn-primary btn-full" type="submit">Controleer e-mail</button>
              </form>
            </>
          )}

          {/* ── Generiek geblokkeerd ── */}
          {step === "generic_block" && (
            <>
              <h2 className="reg-step-title">Persoonlijk e-mailadres vereist</h2>
              <EmailChip email={email} onEdit={() => { setStep("email"); setPrivateOverride(false) }} />
              <div className="alert alert-error">
                <strong>Dit e-mailadres lijkt een algemeen adres.</strong><br/>
                Uw e-mailadres moet op uw persoonlijke naam staan. Adressen zoals info@, team@, admin@ of service@ worden niet geaccepteerd.
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, marginBottom:"1.5rem", lineHeight:"var(--lh-body)" }}>
                Gebruik uw persoonlijk zakelijk e-mailadres. Wilt u een bedrijfsaccount aanmaken voor uw hele organisatie?
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => setStep("email")}>Ander e-mailadres gebruiken</button>
                <button className="btn-secondary btn-full" onClick={onBack}>Bedrijfsaccount aanmaken</button>
              </div>
            </>
          )}

          {/* ── Privé waarschuwing ── */}
          {step === "private_warning" && (
            <>
              <h2 className="reg-step-title">Zakelijk e-mailadres aanbevolen</h2>
              <EmailChip email={email} onEdit={() => { setStep("email"); setPrivateOverride(false) }} />
              <div className="alert alert-warning">
                <strong>Dit lijkt een privé e-mailadres.</strong><br/>
                Investment Officer is bedoeld voor zakelijke professionals. Met een zakelijk e-mailadres krijgt u mogelijk gratis toegang via uw organisatie.
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, marginBottom:"1.25rem", lineHeight:"var(--lh-body)" }}>
                Gebruikt u dit adres toch zakelijk? Dan kunt u doorgaan, maar uw toegang tot premium content is dan afhankelijk van een persoonlijk abonnement.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => { setPrivateOverride(true); setStep("profile") }}>Dit is mijn zakelijke adres, ga door</button>
                <button className="btn-secondary btn-full" onClick={() => setStep("email")}>Ander e-mailadres gebruiken</button>
              </div>
            </>
          )}

          {/* ── Bestaand account ── */}
          {step === "existing" && (
            <>
              <h2 className="reg-step-title">U heeft al een account</h2>
              <EmailChip email={email} onEdit={() => setStep("email")} />
              <div className="alert alert-info">We hebben een bestaand account gevonden voor dit e-mailadres.</div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, marginBottom:"1.5rem", lineHeight:"var(--lh-body)" }}>
                Wilt u inloggen met uw bestaande account? Of wilt u een nieuw abonnement toevoegen?
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={onGoLogin}>Inloggen</button>
                <button className="btn-secondary btn-full" onClick={() => setStep("profile")}>Toch doorgaan en abonnement toevoegen</button>
              </div>
            </>
          )}

          {/* ── Enterprise ── */}
          {step === "enterprise" && (
            <>
              <h2 className="reg-step-title">Uw organisatie heeft een regeling</h2>
              <EmailChip email={email} onEdit={() => setStep("email")} />
              <div className="alert alert-success">
                <strong>Goed nieuws!</strong> Uw werkgever heeft een enterprise-abonnement bij Investment Officer. U kunt direct toegang krijgen zonder zelf een abonnement af te sluiten.
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, marginBottom:"1.5rem", lineHeight:"var(--lh-body)" }}>
                Koppel uw account aan het bedrijfsabonnement van uw werkgever, of sluit toch een persoonlijk abonnement af.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => setStep("profile")}>Koppelen aan bedrijfsabonnement</button>
                <button className="btn-secondary btn-full" onClick={() => { setChosenPlan(null); setStep("profile") }}>Toch persoonlijk abonnement afsluiten</button>
              </div>
            </>
          )}

          {/* ── Whitelist ── */}
          {step === "whitelist" && (
            <>
              <h2 className="reg-step-title">Uw organisatie komt in aanmerking voor gratis toegang</h2>
              <EmailChip email={email} onEdit={() => setStep("email")} />
              <div className="alert alert-success">
                <strong>U bent de eerste van uw organisatie!</strong> WealthPro komt in aanmerking voor gratis toegang voor al uw medewerkers.
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, marginBottom:"1.5rem", lineHeight:"var(--lh-body)" }}>
                Als u een bedrijfsregeling aanmaakt, wordt u automatisch aangemerkt als beheerder en kunt u collega's uitnodigen.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={onBack}>Bedrijfsregeling aanmaken voor WealthPro</button>
                <button className="btn-secondary btn-full" onClick={() => setStep("profile")}>Doorgaan met persoonlijk account</button>
              </div>
            </>
          )}

          {/* ── Profiel ── */}
          {step === "profile" && (
            <>
              <h2 className="reg-step-title">Uw persoonlijke gegevens</h2>
              <p className="reg-step-sub">Vul uw gegevens in om uw account aan te maken.</p>
              <EmailChip email={email} onEdit={() => setStep("email")} />
              <form onSubmit={handleProfileSubmit}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }}>
                  <div className="input-group"><label className="input-label">Voornaam</label><input className="input-field" type="text" placeholder="Voornaam" value={firstName} onChange={e => setFirstName(e.target.value)} required /></div>
                  <div className="input-group"><label className="input-label">Achternaam</label><input className="input-field" type="text" placeholder="Achternaam" value={lastName} onChange={e => setLastName(e.target.value)} required /></div>
                </div>
                <div className="input-group">
                  <label className="input-label">Jouw functie</label>
                  <select className="input-field" value={jobRole} onChange={e => setJobRole(e.target.value)} required>
                    <option value="">Kies een functie</option>
                    {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="input-group"><label className="input-label">Wachtwoord</label><input className="input-field" type="password" placeholder="Minimaal 8 tekens" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required /></div>
                <button className="btn-primary btn-full" type="submit">{chosenPlan ? "Verder naar bevestiging" : "Maak account aan"}</button>
              </form>
            </>
          )}

          {/* ── Plan keuze ── */}
          {step === "plan" && (
            <>
              <h2 className="reg-step-title">Kies een abonnement</h2>
              <p className="reg-step-sub">Selecteer het abonnement dat bij u past.</p>
              {[
                { id:"freemium", name:"Freemium",  desc:"Gratis toegang met beperkte content",           price:"Gratis" },
                { id:"trial",    name:"Pro Trial", desc:"10 dagen volledige toegang, stopt automatisch", price:"Gratis • 10 dagen" },
                { id:"pro",      name:"Pro",        desc:"Onbeperkte toegang tot editie Nederland",       price:"€ 649,– per jaar" },
              ].map(opt => (
                <button key={opt.id} onClick={() => handlePlanSelect(opt.id)}
                  style={{ display:"flex", alignItems:"center", gap:"1rem", border:`1.5px solid ${C.gray300}`, borderRadius:6, padding:"1rem 1.25rem", background:C.white, cursor:"pointer", textAlign:"left", width:"100%", marginBottom:"0.625rem", transition:"border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.navy; e.currentTarget.style.boxShadow = "0 2px 8px rgba(12,24,46,0.1)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray300; e.currentTarget.style.boxShadow = "none" }}
                >
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"1rem", color:C.navy }}>{opt.name}</div>
                    <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray500 }}>{opt.desc}</div>
                  </div>
                  <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9rem", color:C.navy, whiteSpace:"nowrap" }}>{opt.price}</div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke={C.gray500} strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              ))}
            </>
          )}

          {/* ── Betaling ── */}
          {step === "payment" && (
            <>
              <h2 className="reg-step-title">Betaling</h2>
              <p className="reg-step-sub">U heeft gekozen voor het Pro abonnement voor €649,– per jaar (excl. btw).</p>
              <div className="alert alert-info" style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <span style={{ fontSize:"1.25rem" }}>🔒</span>
                <span>Uw betaling wordt veilig verwerkt via <strong>Stripe</strong>.</span>
              </div>
              <form onSubmit={e => { e.preventDefault(); setStep("confirm") }}>
                <div className="input-group"><label className="input-label">Kaartnummer</label><input className="input-field" type="text" defaultValue="4242 4242 4242 4242" required /></div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }}>
                  <div className="input-group"><label className="input-label">Vervaldatum</label><input className="input-field" type="text" defaultValue="12/28" required /></div>
                  <div className="input-group"><label className="input-label">CVV</label><input className="input-field" type="text" defaultValue="123" required /></div>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem" }}>
                  <span style={{ fontFamily:"var(--font-sans)", fontSize:"1rem", fontWeight:700, color:C.navy }}>Totaal</span>
                  <span style={{ fontFamily:"var(--font-sans)", fontSize:"1.25rem", fontWeight:700, color:C.navy }}>€ 649,–</span>
                </div>
                <button className="btn-red btn-full" type="submit">Ga naar betaling</button>
              </form>
              <button className="btn-secondary btn-full" style={{ marginTop:"0.75rem" }} onClick={() => setStep("plan")}>Terug</button>
            </>
          )}

          {/* ── Bevestiging ── */}
          {step === "confirm" && (
            <>
              <h2 className="reg-step-title">Overzicht</h2>
              <p className="reg-step-sub">Controleer of alle gegevens correct zijn.</p>
              {[
                { label:"1. Uw gegevens",    items:[email, `${firstName} ${lastName}`, jobRole] },
                { label:"2. Uw abonnement",  items:[chosenPlan === "freemium" ? "Freemium — Gratis" : chosenPlan === "trial" ? "Pro Trial — 10 dagen gratis" : "Pro — €649,– per jaar"] },
                ...(chosenPlan === "pro" ? [{ label:"3. Betaling", items:["Betaling via Stripe"] }] : []),
              ].map((section, i) => (
                <div key={i} style={{ border:`1px solid ${C.gray200}`, borderRadius:6, padding:"1rem 1.25rem", marginBottom:"0.75rem" }}>
                  <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray500, marginBottom:"0.5rem", display:"flex", justifyContent:"space-between" }}>
                    {section.label}
                    <button className="link-btn" style={{ fontSize:"0.8rem", textTransform:"none", letterSpacing:0 }} onClick={() => setStep(i===0?"profile":i===1?"plan":"payment")}>Aanpassen</button>
                  </div>
                  {section.items.map((item,j) => <div key={j} style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.navy }}>{item}</div>)}
                </div>
              ))}
              {chosenPlan === "trial" && <div className="alert alert-warning" style={{ marginTop:"1rem" }}>Na 10 dagen stopt uw toegang automatisch.</div>}
              <button className="btn-red btn-full" style={{ marginTop:"1rem" }} onClick={() => setStep("done")}>
                {chosenPlan === "pro" ? "Bevestig en betaal" : "Account aanmaken"}
              </button>
            </>
          )}

          {/* ── Done ── */}
          {step === "done" && (
            <div style={{ textAlign:"center", padding:"1.5rem 0" }}>
              <div style={{ width:64, height:64, background:C.green, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem" }}>
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none"><path d="M2 11L10 19L26 3" stroke={C.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.75rem", fontWeight:800, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", color:C.navy, marginBottom:"0.5rem" }}>
                {chosenPlan === "pro" ? "Welkom bij Investment Officer Pro!" : chosenPlan === "trial" ? "Uw proefperiode is gestart!" : "Uw account is aangemaakt!"}
              </h2>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"1.5rem" }}>
                {chosenPlan === "pro" ? "U heeft nu onbeperkte toegang tot alle premium content van editie Nederland." : chosenPlan === "trial" ? "U heeft 10 dagen volledige toegang. Na afloop valt u terug naar Freemium." : "U heeft nu toegang tot alle gratis content en nieuwsbrieven."}
              </p>
              <div className="alert alert-success" style={{ textAlign:"left" }}>
                We hebben een bevestigingse-mail gestuurd naar <strong>{email}</strong>.
              </div>
              <button className="btn-primary btn-full" style={{ marginTop:"1rem" }} onClick={onComplete}>Ga naar de website</button>
            </div>
          )}

        </div>
        <div className="reg-sidebar"><RegSidebar /></div>
      </div>
    </div>
  )
}
