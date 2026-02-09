import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout, { HomePage } from './App'
import CaseStudyPage from './CaseStudyPage'
import ApproachPage from './ApproachPage'
import ContactPage from './ContactPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="approach" element={<ApproachPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="work/:slug" element={<CaseStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
