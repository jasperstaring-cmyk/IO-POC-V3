import { useState } from 'react'
import { C } from '../tokens.js'
import { classifyEmailForLogin } from '../utils.js'
import IOLogo from '../components/IOLogo.jsx'
import { EmailChip } from '../components/shared.jsx'
import { GoogleIcon, MicrosoftIcon } from '../components/SsoIcons.jsx'

export default function LoginModal({ onClose, onGoRegister, onLoginSuccess }) {
  const [step, setStep]         = useState("email")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")

  function handleEmailSubmit(e) {
    e.preventDefault()
    const type = classifyEmailForLogin(email)
    if (type === "private") { setStep("private_warning"); return }
    if (type === "sso")     { setStep("sso"); return }
    if (type === "unknown") { setStep("unknown"); return }
    setStep("password")
  }

  function handleLogin(e) {
    e.preventDefault()
    onLoginSuccess(email)
    onClose()
  }

  function resetToEmail() { setStep("email") }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <IOLogo size={22} />
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">

          {/* ── Email ── */}
          {step === "email" && (
            <>
              <div className="step-indicator" style={{ marginTop:"1.25rem" }}>
                <div className="step-dot active"/><div className="step-dot"/>
              </div>
              <h2 className="modal-title">Inloggen bij Investment Officer</h2>
              <p className="modal-subtitle">Log in met je zakelijke e-mailadres.</p>
              <div className="demo-hint">
                <strong>Demo:</strong> demo@abnamro.com → SSO • demo@gmail.com → privé waarschuwing • demo@onbekend.com → geen account
              </div>
              <form onSubmit={handleEmailSubmit}>
                <div className="input-group">
                  <label className="input-label">Zakelijk e-mailadres</label>
                  <input className="input-field" type="email" placeholder="uw@bedrijf.com" value={email} onChange={e => setEmail(e.target.value)} autoFocus required />
                </div>
                <button className="btn-primary btn-full" type="submit">Verder</button>
              </form>
              <div className="divider">of log in via</div>
              <button className="sso-btn"><GoogleIcon />Inloggen met Google</button>
              <button className="sso-btn"><MicrosoftIcon />Inloggen met Microsoft</button>
              <p style={{ textAlign:"center", marginTop:"1.25rem", fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:C.gray500 }}>
                Nog geen account?{" "}<button className="link-btn" onClick={onGoRegister}>Registreer hier</button>
              </p>
            </>
          )}

          {/* ── Privé waarschuwing ── */}
          {step === "private_warning" && (
            <>
              <div style={{ marginTop:"1.25rem" }}/>
              <h2 className="modal-title">Zakelijk e-mailadres vereist</h2>
              <EmailChip email={email} onEdit={resetToEmail} />
              <div className="alert alert-warning">
                <strong>Dit lijkt een privé e-mailadres.</strong><br/>
                Voor premium toegang heeft u een zakelijk e-mailadres nodig.
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => setStep("password")}>Dit is mijn zakelijke adres, ga door</button>
                <button className="btn-secondary btn-full" onClick={resetToEmail}>Ander e-mailadres gebruiken</button>
              </div>
            </>
          )}

          {/* ── Geen account ── */}
          {step === "unknown" && (
            <>
              <div style={{ marginTop:"1.25rem" }}/>
              <h2 className="modal-title">Geen account gevonden</h2>
              <EmailChip email={email} onEdit={resetToEmail} />
              <div className="alert alert-error">We hebben geen account gevonden voor dit e-mailadres.</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                <button className="btn-primary btn-full" onClick={() => { onClose(); onGoRegister() }}>Maak een account aan</button>
                <button className="btn-secondary btn-full" onClick={resetToEmail}>Ander e-mailadres proberen</button>
              </div>
            </>
          )}

          {/* ── SSO ── */}
          {step === "sso" && (
            <>
              <div className="step-indicator" style={{ marginTop:"1.25rem" }}>
                <div className="step-dot active"/><div className="step-dot active"/>
              </div>
              <h2 className="modal-title">Inloggen via uw organisatie</h2>
              <EmailChip email={email} onEdit={resetToEmail} />
              <div className="alert alert-info">
                <strong>Uw organisatie gebruikt SSO.</strong><br/>
                Log in via het systeem van uw werkgever.
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem", marginBottom:"1.25rem" }}>
                <button className="sso-btn" onClick={handleLogin}><GoogleIcon />Doorgaan met Google (ABN AMRO)</button>
                <button className="sso-btn" onClick={handleLogin}><MicrosoftIcon />Doorgaan met Microsoft (ABN AMRO)</button>
              </div>
              <div className="divider">of log in met wachtwoord</div>
              <button className="btn-secondary btn-full" onClick={() => setStep("password")}>Inloggen met wachtwoord</button>
            </>
          )}

          {/* ── Wachtwoord ── */}
          {step === "password" && (
            <>
              <div className="step-indicator" style={{ marginTop:"1.25rem" }}>
                <div className="step-dot active"/><div className="step-dot active"/>
              </div>
              <h2 className="modal-title">Welkom terug</h2>
              <EmailChip email={email} onEdit={resetToEmail} />
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label className="input-label">Wachtwoord</label>
                  <input className="input-field" type="password" placeholder="Uw wachtwoord" value={password} onChange={e => setPassword(e.target.value)} autoFocus required />
                </div>
                <div style={{ textAlign:"right", marginBottom:"1.125rem" }}>
                  <button className="link-btn" style={{ fontSize:"0.85rem" }} type="button" onClick={() => setStep("forgot")}>Wachtwoord vergeten?</button>
                </div>
                <button className="btn-primary btn-full" type="submit">Inloggen</button>
              </form>
            </>
          )}

          {/* ── Wachtwoord vergeten ── */}
          {step === "forgot" && (
            <>
              <div style={{ marginTop:"1.25rem" }}/>
              <h2 className="modal-title">Wachtwoord vergeten</h2>
              <p className="modal-subtitle">We sturen je een herstellink.</p>
              <form onSubmit={e => { e.preventDefault(); setStep("forgot_sent") }}>
                <div className="input-group">
                  <label className="input-label">E-mailadres</label>
                  <input className="input-field" type="email" defaultValue={email} autoFocus required />
                </div>
                <button className="btn-primary btn-full" type="submit">Stuur herstelmail</button>
              </form>
              <button className="link-btn" style={{ marginTop:"1rem", display:"block", textAlign:"center", width:"100%" }} onClick={() => setStep("password")}>
                Terug naar inloggen
              </button>
            </>
          )}

          {/* ── Herstelmail verstuurd ── */}
          {step === "forgot_sent" && (
            <>
              <div style={{ textAlign:"center", marginTop:"1.75rem", marginBottom:"1.5rem" }}>
                <div style={{ width:56, height:56, background:C.green, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem" }}>
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none"><path d="M2 9L9 16L22 2" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h2 className="modal-title" style={{ textAlign:"center" }}>E-mail verstuurd</h2>
              </div>
              <div className="alert alert-success">Herstelmail gestuurd naar <strong>{email}</strong>.</div>
              <button className="btn-secondary btn-full" style={{ marginTop:"1rem" }} onClick={onClose}>Sluiten</button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
