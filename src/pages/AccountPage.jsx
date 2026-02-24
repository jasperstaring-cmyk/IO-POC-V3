import { useState } from 'react'
import { C } from '../tokens.js'
import { JOB_ROLES } from '../data.js'
import IOLogo from '../components/IOLogo.jsx'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initials(first, last) {
  return ((first?.[0] || "") + (last?.[0] || "")).toUpperCase()
}

// ─── Top Nav (account variant) ────────────────────────────────────────────────
function AccountTopNav({ firstName, lastName, onBack }) {
  return (
    <header style={{ position:"sticky", top:0, zIndex:50, background:C.white, borderBottom:`1px solid ${C.gray100}`, boxShadow:"0 1px 6px rgba(12,24,46,0.06)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 1.5rem", height:56, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <IOLogo />
        <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", cursor:"pointer" }} onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={C.gray300} strokeWidth="1.5"/><path d="M12 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c-4 0-6 2-6 3h12c0-1-2-3-6-3z" fill={C.gray300}/></svg>
          <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", fontWeight:600, color:C.navy }}>{firstName} {lastName}</span>
        </div>
      </div>
    </header>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"account",       label:"Mijn account",         icon:"person" },
  { id:"nieuwsbrief",   label:"Nieuwsbrief",           icon:"bell" },
  { id:"abonnementen",  label:"Mijn abonnementen",     icon:"card" },
  { id:"gebruikers",    label:"Gebruikers uitnodigen", icon:"people" },
  { id:"facturatie",    label:"Facturatie",            icon:"billing" },
]

function NavIcon({ type, active, disabled }) {
  const color = disabled ? C.gray300 : active ? C.navy : C.gray500
  const icons = {
    person:  <path d="M12 12c2.7 0 4-1.8 4-4s-1.3-4-4-4-4 1.8-4 4 1.3 4 4 4zm0 2c-4 0-6 2-6 3.5h12c0-1.5-2-3.5-6-3.5z" fill={color}/>,
    bell:    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.1-1.6-5.6-4.5-6.3V4c0-.8-.7-1.5-1.5-1.5S10.5 3.2 10.5 4v.7C7.6 5.4 6 7.9 6 11v5l-2 2v1h16v-1l-2-2z" fill={color}/>,
    card:    <><rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M2 10h20" stroke={color} strokeWidth="1.5"/></>,
    people:  <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5c0-2.3-4.7-3.5-7-3.5zm8 0c-.3 0-.6 0-1 .1 1.2.9 2 2.1 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z" fill={color}/>,
    billing: <><rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M7 8h10M7 12h6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{icons[type]}</svg>
}

function Sidebar({ active, onNav, firstName, lastName }) {
  return (
    <div style={{ width:260, flexShrink:0 }}>
      <div style={{ background:C.white, borderRadius:10, padding:"1.5rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)" }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            onClick={() => !item.disabled && onNav(item.id)}
            style={{ display:"flex", alignItems:"center", gap:"0.75rem", width:"100%", padding:"0.625rem 0.75rem", borderRadius:6, border:"none", background: active===item.id ? C.gray50 : "transparent", cursor: item.disabled ? "default" : "pointer", marginBottom:"0.25rem", textAlign:"left", opacity: item.disabled ? 0.5 : 1 }}>
            <NavIcon type={item.icon} active={active===item.id} disabled={item.disabled} />
            <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", fontWeight: active===item.id ? 700 : 400, color: item.disabled ? C.gray300 : active===item.id ? C.navy : C.gray700 }}>
              {item.label}
            </span>
          </button>
        ))}

        <div style={{ borderTop:`1px solid ${C.gray100}`, marginTop:"0.75rem", paddingTop:"0.75rem" }}>
          <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.red, marginBottom:"0.5rem" }}>Hulp nodig?</div>
          <button style={{ display:"flex", alignItems:"center", gap:"0.625rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.7 0 4-1.8 4-4s-1.3-4-4-4-4 1.8-4 4 1.3 4 4 4zm0 2c-4 0-6 2-6 3.5h12c0-1.5-2-3.5-6-3.5z" fill={C.gray500}/></svg>
            <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray700 }}>Neem contact op</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Read-only field ──────────────────────────────────────────────────────────
function ReadField({ label, value }) {
  return (
    <div style={{ border:`1px solid ${C.gray200}`, borderRadius:6, padding:"0.75rem 1rem", marginBottom:"0.5rem" }}>
      <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray500, marginBottom:"0.25rem" }}>{label}</div>
      <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", color:C.navy }}>{value || "—"}</div>
    </div>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────
function SectionCard({ title, subtitle, onEdit, editing, children }) {
  return (
    <div style={{ background:C.white, borderRadius:10, padding:"1.75rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)", marginBottom:"1.25rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.25rem" }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.375rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.375rem" }}>{title}</h2>
          {subtitle && <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray500, lineHeight:"var(--lh-body)", maxWidth:600 }}>{subtitle}</p>}
        </div>
        {onEdit && !editing && (
          <button className="btn-secondary" style={{ padding:"0.4rem 1rem", fontSize:"0.875rem", flexShrink:0, marginLeft:"1rem" }} onClick={onEdit}>Wijzigen</button>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{ width:48, height:26, borderRadius:13, background: checked ? C.green : C.gray300, cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left: checked ? 25 : 3, width:20, height:20, borderRadius:"50%", background:C.white, boxShadow:"0 1px 4px rgba(0,0,0,0.2)", transition:"left 0.2s" }}/>
    </div>
  )
}

// ─── Mijn Account sectie ──────────────────────────────────────────────────────
function AccountSection({ user, onUpdate }) {
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingContact, setEditingContact] = useState(false)
  const [profile, setProfile] = useState({ firstName: user.firstName, lastName: user.lastName, initials: user.initials || "", jobRole: user.jobRole || "", language: "Nederlands" })
  const [contact, setContact] = useState({ email: user.email, phone: "" })

  function saveProfile() { onUpdate({ ...user, ...profile }); setEditingProfile(false) }
  function saveContact() { setEditingContact(false) }

  return (
    <>
      <SectionCard title="Mijn account" subtitle="Beheer hier uw persoonlijke gegevens." onEdit={() => setEditingProfile(true)} editing={editingProfile}>
        {editingProfile ? (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }}>
              <div className="input-group"><label className="input-label">Voornaam</label><input className="input-field" value={profile.firstName} onChange={e => setProfile(p => ({...p, firstName:e.target.value}))} /></div>
              <div className="input-group"><label className="input-label">Achternaam</label><input className="input-field" value={profile.lastName} onChange={e => setProfile(p => ({...p, lastName:e.target.value}))} /></div>
            </div>
            <div className="input-group"><label className="input-label">Initialen</label><input className="input-field" value={profile.initials} onChange={e => setProfile(p => ({...p, initials:e.target.value}))} /></div>
            <div className="input-group">
              <label className="input-label">Functie</label>
              <select className="input-field" value={profile.jobRole} onChange={e => setProfile(p => ({...p, jobRole:e.target.value}))}>
                {JOB_ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Voorkeurstaal communicatie</label>
              <select className="input-field" value={profile.language} onChange={e => setProfile(p => ({...p, language:e.target.value}))}>
                {["Nederlands","Engels","Frans","Duits"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:"0.75rem", marginTop:"0.5rem" }}>
              <button className="btn-navy" onClick={saveProfile}>Opslaan</button>
              <button className="btn-secondary" onClick={() => setEditingProfile(false)}>Annuleren</button>
            </div>
          </>
        ) : (
          <>
            <ReadField label="First name" value={profile.firstName} />
            <ReadField label="Last name" value={profile.lastName} />
            <ReadField label="Initials" value={profile.initials} />
            <ReadField label="Job position" value={profile.jobRole} />
            <ReadField label="Preferred language for communication" value={profile.language} />
          </>
        )}
      </SectionCard>

      <SectionCard title="Mijn contact detail" subtitle="Beheer hier uw contactgegevens." onEdit={() => setEditingContact(true)} editing={editingContact}>
        {editingContact ? (
          <>
            <div className="input-group"><label className="input-label">E-mailadres</label><input className="input-field" value={contact.email} onChange={e => setContact(c => ({...c, email:e.target.value}))} /></div>
            <div className="input-group"><label className="input-label">Telefoonnummer</label><input className="input-field" placeholder="+31 6 00000000" value={contact.phone} onChange={e => setContact(c => ({...c, phone:e.target.value}))} /></div>
            <div style={{ display:"flex", gap:"0.75rem", marginTop:"0.5rem" }}>
              <button className="btn-navy" onClick={saveContact}>Opslaan</button>
              <button className="btn-secondary" onClick={() => setEditingContact(false)}>Annuleren</button>
            </div>
          </>
        ) : (
          <>
            <ReadField label="E-mail address" value={contact.email} />
            <ReadField label="Telephone number" value={contact.phone} />
            <ReadField label="Initials" value={profile.initials} />
          </>
        )}
      </SectionCard>
    </>
  )
}

