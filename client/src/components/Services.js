import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.colors.lightBg};
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 1.5rem;
  
  svg {
    width: 60px;
    height: 60px;
    color: ${props => props.theme.colors.accent};
  }
`;

const ServiceTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.primary};
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const LearnMoreLink = styled.span`
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  display: inline-block;
  margin-top: auto;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width 0.3s ease;
  }
  
  ${ServiceCard}:hover &::after {
    width: 100%;
  }
`;

const ViewAllButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const ViewAllButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// SVG İkonları
const LegalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const FamilyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CriminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Services = () => {
  const services = [
    {
      title: "Ticaret Hukuku",
      description: "Şirketlerin kuruluş, birleşme, devralma ve ticari uyuşmazlıklarında profesyonel hukuki danışmanlık.",
      icon: <LegalIcon />,
      path: "/hizmetler/ticaret-hukuku"
    },
    {
      title: "Aile Hukuku",
      description: "Boşanma, nafaka, velayet ve miras davalarında uzman kadromuzla yanınızdayız.",
      icon: <FamilyIcon />,
      path: "/hizmetler/aile-hukuku"
    },
    {
      title: "Ceza Hukuku",
      description: "Ceza davalarında savunma, itiraz ve temyiz süreçlerinde profesyonel hukuki destek.",
      icon: <CriminalIcon />,
      path: "/hizmetler/ceza-hukuku"
    }
  ];

  return (
    <ServicesSection id="hizmetler">
      <Container>
        <SectionTitle>Hizmetlerimiz</SectionTitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <Link to={service.path} key={index} style={{ textDecoration: 'none' }}>
              <ServiceCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </div>
                <LearnMoreLink>Detaylı Bilgi</LearnMoreLink>
              </ServiceCard>
            </Link>
          ))}
        </ServicesGrid>
        <ViewAllButtonContainer>
          <Link to="/hizmetler" style={{ textDecoration: 'none' }}>
            <ViewAllButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tüm Hizmetleri Gör
            </ViewAllButton>
          </Link>
        </ViewAllButtonContainer>
      </Container>
    </ServicesSection>
  );
};

export default Services;