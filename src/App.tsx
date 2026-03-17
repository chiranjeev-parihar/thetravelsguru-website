import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Packages } from './pages/Packages';
import { PackageDetail } from './pages/PackageDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminRoute } from './pages/AdminRoute';
import { InquiryForm } from './pages/InquiryForm';  // ✅ standalone shareable form

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ── Standalone inquiry form — no navbar/footer, shareable link ──
            URL: yoursite.com/#/inquiry
            Share this with customers via WhatsApp, QR code, email etc.
        ─────────────────────────────────────────────────────────────── */}
        <Route path="/inquiry" element={<InquiryForm />} />

        {/* ── Hidden admin panel — yoursite.com/#/admin ── */}
        <Route path="/admin" element={<AdminRoute />} />

        {/* ── Public website (wrapped in Layout) ── */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/package/:id" element={<PackageDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />

      </Routes>
    </Router>
  );
};

export default App;
