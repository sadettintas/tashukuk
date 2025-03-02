import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import theme from './styles/Theme';
import { GlobalStyle } from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import ServicesPage from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ContactPage from './pages/Contact';
import AboutPage from './pages/About';
import Career from './components/Career';
import CareerDetail from './components/CareerDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollRestore from './components/ScrollRestore';
import ApplicationSuccess from './components/ApplicationSuccess';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ScrollRestore />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hizmetler" element={<ServicesPage />} />
          <Route path="/hizmetler/:serviceId" element={<ServiceDetail />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/kariyer" element={<Career />} />
          <Route path="/kariyer/:positionSlug" element={<CareerDetail />} />
          <Route path="/basvuru-basarili" element={<ApplicationSuccess />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
