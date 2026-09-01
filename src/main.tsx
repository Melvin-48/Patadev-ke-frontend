import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'

// ============================================================
// PATADEV DEV ADMIN BYPASS
// Development shortcut only.
// Remove this block before production deployment.
// ============================================================
if (import.meta.env.DEV) {
  const devAdminUser = {
    id: 'admin-001',
    email: 'admin@patadev.co.ke',
    role: 'ADMIN',
    name: 'PataDev Administrator',
  };

  localStorage.setItem(
    'patadev_user',
    JSON.stringify(devAdminUser)
  );
}

// PATADEV DEV ADMIN BYPASS END
// ============================================================


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

