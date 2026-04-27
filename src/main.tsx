import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'

const Admin = lazy(() => import('./pages/Admin'))
const AdminTriage = lazy(() => import('./pages/AdminTriage'))
const AdminAuditReview = lazy(() => import('./pages/AdminAuditReview'))
const Legal = lazy(() => import('./pages/Legal').then(m => ({ default: m.PrivacyPolicy })))
const Terms = lazy(() => import('./pages/Legal').then(m => ({ default: m.TermsOfService })))

const AdminFallback = <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Loading...</div>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Suspense fallback={AdminFallback}><Admin /></Suspense>} />
        <Route path="/admin/triage" element={<Suspense fallback={AdminFallback}><AdminTriage /></Suspense>} />
        <Route path="/admin/audit-review" element={<Suspense fallback={AdminFallback}><AdminAuditReview /></Suspense>} />
        <Route path="/privacy" element={<Suspense fallback={AdminFallback}><Legal /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={AdminFallback}><Terms /></Suspense>} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
