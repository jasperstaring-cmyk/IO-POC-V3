import { useState } from 'react'
import './styles/global.css'

import ArticlePage        from './pages/ArticlePage.jsx'
import SubscriptionPage   from './pages/SubscriptionPage.jsx'
import AccountTypeChoice  from './flows/AccountTypeChoice.jsx'
import PersonalFlow       from './flows/PersonalFlow.jsx'
import BusinessFlow       from './flows/BusinessFlow.jsx'
import LoginModal         from './flows/LoginModal.jsx'

/**
 * Global app state lives here. App.jsx is intentionally thin —
 * it only handles top-level routing and passes callbacks down.
 *
 * Views:
 *  "article"       – Article page with paywall
 *  "subscriptions" – Subscription overview page
 *  "choice"        – Personal vs Business split screen
 *  "personal"      – Module 3A personal registration
 *  "business"      – Module 3B business registration
 */
export default function App() {
  const [view, setView]           = useState("article")
  const [modal, setModal]         = useState(null)      // null | "login"
  const [loggedIn, setLoggedIn]   = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [selectedPlan, setSelectedPlan] = useState(null)

  function handleLoginSuccess(email) {
    setLoggedIn(true)
    setUserEmail(email)
  }

  function handleLogout() {
    setLoggedIn(false)
    setUserEmail("")
    setView("article")
  }

  /**
   * Entry point for all registration triggers.
   * "business"         → skip choice screen, go straight to BusinessFlow
   * "personal_<planId>"→ skip choice screen, go straight to PersonalFlow with plan pre-selected
   * default            → show AccountTypeChoice first
   */
  function handleStartReg(trigger) {
    if (trigger === "business") {
      setSelectedPlan(null)
      setView("business")
    } else if (trigger && trigger.startsWith("personal_")) {
      const planId = trigger.replace("personal_", "")
      setSelectedPlan(planId === "check" ? null : planId)
      setView("personal")
    } else {
      setSelectedPlan(null)
      setView("choice")
    }
  }

  function handleAccountTypeChoice(type) {
    setView(type === "business" ? "business" : "personal")
  }

  function handleRegComplete() {
    setLoggedIn(true)
    setUserEmail("nieuw@example.com")
    setView("article")
  }

  function handleBackToSubscriptions() {
    setView("subscriptions")
  }

  function handleGoLogin() {
    setView("article")
    setModal("login")
  }

  return (
    <>
      {view === "article" && (
        <ArticlePage
          loggedIn={loggedIn}
          userEmail={userEmail}
          onLogin={() => setModal("login")}
          onSubscribe={() => setView("subscriptions")}
          onLogout={handleLogout}
        />
      )}

      {view === "subscriptions" && (
        <SubscriptionPage
          onStartReg={handleStartReg}
          onLogin={() => setModal("login")}
        />
      )}

      {view === "choice" && (
        <AccountTypeChoice
          onChoose={handleAccountTypeChoice}
          onBack={() => setView("subscriptions")}
        />
      )}

      {view === "personal" && (
        <PersonalFlow
          selectedPlan={selectedPlan}
          onComplete={handleRegComplete}
          onBack={handleBackToSubscriptions}
          onGoLogin={handleGoLogin}
        />
      )}

      {view === "business" && (
        <BusinessFlow
          onComplete={handleRegComplete}
          onBack={handleBackToSubscriptions}
          onGoLogin={handleGoLogin}
        />
      )}

      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onGoRegister={() => { setModal(null); setView("choice") }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  )
}
