import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 4rem 5% 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <Logo>TAS HUKUK</Logo>
          <Description>
            Hukuki ihtiyaçlarınızda yanınızda olan güvenilir çözüm ortağınız.
            Deneyimli kadromuzla sizlere en iyi hizmeti sunuyoruz.
          </Description>
          <SocialLinks>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Hızlı Bağlantılar</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/">Ana Sayfa</Link></FooterLink>
            <FooterLink><Link to="/hizmetler">Hizmetler</Link></FooterLink>
            <FooterLink><Link to="/hakkimizda">Hakkımızda</Link></FooterLink>
            <FooterLink><Link to="/iletisim">İletişim</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Hizmetlerimiz</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/hizmetler/ticaret-hukuku">Ticaret Hukuku</Link></FooterLink>
            <FooterLink><Link to="/hizmetler/ceza-hukuku">Ceza Hukuku</Link></FooterLink>
            <FooterLink><Link to="/hizmetler/idare-hukuku">İdare Hukuku</Link></FooterLink>
            <FooterLink><Link to="/hizmetler/aile-hukuku">Aile Hukuku</Link></FooterLink>
            <FooterLink><Link to="/hizmetler/gayrimenkul-hukuku">Gayrimenkul Hukuku</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>İletişim</FooterTitle>
          <FooterLinks>
            <FooterLink>Levent Mah. Büyükdere Cad.</FooterLink>
            <FooterLink>No:123 Şişli/İstanbul</FooterLink>
            <FooterLink><a href="tel:+902125550000">Tel: +90 (212) 555 0000</a></FooterLink>
            <FooterLink><a href="mailto:info@tashukuk.com">Email: info@tashukuk.com</a></FooterLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>

      <Copyright>
        © {currentYear} Taş Hukuk. Tüm hakları saklıdır.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;