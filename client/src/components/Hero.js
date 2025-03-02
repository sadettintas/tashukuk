import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(23, 37, 84, 0.98), rgba(30, 58, 138, 0.95)),
              url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  position: relative;
  margin-top: 70px; /* Account for fixed navbar */
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 60%;
    height: 70%;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15%;
    left: -15%;
    width: 70%;
    height: 70%;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%);
    border-radius: 50%;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
`;

const HeroLeft = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const HeroRight = styled.div`
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: 1;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.2;
  font-family: ${props => props.theme.fonts.primary};
  background: linear-gradient(90deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.4rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  margin-bottom: 3.5rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.95);
  max-width: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: auto;
    margin-right: auto;
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1.2rem;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 1.4rem 3.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(37, 99, 235, 0.5);
    background-color: #2563eb;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.9);
  padding: 1.4rem 3.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    border-color: white;
  }
`;

const HeroImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 600px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover no-repeat;
    border-radius: 24px;
    z-index: 1;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    z-index: 0;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: 0.85;
  z-index: 10;
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
    animation: bounce 2s infinite;
    filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.4));
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-12px);
    }
    60% {
      transform: translateY(-6px);
    }
  }
  
  &:hover {
    opacity: 1;
  }
`;

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('hizmetler');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="anasayfa" role="banner">
      <HeroContent>
        <HeroLeft>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            role="heading"
            aria-level="1"
          >
            Hukuki Alanda Güvenilir Çözüm Ortağınız
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            25 yılı aşkın tecrübemiz ve uzman kadromuz ile sizlere en yüksek kalitede hukuki danışmanlık ve temsil hizmetleri sunuyoruz. Her davanızda yanınızdayız.
          </Subtitle>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PrimaryButton 
              to="/iletisim"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bize Ulaşın
            </PrimaryButton>
            <SecondaryButton 
              to="/hizmetler"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hizmetlerimiz
            </SecondaryButton>
          </ButtonGroup>
        </HeroLeft>
        
        <HeroRight>
          <HeroImage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </HeroRight>
      </HeroContent>
      
      <ScrollIndicator 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={scrollToNextSection}
        aria-label="Aşağı kaydır"
      >
        <FaChevronDown />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;