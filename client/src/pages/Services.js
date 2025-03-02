import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ServicesPageContainer = styled.main`
  padding-top: 60px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.85)),
              url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000') center/cover no-repeat;
  padding: 5rem 5%;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;

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
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ServiceCard}:hover & {
    transform: scale(1.05);
  }
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.primary};
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.lightText};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ServiceButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ServicesPage = () => {
  const services = [
    {
      id: 'ticaret-hukuku',
      title: 'Ticaret Hukuku',
      description: 'Şirketlerin kuruluş, birleşme, devralma ve ticari uyuşmazlıklarında profesyonel hukuki danışmanlık hizmetleri sunuyoruz.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800'
    },
    {
      id: 'aile-hukuku',
      title: 'Aile Hukuku',
      description: 'Boşanma, nafaka, velayet ve miras davalarında uzman kadromuzla yanınızdayız. Hassas süreçlerde güvenilir destek.',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&w=800'
    },
    {
      id: 'ceza-hukuku',
      title: 'Ceza Hukuku',
      description: 'Ceza davalarında savunma ve müdafilik hizmetleri. Adli süreçlerde profesyonel hukuki destek sağlıyoruz.',
      image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800'
    },
    {
      id: 'gayrimenkul-hukuku',
      title: 'Gayrimenkul Hukuku',
      description: 'Taşınmaz alım-satım, kira anlaşmaları ve imar hukuku konularında danışmanlık ve hukuki destek hizmetleri.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800'
    },
    {
      id: 'is-hukuku',
      title: 'İş Hukuku',
      description: 'İşçi-işveren ilişkileri, iş sözleşmeleri ve işe iade davalarında hukuki destek ve danışmanlık hizmetleri.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800'
    },
    {
      id: 'idare-hukuku',
      title: 'İdare Hukuku',
      description: 'Kamu kurumları ile ilgili hukuki süreçlerde danışmanlık ve temsil hizmetleri sunuyoruz.',
      image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?auto=format&fit=crop&w=800'
    }
  ];

  return (
    <ServicesPageContainer>
      <Helmet>
        <title>Hizmetlerimiz | Taş Hukuk Bürosu</title>
        <meta name="description" content="Taş Hukuk Bürosu olarak ticaret hukuku, aile hukuku, ceza hukuku ve daha birçok alanda profesyonel hukuki danışmanlık hizmetleri sunuyoruz." />
      </Helmet>
      
      <HeroSection>
        <HeroTitle>Hukuki Hizmetlerimiz</HeroTitle>
        <HeroSubtitle>
          Taş Hukuk Bürosu olarak, geniş bir yelpazede hukuki danışmanlık ve temsil hizmetleri sunuyoruz. 
          Uzman kadromuz ile her türlü hukuki sorununuzda yanınızdayız.
        </HeroSubtitle>
      </HeroSection>
      
      <ServicesSection>
        <Container>
          <SectionTitle>Uzmanlık Alanlarımız</SectionTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceImageContainer>
                  <ServiceImage src={service.image} alt={service.title} />
                </ServiceImageContainer>
                <ServiceContent>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceButton to={`/hizmetler/${service.id}`}>
                    Detayları Gör
                  </ServiceButton>
                </ServiceContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>
    </ServicesPageContainer>
  );
};

export default ServicesPage; 