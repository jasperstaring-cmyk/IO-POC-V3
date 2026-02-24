import { C } from '../tokens.js'
import TopNav from '../components/TopNav.jsx'
import { ProgressBar, RegSidebar } from '../components/shared.jsx'

export default function AccountTypeChoice({ onChoose, onBack }) {
  return (
    <div className="reg-layout">
      <TopNav onLogin={() => {}} onSubscribe={onBack} loggedIn={false} />
      <div className="reg-container">
        <div className="reg-main">
          <ProgressBar total={4} current={1} />

          <div style={{ display:"inline-block", background:C.gray100, borderRadius:99, padding:"0.2rem 0.875rem", fontFamily:"var(--font-sans)", fontSize:"0.75rem", fontWeight:700, color:C.gray500, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"1rem" }}>
            Jouw abonnement
          </div>

          <h2 className="reg-step-title">Kies voor wie je toegang wilt hebben</h2>
          <p className="reg-step-sub"> </p>

          <div className="choice-cards">
            {/* Personal */}
            <button className="choice-card" onClick={() => onChoose("personal")}>
              <div className="choice-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke={C.red} strokeWidth="1.75"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={C.red} strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="choice-label">Voor mijzelf</div>
            </button>

            {/* Business */}
            <button className="choice-card" onClick={() => onChoose("business")}>
              <div className="choice-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="3.5" stroke={C.red} strokeWidth="1.75"/>
                  <circle cx="17" cy="9" r="2.5" stroke={C.red} strokeWidth="1.5"/>
                  <path d="M2 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={C.red} strokeWidth="1.75" strokeLinecap="round"/>
                  <path d="M17 14c2 0 4 1.3 4 3.5" stroke={C.red} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="choice-label">Voor mijn team of organisatie</div>
            </button>
          </div>
        </div>

        <div className="reg-sidebar">
          <RegSidebar />
        </div>
      </div>
    </div>
  )
}
