import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import App from './App.jsx';
import Login from './Login.jsx';
import Admin from './Admin.jsx';
import VerifyPage from './componentes/verifyPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<VerifyPage><Admin /></VerifyPage>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)