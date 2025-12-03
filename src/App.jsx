// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Booking } from './pages/Booking';
import { Profile } from './pages/Profile';
import { HowItWorks } from './pages/HowItWorks';
import { Contact } from './pages/Contact';
import { Podcast } from './pages/Podcast';
import { FAQ } from './pages/FAQ';
import { AboutUs } from './pages/AboutUs';
import { Privacy } from './pages/Privacy';
import { Cookies } from './pages/Cookies';
import { Terms } from './pages/Terms';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/como-funciona" element={<HowItWorks />} />

              {/* New Pages */}
              <Route path="/contacto" element={<Contact />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sobre-nosotros" element={<AboutUs />} />

              {/* Legal Pages */}
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/terminos" element={<Terms />} />

              {/* 404 - Redirect to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;