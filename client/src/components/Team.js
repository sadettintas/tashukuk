import styled from 'styled-components';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const TeamSection = styled.section`
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
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 1rem;
`;

const TeamCard = styled(motion.div)`
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  border-radius: 8px;
`;

const AttorneyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${TeamCard}:hover & {
    transform: scale(1.05);
  }
`;

const AttorneyName = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const AttorneyTitle = styled.p`
  color: ${props => props.theme.colors.accent};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const AttorneyBio = styled.p`
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.primary};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const attorneys = [
  {
    name: 'Av. Mehmet Taş',
    title: 'Kurucu Ortak',
    bio: 'Ticaret hukuku ve şirketler hukuku alanında 15 yıllık deneyime sahip.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500',
    linkedin: 'https://linkedin.com/',
    email: 'mehmet.tas@tashukuk.com'
  },
  {
    name: 'Av. Ayşe Yılmaz',
    title: 'Kıdemli Avukat',
    bio: 'İş hukuku ve sosyal güvenlik hukuku konularında uzman.',
    image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?auto=format&fit=crop&w=500',
    linkedin: 'https://linkedin.com/',
    email: 'ayse.yilmaz@tashukuk.com'
  },
  {
    name: 'Av. Ali Kaya',
    title: 'Ortak',
    bio: 'Gayrimenkul hukuku ve inşaat hukuku alanlarında uzmanlaşmış.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&w=500',
    linkedin: 'https://linkedin.com/',
    email: 'ali.kaya@tashukuk.com'
  }
];

const Team = () => {
  return (
    <TeamSection id="avukatlar">
      <Container>
        <SectionTitle>Avukatlarımız</SectionTitle>
        <TeamGrid>
          {attorneys.map((attorney, index) => (
            <TeamCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ImageContainer>
                <AttorneyImage src={attorney.image} alt={attorney.name} />
              </ImageContainer>
              <AttorneyName>{attorney.name}</AttorneyName>
              <AttorneyTitle>{attorney.title}</AttorneyTitle>
              <AttorneyBio>{attorney.bio}</AttorneyBio>
              <SocialLinks>
                <SocialIcon href={attorney.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </SocialIcon>
                <SocialIcon href={`mailto:${attorney.email}`}>
                  <EmailIcon />
                </SocialIcon>
              </SocialLinks>
            </TeamCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default Team;