// ─── Nieuwsbrief sectie ───────────────────────────────────────────────────────
const NEWSLETTERS = [
  { id:"daily",    name:"Daily",            desc:"Our daily round-up of sector trends and market shifts." },
  { id:"editors",  name:"Editor's Choice",  desc:"Our weekly pick of must-read stories from the editorial team." },
  { id:"research", name:"Research Bulletin", desc:"Our daily selection of research from asset managers worldwide." },
  { id:"partner",  name:"Partner",          desc:"Our daily selection of research from asset managers worldwide." },
]
const EDITIONS = ["Nederland","Luxemburg","België"]

function NewsletterSection() {
  const [activeTab, setActiveTab] = useState("Nederland")
  const [subs, setSubs] = useState({ Nederland:{ daily:true, editors:true, research:true, partner:true }, Luxemburg:{ daily:false, editors:true, research:false, partner:false }, België:{ daily:true, editors:false, research:true, partner:false } })

  function toggle(id) {
    setSubs(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [id]: !prev[activeTab][id] } }))
  }

  return (
    <div style={{ background:C.white, borderRadius:10, padding:"1.75rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)" }}>
      <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.375rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"0.375rem" }}>Beheer jouw nieuwsbrieven</h2>
      <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"1.5rem", maxWidth:700 }}>
        Ontvang de laatste ontwikkelingen, diepgaande analyses, relevante evenementen en interviews met toonaangevende figuren in de beleggingsindustrie.
      </p>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${C.gray200}`, marginBottom:"1.25rem" }}>
        {EDITIONS.map(ed => (
          <button key={ed} onClick={() => setActiveTab(ed)}
            style={{ background:"none", border:"none", borderBottom:`2px solid ${activeTab===ed ? C.navy : "transparent"}`, padding:"0.5rem 1.25rem", fontFamily:"var(--font-sans)", fontSize:"0.9rem", fontWeight: activeTab===ed ? 700 : 400, color: activeTab===ed ? C.navy : C.gray500, cursor:"pointer", marginBottom:"-1px", transition:"color 0.15s, border-color 0.15s" }}>
            {ed}
          </button>
        ))}
      </div>

      {/* Newsletter rows */}
      {NEWSLETTERS.map(nl => (
        <div key={nl.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", border:`1px solid ${C.gray200}`, borderRadius:6, padding:"1rem 1.25rem", marginBottom:"0.625rem" }}>
          <div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9375rem", fontWeight:700, color:C.navy, marginBottom:"0.2rem" }}>{nl.name}</div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8125rem", color:C.gray500 }}>{nl.desc}</div>
          </div>
          <Toggle checked={subs[activeTab][nl.id]} onChange={() => toggle(nl.id)} />
        </div>
      ))}
    </div>
  )
}

// ─── Abonnementen sectie ──────────────────────────────────────────────────────
function AbonnementenSection({ planType }) {
  const isGratis   = planType === "freemium"
  const isTrial    = planType === "trial"
  const isPro      = planType === "pro"
  const isBusiness = planType === "business"

  const bannerColor = isTrial ? "#EEF4FF" : isGratis ? "#EDFBF4" : "#EDFBF4"
  const bannerBorder = isTrial ? "#7B9FE0" : C.green

  return (
    <div style={{ background:C.white, borderRadius:10, padding:"1.75rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)" }}>

      {/* Status banner */}
      {isTrial && (
        <div style={{ background:"#EEF4FF", border:`1px solid #7B9FE0`, borderRadius:8, padding:"1rem 1.25rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{ width:64, height:48, flexShrink:0, background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:6 }}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", color:C.navy, marginBottom:"0.25rem" }}>Jouw proefperiode is gestart</div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray700, lineHeight:"var(--lh-body)" }}>Je hebt nu 10 dagen gratis toegang tot Investment Officer. Na afloop van deze periode start jouw gekozen abonnement.</div>
          </div>
          <div style={{ background:"#3B82F6", color:C.white, borderRadius:99, padding:"0.3rem 0.875rem", fontFamily:"var(--font-sans)", fontSize:"0.8rem", fontWeight:700, whiteSpace:"nowrap" }}>10 dagen over</div>
        </div>
      )}

      {isGratis && (
        <div style={{ background:"#EDFBF4", border:`1px solid ${C.green}`, borderRadius:8, padding:"1rem 1.25rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{ width:64, height:48, flexShrink:0, background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:6 }}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", color:C.navy, marginBottom:"0.25rem" }}>Je maakt gebruik van jouw gratis toegang</div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray700, lineHeight:"var(--lh-body)" }}>Investment Officer ondersteunt bepaalde sectoren met kosteloze toegang om kennisdeling binnen het ecosysteem te bevorderen.</div>
          </div>
          <div style={{ background:C.green, color:C.navy, borderRadius:99, padding:"0.3rem 0.875rem", fontFamily:"var(--font-sans)", fontSize:"0.8rem", fontWeight:700, whiteSpace:"nowrap" }}>100% korting</div>
        </div>
      )}

      {/* Abonnement header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
        <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.375rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)" }}>Mijn abonnement</h2>
        <button className="btn-secondary" style={{ padding:"0.4rem 1rem", fontSize:"0.875rem", display:"flex", alignItems:"center", gap:"0.375rem" }}>
          <span style={{ fontSize:"1.1rem", lineHeight:1 }}>+</span> Abonnement toevoegen
        </button>
      </div>

      {/* Abonnement rij */}
      <div style={{ border:`1px solid ${C.gray200}`, borderRadius:8, padding:"1rem 1.25rem", display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
        <div style={{ width:28, height:20, background:"linear-gradient(180deg,#AE1C28 33%,#fff 33% 66%,#21468B 66%)", borderRadius:3, flexShrink:0, border:`1px solid ${C.gray200}` }}/>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", color:C.navy }}>
            Investment Officer · Local Nederland · {isBusiness ? "Business" : "Personal"} {isPro ? "Pro" : isTrial ? "Trial" : "Freemium"}
          </div>
          <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8125rem", color:C.gray500, marginTop:"0.2rem" }}>Gestart op 12 jan 2025</div>
        </div>
        {(isPro || isBusiness) && (
          <span style={{ background:C.red, color:C.white, borderRadius:99, padding:"0.25rem 0.75rem", fontFamily:"var(--font-sans)", fontSize:"0.8rem", fontWeight:700, whiteSpace:"nowrap" }}>Verlengd automatisch</span>
        )}
        <button className="btn-secondary" style={{ padding:"0.4rem 1rem", fontSize:"0.875rem" }}>Wijzigen</button>
      </div>

      {/* Upgrade banner */}
      <div style={{ border:`1px solid ${C.gray200}`, borderRadius:8, padding:"1.25rem 1.5rem", display:"flex", alignItems:"flex-start", gap:"1.25rem" }}>
        <div style={{ width:80, height:56, flexShrink:0, background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, borderRadius:6, position:"relative" }}>
          <div style={{ position:"absolute", inset:5, border:"1px solid rgba(255,255,255,0.15)", borderRadius:3 }}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"1rem", color:C.navy, marginBottom:"0.375rem", lineHeight:"var(--lh-heading)" }}>Breid je toegang uit naar alle internationale edities</div>
          <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray700, lineHeight:"var(--lh-body)", marginBottom:"1rem" }}>
            Je hebt nu toegang tot de lokale editie van Investment Officer.<br/>
            Met een upgrade lees je ook onze internationale edities en krijg je wereldwijd perspectief op de markt.
          </div>
          <button className="btn-primary" style={{ padding:"0.625rem 1.5rem" }} onClick={() => alert("POC: upgrade flow naar alle edities")}>
            Upgrade naar wereldwijde toegang
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Facturatie sectie ────────────────────────────────────────────────────────
const MOCK_INVOICES = [
  { date:"Jan 22, 2025", status:"Aankomend", amount:"€250,00" },
  { date:"Jan 22, 2025", status:"Betaald",   amount:"€250,00" },
  { date:"Dec 22, 2024", status:"Betaald",   amount:"€250,00" },
  { date:"Nov 22, 2024", status:"Betaald",   amount:"€250,00" },
  { date:"Okt 22, 2024", status:"Betaald",   amount:"€250,00" },
  { date:"Sep 22, 2024", status:"Betaald",   amount:"€250,00" },
]

