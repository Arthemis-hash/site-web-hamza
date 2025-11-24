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

function App() {
  return (
    <AuthProvider>f
      <BookingProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
            </Routes>
          </Layout>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;