import { C } from '../tokens.js'

// ─── EmailChip ────────────────────────────────────────────────────────────────
export function EmailChip({ email, onEdit }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:C.gray100, borderRadius:99, padding:"0.2rem 0.75rem", fontSize:"0.85rem", color:C.navy, fontWeight:500, marginBottom:"1.25rem" }}>
      {email}
      <button className="link-btn" style={{ fontSize:"0.75rem" }} onClick={onEdit}>Wijzigen</button>
    </span>
  )
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────
export function ProgressBar({ total, current }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`progress-seg${i < current ? " done" : ""}`} />
      ))}
    </div>
  )
}

// ─── SelectionRow ─────────────────────────────────────────────────────────────
export function SelectionRow({ selected, onSelect, name, desc, right }) {
  return (
    <button className={`sel-row${selected ? " selected" : ""}`} onClick={onSelect}>
      <div className={`sel-dot${selected ? " checked" : ""}`}>
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div className="sel-row-body" style={{ flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <div className="sel-row-name">{name}</div>
          {right && <div style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"1rem", color:C.navy, marginLeft:"1rem", whiteSpace:"nowrap" }}>{right}</div>}
        </div>
        {desc && <div className="sel-row-desc">{desc}</div>}
      </div>
    </button>
  )
}

// ─── CheckItem ────────────────────────────────────────────────────────────────
export function CheckItem({ children }) {
  return (
    <div className="sub-check">
      <span className="sub-check-icon">✓</span>
      <span>{children}</span>
    </div>
  )
}

// ─── BackButton ───────────────────────────────────────────────────────────────
export function BackButton({ onClick }) {
  return (
    <button className="btn-back" onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 4L6 8L10 12" stroke={C.navy} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  )
}

// ─── RegSidebar ───────────────────────────────────────────────────────────────
export function RegSidebar() {
  return (
    <>
      <div className="reg-sidebar-card">
        <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray500, marginBottom:"0.75rem" }}>
          Door een account aan te maken krijg je
        </div>
        {["Papers van marktpartijen","Research database Morningstar","Publicaties van partners","E-mail nieuwsbrieven","1 redactioneel artikel per maand"].map((b,i) => (
          <div key={i} style={{ display:"flex", gap:"0.5rem", alignItems:"flex-start", marginBottom:"0.5rem" }}>
            <span style={{ color:C.red, fontSize:"0.875rem", marginTop:1 }}>✓</span>
            <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", color:C.navy }}>{b}</span>
          </div>
        ))}
      </div>
      <div className="reg-sidebar-card" style={{ background:C.gray50 }}>
        <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.8rem", color:C.gray500 }}>
          <strong style={{ color:C.navy }}>Kom je er niet uit?</strong><br/>
          <span style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginTop:"0.5rem" }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:C.gray200, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem" }}>?</div>
            Neem contact met ons op
          </span>
        </div>
      </div>
    </>
  )
}