function FacturatieSection() {
  const [tab, setTab] = useState("betalingsgegevens")
  const [billing, setBilling] = useState({ kvk:"", company:"", street:"", number:"12", addition:"Bis", zip:"", city:"", country:"Nederland", vat:"" })

  return (
    <div style={{ background:C.white, borderRadius:10, padding:"1.75rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)" }}>
      <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.375rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", marginBottom:"1.25rem" }}>Facturatie</h2>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:`1px solid ${C.gray200}`, marginBottom:"1.5rem" }}>
        {[["betalingsgegevens","Betalingsgegevens"],["facturen","Facturen"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ background:"none", border:"none", borderBottom:`2px solid ${tab===id ? C.navy : "transparent"}`, padding:"0.5rem 1.25rem", fontFamily:"var(--font-sans)", fontSize:"0.9rem", fontWeight: tab===id ? 700 : 400, color: tab===id ? C.navy : C.gray500, cursor:"pointer", marginBottom:"-1px" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "betalingsgegevens" && (
        <>
          <div className="input-group"><label className="input-label">KVK nummer</label><input className="input-field" placeholder="KvK nummer" value={billing.kvk} onChange={e => setBilling(b=>({...b,kvk:e.target.value}))} /></div>
          <div className="input-group"><label className="input-label">Bedrijfsnaam</label><input className="input-field" placeholder="Bedrijfsnaam" value={billing.company} onChange={e => setBilling(b=>({...b,company:e.target.value}))} /></div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"0 1rem" }}>
            <div className="input-group"><label className="input-label">Straatnaam / mailbox</label><input className="input-field" value={billing.street} onChange={e => setBilling(b=>({...b,street:e.target.value}))} /></div>
            <div className="input-group"><label className="input-label">Huisnr</label><input className="input-field" value={billing.number} onChange={e => setBilling(b=>({...b,number:e.target.value}))} /></div>
            <div className="input-group"><label className="input-label">Toevoeging</label><input className="input-field" placeholder="Bis" value={billing.addition} onChange={e => setBilling(b=>({...b,addition:e.target.value}))} /></div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"0 1rem" }}>
            <div className="input-group"><label className="input-label">Postcode</label><input className="input-field" value={billing.zip} onChange={e => setBilling(b=>({...b,zip:e.target.value}))} /></div>
            <div className="input-group"><label className="input-label">Stad</label><input className="input-field" value={billing.city} onChange={e => setBilling(b=>({...b,city:e.target.value}))} /></div>
          </div>
          <div className="input-group">
            <label className="input-label">Land</label>
            <select className="input-field" value={billing.country} onChange={e => setBilling(b=>({...b,country:e.target.value}))}>
              {["Nederland","België","Duitsland","Frankrijk","Luxemburg"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="input-group"><label className="input-label">BTW nummer</label><input className="input-field" placeholder="BTW nummer" value={billing.vat} onChange={e => setBilling(b=>({...b,vat:e.target.value}))} /></div>
          <button className="btn-navy" style={{ padding:"0.75rem 2rem", marginTop:"0.5rem" }} onClick={() => alert("POC: gegevens opgeslagen")}>Opslaan</button>
        </>
      )}

      {tab === "facturen" && (
        <div>
          {MOCK_INVOICES.map((inv, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"1rem", border:`1px solid ${C.gray200}`, borderRadius:6, padding:"0.875rem 1.25rem", marginBottom:"0.5rem" }}>
              <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray500, width:90, flexShrink:0 }}>{inv.date}</div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v10m0 0l-3-3m3 3l3-3M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke={C.gray500} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.navy, flex:1 }}>Factuur</div>
              <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color: inv.status==="Aankomend" ? "#1A3A7A" : C.gray500, width:90 }}>{inv.status}</div>
              <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", fontWeight:600, color:C.navy, width:70, textAlign:"right" }}>{inv.amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Gebruikers sectie ───────────────────────────────────────────────────────
