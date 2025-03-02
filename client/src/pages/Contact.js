import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Helmet } from 'react-helmet';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ContactPageContainer = styled.main`
  padding-top: 60px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.85)),
              url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000') center/cover no-repeat;
  padding: 5rem 5%;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  max-width: 850px;
  margin: 0 auto 2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ContactSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.colors.lightBg};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  height: fit-content;
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.8rem;
  gap: 1.2rem;
  color: ${props => props.theme.colors.text};

  svg {
    color: ${props => props.theme.colors.accent};
    font-size: 1.6rem;
    flex-shrink: 0;
    margin-top: 3px;
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

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
`;

const InfoText = styled.p`
  line-height: 1.6;
  font-size: 1.05rem;
`;

const WorkHours = styled.span`
  font-weight: 700;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
  }
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
  
  ${props => props.error && `
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  `}
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
  
  ${props => props.error && `
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  `}
`;

const OptionalText = styled.span`
  font-size: 0.85rem;
  color: #718096;
  margin-top: 0.3rem;
  font-style: italic;
`;

const SubmitButton = styled(motion.button)`
  background-color: #0039b3;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0044cc;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.span`
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    font-size: 1rem;
  }
`;

const FormFeedback = styled(motion.div)`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  ${props => props.success && `
    background-color: #c6f6d5;
    color: #2f855a;
  `}
  
  ${props => props.error && `
    background-color: #fed7d7;
    color: #c53030;
  `}
  
  svg {
    font-size: 1.25rem;
  }
`;

// Harita bölümünü düzenlenmiş hali
const MapSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.colors.lightBg};
`;

const MapTitle = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 2.4rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
  }
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
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

const ContactPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const position = [41.0082, 28.9784]; // Istanbul coordinates
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fix map size issues when map is loaded
  useEffect(() => {
    if (mapInstance) {
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);
    }
  }, [mapInstance, mapLoaded]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad alanı zorunludur';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (formData.phone && !/^[0-9\s\-+]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj alanı zorunludur';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setFormStatus({
        type: 'success',
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <ContactPageContainer>
      <Helmet>
        <title>İletişim | Taş Hukuk Bürosu</title>
        <meta name="description" content="Taş Hukuk Bürosu ile iletişime geçin. Adres, telefon ve e-posta bilgilerimiz ile size en kısa sürede yardımcı olalım." />
      </Helmet>
      
      <HeroSection>
        <HeroTitle>Bize Ulaşın</HeroTitle>
        <HeroSubtitle>
          Hukuki konularınızda profesyonel destek almak, danışmanlık hizmetlerimizden faydalanmak veya merak ettiklerinizi sormak için bizimle iletişime geçebilirsiniz. En kısa sürede size dönüş sağlayacağız.
        </HeroSubtitle>
      </HeroSection>
      
      <ContactSection>
        <Container>
          <ContactGrid>
            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <InfoTitle>Bize Ulaşın</InfoTitle>
              
              <InfoItem>
                <LocationOnIcon aria-hidden="true" />
                <InfoContent>
                  <InfoLabel>Adres</InfoLabel>
                  <InfoText>Levent Mah. Büyükdere Cad. No:123 Şişli/İstanbul</InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <PhoneIcon aria-hidden="true" />
                <InfoContent>
                  <InfoLabel>Telefon</InfoLabel>
                  <InfoText>
                    <a href="tel:+902125550000" aria-label="Telefon numarası">
                      +90 (212) 555 0000
                    </a>
                  </InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <EmailIcon aria-hidden="true" />
                <InfoContent>
                  <InfoLabel>E-posta</InfoLabel>
                  <InfoText>
                    <a href="mailto:info@tashukuk.com" aria-label="E-posta adresi">
                      info@tashukuk.com
                    </a>
                  </InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <AccessTimeIcon aria-hidden="true" />
                <InfoContent>
                  <InfoLabel>Çalışma Saatleri</InfoLabel>
                  <InfoText>
                    <WorkHours>Pazartesi - Cuma:</WorkHours> 09:00 - 18:00<br />
                    <WorkHours>Cumartesi:</WorkHours> 10:00 - 14:00<br />
                    <WorkHours>Pazar:</WorkHours> Kapalı
                  </InfoText>
                </InfoContent>
              </InfoItem>
            </ContactInfoCard>
            
            <ContactForm
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              role="form"
              aria-label="İletişim Formu"
            >
              <FormTitle>İletişim Formu</FormTitle>
              
              {formStatus && (
                <FormFeedback
                  success={formStatus.type === 'success'}
                  error={formStatus.type === 'error'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {formStatus.type === 'success' ? (
                    <CheckCircleIcon aria-hidden="true" />
                  ) : (
                    <ErrorIcon aria-hidden="true" />
                  )}
                  {formStatus.message}
                </FormFeedback>
              )}
              
              <FormGroup>
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  aria-required="true"
                  placeholder="Adınız ve soyadınız"
                />
                {errors.name && (
                  <ErrorMessage>
                    <ErrorIcon fontSize="small" />
                    {errors.name}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">E-posta *</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  aria-required="true"
                  placeholder="E-posta adresiniz"
                />
                {errors.email && (
                  <ErrorMessage>
                    <ErrorIcon fontSize="small" />
                    {errors.email}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Telefon</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Telefon numaranız"
                />
                <OptionalText>Telefon numaranız opsiyoneldir ancak ek bilgi paylaşmak isterseniz girebilirsiniz.</OptionalText>
                {errors.phone && (
                  <ErrorMessage>
                    <ErrorIcon fontSize="small" />
                    {errors.phone}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Mesajınız *</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  aria-required="true"
                  placeholder="Sorularınızı veya almak istediğiniz hukuki hizmeti buraya yazabilirsiniz."
                />
                {errors.message && (
                  <ErrorMessage>
                    <ErrorIcon fontSize="small" />
                    {errors.message}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <SubmitButton 
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </SubmitButton>
            </ContactForm>
          </ContactGrid>
        </Container>
      </ContactSection>
      
      <MapSection>
        <MapTitle>Ofisimiz Nerede?</MapTitle>
        <MapWrapper aria-label="Ofis konumu haritası">
          {!mapLoaded && (
            <MapLoader>
              Harita yükleniyor...
            </MapLoader>
          )}
          {typeof window !== 'undefined' && (
            <StyledMapContainer 
              center={position} 
              zoom={14} 
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
                  <strong>Taş Hukuk Bürosu</strong><br />
                  Levent Mah. Büyükdere Cad. No:123<br />
                  Şişli/İstanbul
                </Popup>
              </Marker>
            </StyledMapContainer>
          )}
        </MapWrapper>
      </MapSection>
    </ContactPageContainer>
  );
};

export default ContactPage; 