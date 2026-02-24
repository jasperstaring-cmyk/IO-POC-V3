import { useState } from 'react'
import { C } from '../tokens.js'
import { SEGMENTS, PRODUCT_C_VARIANTS, JOB_ROLES } from '../data.js'
import TopNav from '../components/TopNav.jsx'
import { ProgressBar, RegSidebar, SelectionRow, EmailChip, BackButton } from '../components/shared.jsx'

export default function BusinessFlow({ onComplete, onBack, onGoLogin }) {
  const [step, setStep]           = useState("email")
  const [email, setEmail]         = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName]   = useState("")
  const [jobRole, setJobRole]     = useState("")
  const [password, setPassword]   = useState("")
  const [segment, setSegment]     = useState(null)
  const [orgType, setOrgType]     = useState(null)
  const [variant, setVariant]     = useState(null)
  const [userCount, setUserCount] = useState("")
  const [company, setCompany]     = useState({ name:"", street:"", number:"", zip:"", city:"", country:"NL", kvk:"", vat:"" })
  const [inviteEmails, setInviteEmails] = useState(["",""])

  const STEP_NUM = { email:1, segment:2, type:3, product_a_info:4, product_c_variant:4, company:5, kvk_check:5, kvk_degraded:5, invite:6, done:6 }
  const TOTAL    = 6
  const curr     = STEP_NUM[step] || 1

  const selectedSegment = SEGMENTS.find(s => s.id === segment?.id)
  const isPlaceholder   = selectedSegment?.product === "placeholder"

  function handleSegmentNext() {
    if (!segment) return
    if (isPlaceholder) {
      alert(`POC: De flow voor "${segment.name}" wordt in een volgende iteratie uitgewerkt.`)
      return
    }
    setOrgType(null)
    setStep("type")
  }

  function handleTypeNext() {
    if (!orgType) return
    if (segment.id === "wealth") setStep("product_a_info")
    else setStep("product_c_variant")
  }

  function handleCompanyChange(field, val) {
    setCompany(prev => ({ ...prev, [field]: val }))
  }

  // Simulate KvK validation: KvK starting with "99" → degraded (A→B)
  function handleKvkValidation(pass) {
    if (pass) setStep("invite")
    else setStep("kvk_degraded")
  }

  const xlPrice = userCount ? Math.max(16, parseInt(userCount) || 16) * 108 : null

  return (
    <div className="reg-layout">
      <TopNav onLogin={onGoLogin} onSubscribe={onBack} loggedIn={false} />
      <div className="reg-container">
        <div className="reg-main">
          <ProgressBar total={TOTAL} current={curr} />

          {/* ── STAP 1: Persoonlijke gegevens + e-mail ── */}
          {step === "email" && (
            <>
              <h2 className="reg-step-title">Registreer uw organisatie</h2>
              <p className="reg-step-sub">Begin met uw gegevens als beheerder van het bedrijfsaccount.</p>
              <div className="demo-hint">
                <strong>Demo scenario's:</strong><br/>
                Kies daarna segment <strong>Wealth Management</strong> → Product A (24 mnd gratis)<br/>
                KvK beginnend met <strong>99</strong> → degradatie naar Product B (6 mnd gratis)<br/>
                Kies segment <strong>Asset Management</strong> → Product C met varianten<br/>
                Overige segmenten → placeholder melding
              </div>
              <form onSubmit={e => { e.preventDefault(); setStep("segment") }}>
                <div className="input-group">
                  <label className="input-label">Zakelijk e-mailadres</label>
                  <input className="input-field" type="email" placeholder="uw@bedrijf.com" value={email} onChange={e => setEmail(e.target.value)} autoFocus required />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }}>
                  <div className="input-group">
                    <label className="input-label">Voornaam</label>
                    <input className="input-field" type="text" placeholder="Voornaam" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Achternaam</label>
                    <input className="input-field" type="text" placeholder="Achternaam" value={lastName} onChange={e => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Jouw functie</label>
                  <select className="input-field" value={jobRole} onChange={e => setJobRole(e.target.value)} required>
                    <option value="">Kies een functie</option>
                    {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Wachtwoord</label>
                  <input className="input-field" type="password" placeholder="Minimaal 8 tekens" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required />
                </div>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"1.25rem" }}>
                  Door verder te gaan ga je akkoord met onze{" "}
                  <button className="link-btn" style={{ fontSize:"0.85rem" }} type="button">Algemene Voorwaarden</button>{" "}
                  en het{" "}
                  <button className="link-btn" style={{ fontSize:"0.85rem" }} type="button">Privacybeleid.</button>
                </p>
                <button className="btn-primary btn-full" type="submit">Verder</button>
              </form>
            </>
          )}

          {/* ── STAP 2: Segment ── */}
          {step === "segment" && (
            <>
              <h2 className="reg-step-title">Kies in welke sector je werkt</h2>
              <p className="reg-step-sub">Afhankelijk van je sector en organisatie heb je mogelijk gratis toegang.</p>
              {SEGMENTS.map(s => (
                <SelectionRow
                  key={s.id}
                  selected={segment?.id === s.id}
                  onSelect={() => setSegment(s)}
                  name={s.name}
                  desc={s.desc}
                />
              ))}
              <div className="reg-nav-bar">
                <BackButton onClick={() => setStep("email")} />
                <button className="btn-primary btn-full" onClick={handleSegmentNext} disabled={!segment}>Verder</button>
              </div>
            </>
          )}

          {/* ── STAP 3: Organisatie type ── */}
          {step === "type" && selectedSegment && (
            <>
              <h2 className="reg-step-title">Wat voor organisatie bent u?</h2>
              <p className="reg-step-sub">Selecteer het type dat het beste bij uw organisatie past.</p>
              {selectedSegment.types.map(t => (
                <SelectionRow
                  key={t.id}
                  selected={orgType?.id === t.id}
                  onSelect={() => setOrgType(t)}
                  name={t.name}
                  desc={t.desc}
                />
              ))}
              <div className="reg-nav-bar">
                <BackButton onClick={() => setStep("segment")} />
                <button className="btn-primary btn-full" onClick={handleTypeNext} disabled={!orgType}>Verder</button>
              </div>
            </>
          )}

          {/* ── STAP 4a: Product A info (Wealth) ── */}
          {step === "product_a_info" && (
            <>
              <h2 className="reg-step-title">Uw organisatie komt in aanmerking voor gratis toegang</h2>
              <p className="reg-step-sub">Als Wealth Management organisatie bieden wij u 24 maanden gratis volledige toegang voor alle medewerkers.</p>
              <div className="alert alert-success">
                <strong>Business Product A — 24 maanden gratis</strong><br/>
                Alle medewerkers van uw organisatie krijgen volledige toegang. U wordt automatisch beheerder en kunt collega's uitnodigen.
              </div>
              <div style={{ border:`1px solid ${C.gray200}`, borderRadius:8, padding:"1.25rem 1.5rem", marginBottom:"1.5rem" }}>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray500, marginBottom:"0.75rem" }}>Wat u krijgt</div>
                {["Onbeperkte toegang voor alle medewerkers","Beheeromgeving voor admins","Collega's uitnodigen per e-mail","Volledige redactionele dekking editie Nederland","Toegang via web en app"].map((f,i) => (
                  <div key={i} style={{ display:"flex", gap:"0.5rem", marginBottom:"0.4rem" }}>
                    <span style={{ color:C.green }}>✓</span>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.navy }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="alert alert-warning" style={{ fontSize:"0.85rem" }}>
                <strong>Let op:</strong> Wij valideren uw organisatie op basis van KvK- en VAT-nummer. Als uw organisatie niet aan de criteria voldoet, wordt uw toegang omgezet naar Business Product B (6 maanden gratis).
              </div>
              <div className="reg-nav-bar">
                <BackButton onClick={() => setStep("type")} />
                <button className="btn-primary btn-full" onClick={() => setStep("company")}>Verder naar bedrijfsgegevens</button>
              </div>
            </>
          )}

          {/* ── STAP 4b: Product C variant (Asset Management) ── */}
          {step === "product_c_variant" && (
            <>
              <h2 className="reg-step-title">Kies de passende regeling voor uw organisatie</h2>
              <p className="reg-step-sub">Business Product C biedt aantrekkelijke groepstarieven op basis van het aantal gebruikers.</p>
              {PRODUCT_C_VARIANTS.map(v => (
                <div key={v.id}>
                  <SelectionRow
                    selected={variant?.id === v.id}
                    onSelect={() => setVariant(v)}
                    name={`${v.label} — ${v.users}`}
                    right={v.priceLabel + " /jaar"}
                  />
                  {v.id === "XL" && variant?.id === "XL" && (
                    <div style={{ margin:"-0.25rem 0 0.625rem 2.75rem", padding:"0.875rem 1rem", background:C.gray50, borderRadius:6, border:`1px solid ${C.gray200}` }}>
                      <label className="input-label">Aantal gebruikers</label>
                      <input className="input-field" type="number" min="16" placeholder="Bijv. 20" value={userCount} onChange={e => setUserCount(e.target.value)} style={{ maxWidth:180, marginTop:"0.25rem" }} />
                      {xlPrice && (
                        <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.navy, marginTop:"0.5rem" }}>
                          Berekende prijs: <strong>€ {xlPrice.toLocaleString("nl-NL")},–</strong> per jaar
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="reg-nav-bar">
                <BackButton onClick={() => setStep("type")} />
                <button className="btn-primary btn-full" onClick={() => setStep("company")} disabled={!variant}>Verder naar bedrijfsgegevens</button>
              </div>
            </>
          )}

          {/* ── STAP 5: Bedrijfsgegevens ── */}
          {step === "company" && (
            <>
              <h2 className="reg-step-title">Bedrijfsgegevens</h2>
              <p className="reg-step-sub">Vul de officiële gegevens van uw organisatie in. KvK- en VAT-nummer zijn verplicht voor validatie.</p>
              <form onSubmit={e => { e.preventDefault(); setStep("kvk_check") }}>
                <div className="input-group">
                  <label className="input-label">Bedrijfsnaam</label>
                  <input className="input-field" type="text" placeholder="Officiële bedrijfsnaam" value={company.name} onChange={e => handleCompanyChange("name", e.target.value)} required />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"0 1rem" }}>
                  <div className="input-group">
                    <label className="input-label">Straatnaam</label>
                    <input className="input-field" type="text" placeholder="Straatnaam" value={company.street} onChange={e => handleCompanyChange("street", e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Huisnummer</label>
                    <input className="input-field" type="text" placeholder="Nr." value={company.number} onChange={e => handleCompanyChange("number", e.target.value)} required />
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"0 1rem" }}>
                  <div className="input-group">
                    <label className="input-label">Postcode</label>
                    <input className="input-field" type="text" placeholder="1234 AB" value={company.zip} onChange={e => handleCompanyChange("zip", e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Stad</label>
                    <input className="input-field" type="text" placeholder="Stad" value={company.city} onChange={e => handleCompanyChange("city", e.target.value)} required />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Land</label>
                  <select className="input-field" value={company.country} onChange={e => handleCompanyChange("country", e.target.value)}>
                    {["NL","BE","DE","FR","LU"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }}>
                  <div className="input-group">
                    <label className="input-label">KvK-nummer</label>
                    <input className="input-field" type="text" placeholder="12345678" value={company.kvk} onChange={e => handleCompanyChange("kvk", e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">VAT-nummer</label>
                    <input className="input-field" type="text" placeholder="NL123456789B01" value={company.vat} onChange={e => handleCompanyChange("vat", e.target.value)} required />
                  </div>
                </div>
                {segment?.id === "wealth" && (
                  <div className="demo-hint">
                    <strong>Demo tip:</strong> KvK-nummer beginnend met <strong>99</strong> simuleert een mislukte validatie → degradatie naar Product B
                  </div>
                )}
                <div className="reg-nav-bar">
                  <BackButton onClick={() => setStep(segment?.id === "wealth" ? "product_a_info" : "product_c_variant")} />
                  <button className="btn-primary btn-full" type="submit">Valideer en ga verder</button>
                </div>
              </form>
            </>
          )}

          {/* ── STAP 5 (check): KvK validatie simulatie ── */}
          {step === "kvk_check" && (
            <>
              <h2 className="reg-step-title">Validatie bedrijfsgegevens</h2>
              <p className="reg-step-sub">We controleren uw KvK- en VAT-nummer.</p>
              <div className="alert alert-info" style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <span style={{ fontSize:"1.25rem" }}>🔍</span>
                <span>KvK: <strong>{company.kvk}</strong> — VAT: <strong>{company.vat}</strong></span>
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, marginBottom:"1.5rem", lineHeight:"var(--lh-body)" }}>
                Simuleer het validatieresultaat:
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => handleKvkValidation(true)}>
                  ✓ Validatie geslaagd — doorgaan als {segment?.id === "wealth" ? "Product A (24 maanden gratis)" : `Product C ${variant?.label || ""}`}
                </button>
                {segment?.id === "wealth" && (
                  <button className="btn-secondary btn-full" onClick={() => handleKvkValidation(false)}>
                    ✗ Validatie mislukt — degradatie naar Product B simuleren
                  </button>
                )}
              </div>
            </>
          )}

          {/* ── STAP 5 (degraded): A → B ── */}
          {step === "kvk_degraded" && (
            <>
              <h2 className="reg-step-title">Uw organisatie is anders ingedeeld</h2>
              <EmailChip email={email} onEdit={() => {}} />
              <div className="alert alert-warning">
                <strong>Uw organisatie voldoet niet aan de criteria voor Product A.</strong><br/>
                Op basis van de KvK-validatie hebben wij uw organisatie anders ingedeeld. Uw toegang is omgezet naar Business Product B.
              </div>
              <div style={{ border:`1px solid ${C.gray200}`, borderRadius:8, padding:"1.25rem 1.5rem", marginBottom:"1.5rem" }}>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray500, marginBottom:"0.5rem" }}>Uw nieuwe regeling</div>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"1.25rem", fontWeight:800, color:C.navy, marginBottom:"0.25rem" }}>Business Product B</div>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500, marginBottom:"0.75rem" }}>6 maanden gratis toegang voor alle medewerkers</div>
                {["Volledige toegang gedurende 6 maanden","Daarna aanbieding op maat","Beheeromgeving voor admins","Collega's uitnodigen"].map((f,i) => (
                  <div key={i} style={{ display:"flex", gap:"0.5rem", marginBottom:"0.375rem" }}>
                    <span style={{ color:C.green }}>✓</span>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.navy }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary btn-full" onClick={() => setStep("invite")}>
                Akkoord — doorgaan met Product B
              </button>
            </>
          )}

          {/* ── STAP 6: Collega's uitnodigen ── */}
          {step === "invite" && (
            <>
              <h2 className="reg-step-title">Nodig collega's uit</h2>
              <p className="reg-step-sub">U bent automatisch beheerder. Voeg e-mailadressen toe van collega's die u toegang wilt geven.</p>
              <div className="alert alert-success">
                <strong>Uw bedrijfsaccount is aangemaakt!</strong> {company.name || "Uw organisatie"} is nu geregistreerd bij Investment Officer.
              </div>
              {inviteEmails.map((em,i) => (
                <div key={i} className="input-group">
                  <label className="input-label">Collega {i+1}</label>
                  <input className="input-field" type="email" placeholder="collega@bedrijf.com" value={em}
                    onChange={e => { const arr = [...inviteEmails]; arr[i] = e.target.value; setInviteEmails(arr) }} />
                </div>
              ))}
              <button className="link-btn" style={{ marginBottom:"1.5rem", display:"block" }}
                onClick={() => setInviteEmails(prev => [...prev, ""])}>
                + Nog een collega toevoegen
              </button>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => setStep("done")}>Uitnodigingen versturen</button>
                <button className="btn-secondary btn-full" onClick={() => setStep("done")}>Overslaan — later uitnodigen</button>
              </div>
            </>
          )}

          {/* ── STAP 7: Done ── */}
          {step === "done" && (
            <div style={{ textAlign:"center", padding:"1.5rem 0" }}>
              <div style={{ width:64, height:64, background:C.green, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem" }}>
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none"><path d="M2 11L10 19L26 3" stroke={C.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.75rem", fontWeight:800, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", color:C.navy, marginBottom:"0.5rem" }}>
                Welkom bij Investment Officer!
              </h2>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"1.5rem" }}>
                {company.name || "Uw organisatie"} is nu geregistreerd. U bent aangemerkt als beheerder. Uitgenodigde collega's ontvangen een e-mail met verdere instructies.
              </p>
              <div className="alert alert-success" style={{ textAlign:"left" }}>
                Bevestigingsmail verstuurd naar <strong>{email}</strong>.
              </div>
              <button className="btn-primary btn-full" style={{ marginTop:"1rem" }} onClick={onComplete}>
                Ga naar de website
              </button>
            </div>
          )}

        </div>
        <div className="reg-sidebar"><RegSidebar /></div>
      </div>
    </div>
  )
}