const MOCK_USERS = [
  { email:"demo@aegon.com",                      role:"Admin",  pending:false },
  { email:"jan.de.vries@aegon.com",              role:"Lezer",  pending:false },
  { email:"sophie.bakker@aegon.com",             role:"Lezer",  pending:false },
  { email:"thomas.smit@aegon.com",               role:"Lezer",  pending:false },
  { email:"anna.visser@aegon.com",               role:"Lezer",  pending:false },
  { email:"dirkjan.brummelman@aegon.com",        role:"Lezer",  pending:true  },
]
const MAX_SEATS = 16

function GebruikersSection({ planType }) {
  const isBusiness = planType === "business"
  const [users, setUsers]       = useState(MOCK_USERS)
  const [showModal, setShowModal] = useState(false)
  const [inviteInput, setInviteInput] = useState("")
  const [inviteList, setInviteList]   = useState([])
  const [openMenu, setOpenMenu] = useState(null)

  // Upsell variant voor persoonlijk abonnement
  if (!isBusiness) {
    return (
      <div style={{ background:C.white, borderRadius:10, padding:"1.75rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)" }}>
        <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.375rem", fontWeight:800, color:C.navy, marginBottom:"1.5rem" }}>Gebruikers uitnodigen</h2>
        <div style={{ background:"#EEF4FF", border:`1px solid #C3D4F5`, borderRadius:10, padding:"1.75rem 2rem", display:"flex", alignItems:"center", gap:"2rem", position:"relative", overflow:"hidden" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"1.125rem", color:C.navy, marginBottom:"0.5rem" }}>Nodig collega's uit</div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray700, lineHeight:"var(--lh-body)", marginBottom:"1.25rem" }}>
              Je hebt momenteel een individueel abonnement. Wil je gebruikers uitnodigen? Stap dan over naar een Business-account.
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
              <button className="btn-primary" style={{ padding:"0.625rem 1.5rem" }} onClick={() => alert("POC: upgrade naar Business flow")}>
                Upgrade naar Business
              </button>
              <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500 }}>Vanaf €33,–</span>
            </div>
          </div>
          <div style={{ position:"relative", flexShrink:0, width:180, height:100 }}>
            <div style={{ display:"flex", gap:"-0.5rem" }}>
              {["#E8B4B8","#B4C8E8","#B4E8C8"].map((bg, i) => (
                <div key={i} style={{ width:44, height:44, borderRadius:"50%", background:bg, border:`2px solid ${C.white}`, marginLeft: i>0 ? -10 : 0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.8rem", color:C.navy }}>
                  {["JV","SB","TS"][i]}
                </div>
              ))}
            </div>
            <div style={{ position:"absolute", top:-10, right:-10, width:90, height:90, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, color:C.white, lineHeight:1.3, padding:"0.5rem" }}>
              Nu<br/>6 maanden<br/>gratis
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Business admin variant
  function addInviteEmail(e) {
    if (e.key === "Enter" && inviteInput.trim()) {
      const email = inviteInput.trim()
      if (email.includes("@") && !inviteList.includes(email)) {
        setInviteList(prev => [...prev, email])
      }
      setInviteInput("")
    }
  }

  function removeInviteEmail(email) {
    setInviteList(prev => prev.filter(e => e !== email))
  }

  function sendInvites() {
    if (inviteList.length === 0) return
    const newUsers = inviteList.map(email => ({ email, role:"Lezer", pending:true }))
    setUsers(prev => [...prev, ...newUsers])
    setInviteList([])
    setInviteInput("")
    setShowModal(false)
  }

  function changeRole(email, newRole) {
    setUsers(prev => prev.map(u => u.email === email ? {...u, role:newRole} : u))
  }

  function removeUser(email) {
    setUsers(prev => prev.filter(u => u.email !== email))
    setOpenMenu(null)
  }

  return (
    <div style={{ background:C.white, borderRadius:10, padding:"1.75rem", boxShadow:"0 2px 16px rgba(12,24,46,0.06)" }}>
      <h2 style={{ fontFamily:"var(--font-sans)", fontSize:"1.375rem", fontWeight:800, color:C.navy, marginBottom:"0.375rem" }}>Gebruikers uitnodigen</h2>
      <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.gray500, lineHeight:"var(--lh-body)", marginBottom:"1.5rem", maxWidth:680 }}>
        Met de corporate licentie van uw organisatie profiteert u niet alleen van alle voordelen die Investment Officer biedt, maar kunnen ook uw collega's hier zonder beperkingen of extra kosten gebruik van maken.
      </p>

      {/* Gebruikers card */}
      <div style={{ border:`1px solid ${C.gray200}`, borderRadius:8 }}>
        {/* Card header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.25rem", borderBottom:`1px solid ${C.gray100}` }}>
          <span style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"1rem", color:C.navy }}>Gebruikers</span>
          <button onClick={() => setShowModal(true)}
            style={{ background:C.navy, color:C.white, border:"none", borderRadius:6, padding:"0.5rem 1.125rem", fontFamily:"var(--font-sans)", fontSize:"0.875rem", fontWeight:600, cursor:"pointer" }}>
            Gebruiker uitnodigen
          </button>
        </div>

        {/* Users header row */}
        <div style={{ background:C.gray50, padding:"0.875rem 1.25rem", display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:`1px solid ${C.gray100}` }}>
          <div>
            <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9rem", color:C.navy }}>Users</div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8rem", color:C.gray500, marginTop:"0.2rem" }}>Alle seats krijgen automatisch toegang tot de landen waarvoor je bent aangemeld</div>
          </div>
          <div style={{ textAlign:"right", flexShrink:0, marginLeft:"1rem" }}>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:C.gray500 }}>Users</div>
            <div style={{ fontFamily:"var(--font-sans)", fontSize:"1.25rem", fontWeight:800, color:C.navy }}>{users.length}/{MAX_SEATS}</div>
          </div>
        </div>

        {/* User rows */}
        {users.map((u, i) => {
          const ini = u.email[0].toUpperCase()
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.875rem", padding:"0.875rem 1.25rem", borderBottom: i < users.length-1 ? `1px solid ${C.gray100}` : "none", position:"relative" }}>
              {/* Avatar */}
              <div style={{ width:36, height:36, borderRadius:"50%", background: u.pending ? C.gray200 : C.red, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.875rem", color: u.pending ? C.gray500 : C.white, flexShrink:0 }}>
                {ini}
              </div>

              {/* Email + pending */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{u.email}</div>
                {u.pending && <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:C.gray500, marginTop:"0.15rem" }}>Nog niet geaccepteerd</div>}
              </div>

              {/* Role dropdown */}
              <div style={{ position:"relative" }}>
                <select value={u.role} onChange={e => changeRole(u.email, e.target.value)}
                  disabled={u.role === "Admin"}
                  style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.navy, border:`1px solid ${C.gray200}`, borderRadius:4, padding:"0.3rem 1.75rem 0.3rem 0.625rem", background:C.white, cursor: u.role==="Admin" ? "default" : "pointer", appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238A8A82' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 0.5rem center" }}>
                  <option>Admin</option>
                  <option>Lezer</option>
                </select>
              </div>

              {/* ··· menu */}
              <div style={{ position:"relative" }}>
                <button onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  style={{ background:"none", border:"none", cursor:"pointer", color:C.gray500, fontSize:"1.25rem", lineHeight:1, padding:"0.25rem 0.5rem", borderRadius:4 }}>
                  ···
                </button>
                {openMenu === i && (
                  <div style={{ position:"absolute", right:0, top:"calc(100% + 4px)", background:C.white, border:`1px solid ${C.gray200}`, borderRadius:6, boxShadow:"0 4px 16px rgba(12,24,46,0.12)", zIndex:10, minWidth:140 }}>
                    <button onClick={() => removeUser(u.email)}
                      style={{ display:"block", width:"100%", textAlign:"left", padding:"0.625rem 1rem", fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.red, background:"none", border:"none", cursor:"pointer" }}>
                      Verwijderen
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Invite modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth:560 }}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Nieuwe gebruiker uitnodigen</div>
                <div className="modal-subtitle">Uitgenodigde gebruikers ontvangen een email</div>
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {/* Email tag input */}
              <div style={{ border:`1.5px solid ${C.gray300}`, borderRadius:6, padding:"0.625rem 0.875rem", minHeight:80, cursor:"text" }}
                onClick={() => document.getElementById("invite-input").focus()}>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:C.gray500, marginBottom:"0.375rem" }}>Voeg gebruikers toe aan jouw organisatie</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.375rem", alignItems:"center" }}>
                  {inviteList.map(email => (
                    <span key={email} style={{ display:"inline-flex", alignItems:"center", gap:"0.375rem", background:C.gray100, border:`1px solid ${C.gray200}`, borderRadius:4, padding:"0.2rem 0.5rem", fontFamily:"var(--font-sans)", fontSize:"0.8125rem", color:C.navy }}>
                      {email}
                      <button onClick={() => removeInviteEmail(email)} style={{ background:"none", border:"none", cursor:"pointer", color:C.gray500, lineHeight:1, fontSize:"1rem", padding:0 }}>×</button>
                    </span>
                  ))}
                  <input id="invite-input" value={inviteInput} onChange={e => setInviteInput(e.target.value)} onKeyDown={addInviteEmail}
                    placeholder={inviteList.length === 0 ? "E-mailadres" : ""}
                    style={{ border:"none", outline:"none", fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.navy, minWidth:180, flex:1, background:"transparent" }} />
                </div>
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.8rem", color:C.gray500, marginTop:"0.5rem", marginBottom:"1.5rem" }}>
                Druk op Enter om een e-mailadres toe te voegen. Je kunt meerdere adressen toevoegen.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
                <button className="btn-secondary" style={{ width:"100%" }} onClick={() => { setShowModal(false); setInviteList([]); setInviteInput("") }}>Annuleer</button>
                <button onClick={sendInvites} disabled={inviteList.length === 0}
                  style={{ background: inviteList.length > 0 ? C.navy : C.gray200, color: inviteList.length > 0 ? C.white : C.gray500, border:"none", borderRadius:4, padding:"0.75rem", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9375rem", cursor: inviteList.length > 0 ? "pointer" : "not-allowed", transition:"background 0.2s" }}>
                  Uitnodiging sturen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main AccountPage ─────────────────────────────────────────────────────────
export default function AccountPage({ user, planType, onBack }) {
  const [section, setSection] = useState("account")
  const [currentUser, setCurrentUser] = useState(user)

  const ini = initials(currentUser.firstName, currentUser.lastName)

  return (
    <div style={{ minHeight:"100vh", background:C.gray50 }}>
      <AccountTopNav firstName={currentUser.firstName} lastName={currentUser.lastName} onBack={onBack} />

      {/* Welkom header */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"2rem 1.5rem 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2rem" }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"1rem", color:C.white, flexShrink:0 }}>
            {ini}
          </div>
          <h1 style={{ fontFamily:"var(--font-sans)", fontSize:"1.75rem", fontWeight:800, color:C.navy, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)" }}>
            Welkom {currentUser.firstName}
          </h1>
        </div>

        {/* Layout */}
        <div style={{ display:"flex", gap:"1.5rem", alignItems:"flex-start", paddingBottom:"4rem" }}>
          <Sidebar active={section} onNav={setSection} firstName={currentUser.firstName} lastName={currentUser.lastName} />
          <div style={{ flex:1, minWidth:0 }}>
            {section === "account"      && <AccountSection user={currentUser} onUpdate={setCurrentUser} />}
            {section === "nieuwsbrief"  && <NewsletterSection />}
            {section === "abonnementen" && <AbonnementenSection planType={planType} />}
            {section === "gebruikers"   && <GebruikersSection planType={planType} />}
            {section === "facturatie"   && <FacturatieSection />}
          </div>
        </div>
      </div>
    </div>
  )
}
