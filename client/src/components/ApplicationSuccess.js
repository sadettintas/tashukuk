import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const SuccessSection = styled.section`
  padding: 8rem 5%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 40vw;
    height: 40vw;
    border-radius: 50%;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.accent}10);
    z-index: 0;
  }
  
  &::before {
    top: -10vw;
    right: -10vw;
  }
  
  &::after {
    bottom: -15vw;
    left: -15vw;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SuccessCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 4rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 2rem;
  }
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.accent}10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent}05;
    z-index: -1;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  svg {
    font-size: 4rem;
    color: ${props => props.theme.colors.accent};
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    border-radius: 3px;
  }
`;

const Message = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    
    &::before {
      transform: translateX(100%);
    }
    
    svg {
      transform: translateX(-3px);
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
`;

const ApplicationSuccess = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <SuccessSection>
      <Helmet>
        <title>Başvurunuz Alındı | Taş Hukuk Bürosu</title>
        <meta name="description" content="Taş Hukuk Bürosu'na yaptığınız iş başvurusu başarıyla alınmıştır." />
      </Helmet>
      
      <Container>
        <SuccessCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
        >
          <IconWrapper>
            <FaCheckCircle />
          </IconWrapper>
          
          <Title>Başvurunuz Alındı!</Title>
          
          <Message>
            İş başvurunuz başarıyla alınmıştır. Başvurunuz incelendikten sonra sizinle en kısa sürede iletişime geçeceğiz. 
            Taş Hukuk Bürosu'na gösterdiğiniz ilgi için teşekkür ederiz.
          </Message>
          
          <BackButton to="/kariyer">
            <FaArrowLeft /> Kariyer Sayfasına Dön
          </BackButton>
        </SuccessCard>
      </Container>
    </SuccessSection>
  );
};

export default ApplicationSuccess; 