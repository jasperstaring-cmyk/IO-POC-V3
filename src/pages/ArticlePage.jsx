import { C } from '../tokens.js'
import TopNav from '../components/TopNav.jsx'

function ArticleImage() {
  return (
    <div style={{ width:"100%", height:320, borderRadius:4, background:"linear-gradient(135deg, #1a1a2e 0%, #2d3561 40%, #c84b31 100%)", position:"relative", overflow:"hidden", marginBottom:"1.25rem" }}>
      {[{left:"12%",top:"18%",rot:-12,bg:"#1434CB"},{left:"28%",top:"28%",rot:5,bg:"#FFB800"},{left:"48%",top:"12%",rot:-6,bg:"#EB001B"},{left:"60%",top:"34%",rot:15,bg:"#0066B2"},{left:"72%",top:"20%",rot:-3,bg:"#252525"}].map((c,i) => (
        <div key={i} style={{ position:"absolute", left:c.left, top:c.top, width:130, height:82, background:c.bg, borderRadius:8, transform:`rotate(${c.rot}deg)`, opacity:0.85, boxShadow:"0 4px 16px rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ position:"absolute", bottom:10, left:12, width:"60%", height:6, background:"rgba(255,255,255,0.3)", borderRadius:3 }}/>
          <div style={{ position:"absolute", top:10, right:12, width:28, height:18, background:"rgba(255,255,255,0.25)", borderRadius:3 }}/>
        </div>
      ))}
      <span className="premium-badge">Premium</span>
    </div>
  )
}

function PaywallBlock({ onLogin, onSubscribe }) {
  return (
    <div className="paywall-card" style={{ marginTop:"2rem", border:`1px solid ${C.gray100}`, borderRadius:8, padding:"2rem", background:C.white, boxShadow:"0 2px 16px rgba(12,24,46,0.07)", position:"relative", overflow:"visible" }}>
      <div className="good-news-badge">Gratis toegang<br/>voor Wealth<br/>professionals</div>
      <div style={{ display:"flex", gap:"1.25rem", alignItems:"flex-start", marginBottom:"1.5rem" }}>
        <div style={{ width:64, height:48, flexShrink:0, background:C.gray100, borderRadius:4, overflow:"hidden", border:`1px solid ${C.gray300}` }}>
          <div style={{ height:20, background:`linear-gradient(90deg,${C.navy},${C.navyMid})` }}/>
          <div style={{ padding:"4px 6px" }}>{[40,60,50].map((w,i) => <div key={i} style={{ height:3, width:`${w}%`, background:C.gray300, borderRadius:2, marginBottom:3 }}/>)}</div>
        </div>
        <div>
          <h3 style={{ fontFamily:"var(--font-sans)", fontSize:"1.1875rem", fontWeight:800, lineHeight:"var(--lh-heading)", letterSpacing:"var(--tracking-heading)", color:C.navy, marginBottom:"0.375rem" }}>Lees verder met Investment Officer</h3>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500, lineHeight:"var(--lh-body)" }}>Dit artikel is onderdeel van onze premium content.<br/>Afhankelijk van je sector en organisatie heb je mogelijk gratis toegang.</p>
        </div>
      </div>
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.75rem", flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={onLogin}>Check jouw toegang</button>
        <button className="btn-secondary" onClick={onSubscribe}>Bekijk abonnementen</button>
      </div>
      {["Onbeperkt online toegang tot alle premium artikelen","Toegang tot research databases en marktrapporten","Toegang tot alle artikelen van onze experts","Dagelijkse nieuwsbrief en Research Bulletin"].map((b,i) => (
        <div key={i} className="checkmark-item">
          <div className="checkmark-icon">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke={C.navy} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span>{b}</span>
        </div>
      ))}
    </div>
  )
}

