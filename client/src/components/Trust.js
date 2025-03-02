import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaAward, FaHandshake } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TrustSection = styled.section`
  padding: 6rem 5%;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  display: inline-block;
  
  &:after {
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

const Subtitle = styled.p`
  color: ${props => props.theme.colors.lightText};
  max-width: 700px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.primary};
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatText = styled.div`
  color: ${props => props.theme.colors.lightText};
  font-size: 1.2rem;
  font-weight: 500;
`;

const TrustMessage = styled.div`
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(37, 99, 235, 0.1));
  padding: 3.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 850px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 6rem;
    color: rgba(30, 58, 138, 0.2);
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1;
  }
  
  &:after {
    content: '"';
    position: absolute;
    bottom: -20px;
    right: 20px;
    font-size: 6rem;
    color: rgba(30, 58, 138, 0.2);
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1;
  }
`;

const Message = styled.p`
  font-size: 1.35rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.8rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f8fafc;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const Trust = () => {
  const stats = [
    {
      icon: <FaBalanceScale />,
      number: 25,
      suffix: "+",
      text: "Yıllık Deneyim"
    },
    {
      icon: <FaAward />,
      number: 1000,
      suffix: "+",
      text: "Başarılı Dava"
    },
    {
      icon: <FaHandshake />,
      number: 98,
      suffix: "%",
      text: "Müvekkil Memnuniyeti"
    }
  ];
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <TrustSection id="neden-biz" role="region" aria-label="Neden Bizi Seçmelisiniz">
      <Container>
        <Header>
          <Title>Neden Biz?</Title>
          <Subtitle>
            Yılların deneyimi ve profesyonel yaklaşımımızla hukuki süreçlerinizde
            güvenilir çözüm ortağınız oluyoruz
          </Subtitle>
        </Header>
        <StatsGrid ref={ref}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              role="figure"
              aria-label={`${stat.text}: ${stat.number}${stat.suffix}`}
            >
              <IconWrapper aria-hidden="true">
                {stat.icon}
              </IconWrapper>
              <StatNumber>
                {isInView && (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                    delay={0.5}
                  />
                )}
              </StatNumber>
              <StatText>{stat.text}</StatText>
            </StatItem>
          ))}
        </StatsGrid>
        <TrustMessage role="blockquote">
          <Message>
            "Hukuk büromuz, her müvekkilimizin davasına özel yaklaşım ve çözümler
            sunarak, adaletin tecellisi için var gücüyle çalışmaktadır. Sizin
            başarınız, bizim başarımızdır."
          </Message>
        </TrustMessage>
      </Container>
    </TrustSection>
  );
};

export default Trust;