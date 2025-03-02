import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import VisionIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const AboutPageContainer = styled.main`
  padding-top: 60px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  position: relative;
  padding: 7rem 5%;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=2000') center/cover no-repeat;
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 4.2rem;
  margin-bottom: 2.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3.4rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.7rem;
    margin-bottom: 1.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const Section = styled.section`
  padding: 6rem 5%;
  background-color: ${props => props.alternate ? props.theme.colors.lightBg : 'white'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 4rem;
  color: ${props => props.theme.colors.primary};
  font-size: 2.8rem;
  position: relative;
  font-weight: 700;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background-color: ${props => props.theme.colors.accent};
    border-radius: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
`;

const MissionVisionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const MissionVisionCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 4rem 3.5rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3.5rem 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 2rem;
  }
`;

const CardIcon = styled.div`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.lightBg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  svg {
    font-size: 3.5rem;
    color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100px;
    height: 100px;
    
    svg {
      font-size: 3rem;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 90px;
    height: 90px;
    margin-bottom: 2rem;
    
    svg {
      font-size: 2.8rem;
    }
  }
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  font-size: 1.15rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.05rem;
    line-height: 1.7;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.5rem;
  
  @media (max-width: 1100px) {
    gap: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (max-width: 650px) {
    gap: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }
`;

const TeamCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const TeamMemberImage = styled.div`
  height: 300px;
  width: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  ${TeamCard}:hover & img {
    transform: scale(1.08);
  }
`;

const TeamMemberInfo = styled.div`
  padding: 2rem;
  position: relative;
`;

const TeamMemberName = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
`;

const TeamMemberTitle = styled.p`
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const TeamMemberSpecialty = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.2rem;
  line-height: 1.6;
  font-size: 1.05rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.primary};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.lightBg};
  
  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.5rem;
  }
`;

const CTASection = styled.section`
  padding: 6rem 5% 5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #0044cc 100%);
  color: white;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 5rem 5% 4rem;
  }
`;

const CTAContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    svg {
      transform: translateX(5px);
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Av. Ahmet Taş",
      title: "Kurucu Ortak",
      specialty: "Ticaret Hukuku",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500",
      linkedin: "#",
      email: "ahmet@tashukuk.com"
    },
    {
      name: "Av. Ayşe Demir",
      title: "Kıdemli Avukat",
      specialty: "Aile Hukuku",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500",
      linkedin: "#",
      email: "ayse@tashukuk.com"
    },
    {
      name: "Av. Mehmet Yılmaz",
      title: "Kıdemli Avukat",
      specialty: "Ceza Hukuku",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500",
      linkedin: "#",
      email: "mehmet@tashukuk.com"
    },
    {
      name: "Av. Zeynep Kaya",
      title: "Avukat",
      specialty: "İdare Hukuku",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500",
      linkedin: "#",
      email: "zeynep@tashukuk.com"
    },
    {
      name: "Av. Emre Şahin",
      title: "Avukat",
      specialty: "Gayrimenkul Hukuku",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500",
      linkedin: "#",
      email: "emre@tashukuk.com"
    },
    {
      name: "Av. Selin Öztürk",
      title: "Avukat",
      specialty: "İş Hukuku",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500",
      linkedin: "#",
      email: "selin@tashukuk.com"
    }
  ];

  return (
    <AboutPageContainer>
      <Helmet>
        <title>Hakkımızda | Taş Hukuk Bürosu</title>
        <meta name="description" content="Taş Hukuk Bürosu hakkında bilgi edinin. Misyonumuz, vizyonumuz ve uzman avukat kadromuz ile tanışın." />
      </Helmet>
      
      <HeroSection>
        <HeroContent>
          <HeroTitle>Biz Kimiz?</HeroTitle>
          <HeroSubtitle>
            Taş Hukuk Bürosu olarak 20 yılı aşkın tecrübemiz ve uzman avukat kadromuz ile müvekkillerimize geniş bir yelpazede hukuki danışmanlık ve temsil hizmeti sunuyoruz. Dürüstlük, şeffaflık ve profesyonellik ilkelerimizle her zaman müvekkillerimizin yanındayız.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <Section>
        <Container>
          <SectionTitle>Misyon & Vizyon</SectionTitle>
          <MissionVisionContainer>
            <MissionVisionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <CardIcon>
                <GpsFixedIcon />
              </CardIcon>
              <CardTitle>Misyonumuz</CardTitle>
              <CardText>
                Müşterilerimize en iyi hukuki hizmeti sunarak adaleti sağlamak için buradayız. Her davanın arkasında bir insan hikayesi olduğunu biliyor ve bu bilinçle çalışıyoruz. Hukuki süreçlerde müvekkillerimizin yanında olmak, haklarını en iyi şekilde savunmak ve adil sonuçlar elde etmek için var gücümüzle çalışıyoruz.
              </CardText>
            </MissionVisionCard>
            
            <MissionVisionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CardIcon>
                <VisionIcon />
              </CardIcon>
              <CardTitle>Vizyonumuz</CardTitle>
              <CardText>
                Geleceğin en güvenilir hukuk bürosu olmayı hedefliyoruz. Teknolojik gelişmeleri takip ederek, yenilikçi çözümler sunarak ve etik değerlerimizden ödün vermeden müvekkillerimize hizmet vermeye devam edeceğiz. Hukuk alanında öncü olmak ve toplumsal adaletin sağlanmasına katkıda bulunmak en büyük hedefimizdir.
              </CardText>
            </MissionVisionCard>
          </MissionVisionContainer>
        </Container>
      </Section>
      
      <Section alternate>
        <Container>
          <SectionTitle>Kadromuz</SectionTitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamMemberImage>
                  <img src={member.image} alt={member.name} />
                </TeamMemberImage>
                <TeamMemberInfo>
                  <TeamMemberName>{member.name}</TeamMemberName>
                  <TeamMemberTitle>{member.title}</TeamMemberTitle>
                  <TeamMemberSpecialty>{member.specialty}</TeamMemberSpecialty>
                  <SocialLinks>
                    <SocialLink href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <LinkedInIcon />
                    </SocialLink>
                    <SocialLink href={`mailto:${member.email}`} aria-label="E-posta">
                      <EmailIcon />
                    </SocialLink>
                  </SocialLinks>
                </TeamMemberInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </Section>
      
      <CTASection>
        <CTAContainer>
          <CTATitle>Hukuki Destek Almak İster Misiniz?</CTATitle>
          <CTAText>
            Hukuki sorunlarınızda profesyonel destek almak için bizimle iletişime geçin.
            Uzman avukat kadromuz ile size en iyi hizmeti sunmak için hazırız.
          </CTAText>
          <CTAButton to="/iletisim">
            İletişim Sayfasına Git <ArrowForwardIcon />
          </CTAButton>
        </CTAContainer>
      </CTASection>
    </AboutPageContainer>
  );
};

export default AboutPage; 