export default function ArticlePage({ loggedIn, userEmail, onLogin, onSubscribe, onLogout }) {
  return (
    <div style={{ minHeight:"100vh", background:C.white }}>
      <TopNav onLogin={onLogin} onSubscribe={onSubscribe} loggedIn={loggedIn} userEmail={userEmail} onLogout={onLogout} />
      <div style={{ background:C.navy, color:C.white, padding:"0.5rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"1.5rem", fontFamily:"var(--font-sans)", fontSize:"0.8125rem" }}>
        <span style={{ opacity:0.6 }}>POC Demo →</span>
        <button onClick={onLogin} style={{ background:"rgba(255,255,255,0.12)", border:"none", color:C.white, padding:"0.3rem 0.875rem", borderRadius:4, cursor:"pointer", fontSize:"0.8125rem", fontFamily:"var(--font-sans)" }}>Inloggen</button>
        <button onClick={onSubscribe} style={{ background:"rgba(255,255,255,0.12)", border:"none", color:C.white, padding:"0.3rem 0.875rem", borderRadius:4, cursor:"pointer", fontSize:"0.8125rem", fontFamily:"var(--font-sans)" }}>Registreren / Abonneren</button>
        {loggedIn && <button onClick={onLogout} style={{ background:"rgba(255,255,255,0.12)", border:"none", color:C.white, padding:"0.3rem 0.875rem", borderRadius:4, cursor:"pointer", fontSize:"0.8125rem", fontFamily:"var(--font-sans)" }}>↩ Reset</button>}
      </div>
      <main style={{ maxWidth:720, margin:"0 auto", padding:"2.5rem 1.5rem 4rem" }}>
        <span className="category-label">Beleggen</span>
        <h1 className="article-title">Trump zet met renteplafond op creditcards bankaandelen onder druk</h1>
        <ArticleImage />
        {loggedIn ? (
          <>
            <div className="article-body">
              <p>De oproep van president Donald Trump om de rente op Amerikaanse creditcards te maximeren op 10 procent zet bankaandelen onder druk.</p>
              <p>Analisten van grote Europese vermogensbeheerders reageren verdeeld. Enerzijds zien zij risico's voor de winstmarges; anderzijds wijzen zij erop dat een dergelijk plafond politiek bijzonder moeilijk door te voeren valt.</p>
              <p>Goldman Sachs-analisten schatten dat een effectief renteplafond de netto rentemarge van grote Amerikaanse retailbanken met 80 tot 120 basispunten zou kunnen drukken.</p>
              <p>Tegelijkertijd benadrukken Europese beheerders dat het voorstel eerder als politiek signaal moet worden gelezen dan als concrete beleidsmaatregel.</p>
              <p>Voor portefeuillebeheerders die overwogen zijn in Amerikaanse financials blijft het sentiment nerveus. De onzekerheid over de regelgevende koers weegt zwaarder dan de directe impact van dit voorstel.</p>
            </div>
            <div style={{ marginTop:"2rem", padding:"1.25rem 1.5rem", background:"#EDFBF4", borderRadius:8, borderLeft:`4px solid ${C.green}`, display:"flex", alignItems:"center", gap:"0.875rem" }}>
              <div style={{ width:20, height:20, background:C.green, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke={C.navy} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"0.9rem", color:C.navy }}>Ingelogd als {userEmail}</div>
                <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", color:C.gray500 }}>U heeft toegang via uw organisatieabonnement.</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ position:"relative" }}>
              <div className="article-body">
                <p>De oproep van president Donald Trump om de rente op Amerikaanse creditcards te maximeren op 10 procent zet bankaandelen onder druk.</p>
                <p>Analisten van grote Europese vermogensbeheerders reageren verdeeld. Enerzijds zien zij risico's voor de winstmarges van Amerikaanse banken; anderzijds wijzen zij erop dat een dergelijk plafond politiek bijzonder moeilijk door te voeren valt.</p>
              </div>
              <div className="fade-overlay" />
            </div>
            <PaywallBlock onLogin={onLogin} onSubscribe={onSubscribe} />
          </>
        )}
      </main>
    </div>
  )
}
