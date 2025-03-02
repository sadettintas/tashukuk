import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import L from 'leaflet';
import { useState, useEffect } from 'react';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ContactSection = styled.section`
  padding: 5rem 5%;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  color: ${props => props.theme.colors.primary};

  svg {
    color: ${props => props.theme.colors.accent};
    font-size: 1.5rem;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: ${props => props.theme.colors.lightBg};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
`;

const MapLoader = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.lightBg};
  border-radius: 8px;
`;

// Styled component for the map container
const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  
  .leaflet-control-zoom {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    border-radius: 4px !important;
    color: ${props => props.theme.colors.primary} !important;
  }
`;

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const position = [41.0082, 28.9784]; // Istanbul coordinates

  // Fix map size issues when map is loaded
  useEffect(() => {
    if (mapInstance) {
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);
    }
  }, [mapInstance, mapLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Form submission logic would go here
    console.log(Object.fromEntries(formData));
    
    // Show success message (in a real app, this would happen after API response)
    alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
    e.target.reset();
  };

  return (
    <ContactSection id="iletisim" role="region" aria-label="İletişim Formu ve Harita">
      <Container>
        <SectionTitle>İletişim</SectionTitle>
        <ContactGrid>
          <div>
            <ContactInfo role="complementary" aria-label="İletişim Bilgileri">
              <InfoItem>
                <LocationOnIcon aria-hidden="true" />
                <p>Levent Mah. Büyükdere Cad. No:123 Şişli/İstanbul</p>
              </InfoItem>
              <InfoItem>
                <PhoneIcon aria-hidden="true" />
                <p>
                  <a href="tel:+902125550000" aria-label="Telefon numarası">
                    +90 (212) 555 0000
                  </a>
                </p>
              </InfoItem>
              <InfoItem>
                <EmailIcon aria-hidden="true" />
                <p>
                  <a href="mailto:info@tashukuk.com" aria-label="E-posta adresi">
                    info@tashukuk.com
                  </a>
                </p>
              </InfoItem>
            </ContactInfo>
            <MapWrapper aria-label="Ofis konumu haritası">
              {!mapLoaded && (
                <MapLoader>
                  Harita yükleniyor...
                </MapLoader>
              )}
              {typeof window !== 'undefined' && (
                <StyledMapContainer 
                  center={position} 
                  zoom={13} 
                  scrollWheelZoom={false}
                  whenReady={(map) => {
                    setMapLoaded(true);
                    setMapInstance(map.target);
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={position}>
                    <Popup>
                      Taş Hukuk Bürosu<br />
                      Levent Mah. Büyükdere Cad. No:123
                    </Popup>
                  </Marker>
                </StyledMapContainer>
              )}
            </MapWrapper>
          </div>
          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            role="form"
            aria-label="İletişim Formu"
          >
            <FormGroup>
              <Label htmlFor="name">Ad Soyad</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                required 
                aria-required="true"
                placeholder="Adınız ve soyadınız"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">E-posta</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                required 
                aria-required="true"
                placeholder="E-posta adresiniz"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Telefon</Label>
              <Input 
                type="tel" 
                id="phone" 
                name="phone" 
                required 
                aria-required="true"
                pattern="[0-9\s\-\+]+"
                placeholder="Telefon numaranız"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Mesajınız</Label>
              <TextArea 
                id="message" 
                name="message" 
                required 
                aria-required="true"
                placeholder="Mesajınızı buraya yazabilirsiniz..."
              />
            </FormGroup>
            <SubmitButton 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Gönder
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;