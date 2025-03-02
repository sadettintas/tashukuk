import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ServiceDetailContainer = styled.main`
  padding-top: 60px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.85)),
              url(${props => props.bgImage}) center/cover no-repeat;
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

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 5%;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ContentSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 200px;
  }
`;

const ServiceContent = styled.div`
  padding: 2rem;
`;

const ServiceDescription = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin: 2rem 0 1rem;
    font-family: ${props => props.theme.fonts.primary};
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const ServiceFeatures = styled.div`
  margin-top: 2rem;
  background-color: ${props => props.theme.colors.lightBg};
  padding: 1.5rem;
  border-radius: 8px;
`;

const FeatureTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.primary};
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    color: ${props => props.theme.colors.accent};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;

const ContactSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const ContactButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ServiceDetail = () => {
  const { serviceId } = useParams();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Service data - in a real app, this would come from an API or CMS
  const services = {
    'ticaret-hukuku': {
      title: 'Ticaret Hukuku',
      description: `
        <p>Ticaret hukuku, ticari işlemleri, şirketlerin kuruluşunu, işleyişini ve ticari ilişkileri düzenleyen hukuk dalıdır. Taş Hukuk Bürosu olarak, ticaret hukuku alanında geniş bir yelpazede hizmet sunmaktayız.</p>
        
        <h2>Ticaret Hukuku Hizmetlerimiz</h2>
        <p>Şirketlerin kuruluşundan tasfiyesine, ticari sözleşmelerden uyuşmazlık çözümüne kadar tüm ticaret hukuku alanlarında uzman kadromuzla yanınızdayız.</p>
        
        <h2>Şirketler Hukuku</h2>
        <p>Şirket kuruluşu, birleşme, devralma, bölünme ve tasfiye işlemlerinde hukuki danışmanlık ve destek sağlıyoruz. Şirket ana sözleşmelerinin hazırlanması, pay devir işlemleri ve genel kurul toplantılarının yönetimi konularında da hizmet vermekteyiz.</p>
        
        <h2>Ticari Sözleşmeler</h2>
        <p>Her türlü ticari sözleşmenin hazırlanması, incelenmesi ve müzakere edilmesi konularında destek sağlıyoruz. Distribütörlük, franchise, lisans ve bayilik sözleşmeleri gibi özel sözleşme türlerinde de uzmanlaşmış durumdayız.</p>
      `,
      features: [
        'Şirket kuruluşu ve tasfiyesi',
        'Birleşme ve devralmalar',
        'Ticari sözleşmeler',
        'Ticari uyuşmazlık çözümü',
        'Rekabet hukuku danışmanlığı',
        'Yabancı yatırımlar'
      ],
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200'
    },
    'aile-hukuku': {
      title: 'Aile Hukuku',
      description: `
        <p>Aile hukuku, evlilik, boşanma, velayet, nafaka ve miras gibi aile ilişkilerini düzenleyen hukuk dalıdır. Taş Hukuk Bürosu olarak, aile hukuku alanında hassasiyetle hizmet vermekteyiz.</p>
        
        <h2>Aile Hukuku Hizmetlerimiz</h2>
        <p>Boşanma davalarından velayet ve nafaka uyuşmazlıklarına, mal paylaşımından miras davalarına kadar tüm aile hukuku alanlarında uzman kadromuzla yanınızdayız.</p>
        
        <h2>Boşanma Davaları</h2>
        <p>Anlaşmalı ve çekişmeli boşanma davalarında müvekkillerimize hukuki destek sağlıyoruz. Boşanma sürecinde mal paylaşımı, nafaka ve tazminat taleplerinin en adil şekilde çözüme kavuşturulması için çalışıyoruz.</p>
        
        <h2>Velayet ve Nafaka</h2>
        <p>Çocukların velayeti, kişisel ilişki kurulması (ziyaret hakkı) ve nafaka konularında müvekkillerimizin ve çocukların menfaatlerini gözeterek hukuki destek sağlıyoruz.</p>
      `,
      features: [
        'Anlaşmalı ve çekişmeli boşanma davaları',
        'Velayet ve kişisel ilişki tesisi',
        'Nafaka davaları',
        'Mal paylaşımı',
        'Miras davaları',
        'Aile içi şiddet ve koruma tedbirleri'
      ],
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&w=1200'
    },
    'ceza-hukuku': {
      title: 'Ceza Hukuku',
      description: `
        <p>Ceza hukuku, suçları ve bu suçlara uygulanacak yaptırımları düzenleyen hukuk dalıdır. Taş Hukuk Bürosu olarak, ceza hukuku alanında profesyonel savunma hizmeti sunmaktayız.</p>
        
        <h2>Ceza Hukuku Hizmetlerimiz</h2>
        <p>Soruşturma aşamasından kovuşturma aşamasına, temyiz süreçlerinden infaz hukukuna kadar tüm ceza hukuku alanlarında müvekkillerimize hukuki destek sağlıyoruz.</p>
        
        <h2>Soruşturma ve Kovuşturma</h2>
        <p>Soruşturma aşamasında müdafilik hizmeti, ifade ve sorgu işlemlerinde hukuki destek, tutuklama ve adli kontrol tedbirlerine itiraz gibi konularda müvekkillerimizin yanındayız. Kovuşturma aşamasında ise savunma stratejisinin belirlenmesi ve etkin savunma yapılması için çalışıyoruz.</p>
        
        <h2>Temyiz ve İstinaf</h2>
        <p>Yerel mahkeme kararlarına karşı istinaf ve temyiz başvurularının hazırlanması ve takibi konularında hizmet vermekteyiz.</p>
      `,
      features: [
        'Soruşturma aşamasında müdafilik',
        'Kovuşturma aşamasında savunma',
        'İstinaf ve temyiz başvuruları',
        'Adli kontrol ve tutuklama tedbirlerine itiraz',
        'İnfaz hukuku danışmanlığı',
        'Uzlaşma ve alternatif çözüm yolları'
      ],
      image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1200'
    },
    'gayrimenkul-hukuku': {
      title: 'Gayrimenkul Hukuku',
      description: `
        <p>Gayrimenkul hukuku, taşınmaz malların alım-satımı, kiralanması, imar durumu ve tapu işlemleri gibi konuları düzenleyen hukuk dalıdır. Taş Hukuk Bürosu olarak, gayrimenkul hukuku alanında kapsamlı hizmet sunmaktayız.</p>
        
        <h2>Gayrimenkul Hukuku Hizmetlerimiz</h2>
        <p>Taşınmaz alım-satım işlemlerinden kira sözleşmelerine, imar hukukundan kat mülkiyeti uyuşmazlıklarına kadar tüm gayrimenkul hukuku alanlarında uzman kadromuzla yanınızdayız.</p>
        
        <h2>Taşınmaz Alım-Satım İşlemleri</h2>
        <p>Gayrimenkul alım-satım sözleşmelerinin hazırlanması, tapu işlemlerinin takibi ve hukuki due diligence çalışmaları konularında destek sağlıyoruz.</p>
        
        <h2>Kira Hukuku</h2>
        <p>Kira sözleşmelerinin hazırlanması, kira uyuşmazlıklarının çözümü, tahliye davaları ve kira tespit davaları konularında hukuki danışmanlık hizmeti vermekteyiz.</p>
      `,
      features: [
        'Taşınmaz alım-satım işlemleri',
        'Kira sözleşmeleri ve uyuşmazlıkları',
        'İmar hukuku danışmanlığı',
        'Kat mülkiyeti uyuşmazlıkları',
        'Tapu iptal ve tescil davaları',
        'Kamulaştırma davaları'
      ],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200'
    },
    'is-hukuku': {
      title: 'İş Hukuku',
      description: `
        <p>İş hukuku, işçi-işveren ilişkilerini, iş sözleşmelerini ve çalışma koşullarını düzenleyen hukuk dalıdır. Taş Hukuk Bürosu olarak, iş hukuku alanında hem işçilere hem de işverenlere hukuki danışmanlık hizmeti sunmaktayız.</p>
        
        <h2>İş Hukuku Hizmetlerimiz</h2>
        <p>İş sözleşmelerinin hazırlanmasından iş uyuşmazlıklarının çözümüne, işe iade davalarından tazminat davalarına kadar tüm iş hukuku alanlarında uzman kadromuzla yanınızdayız.</p>
        
        <h2>İş Sözleşmeleri</h2>
        <p>Her türlü iş sözleşmesinin hazırlanması, incelenmesi ve revize edilmesi konularında hizmet vermekteyiz. İşyeri iç yönetmelikleri ve personel politikalarının hazırlanması konularında da destek sağlıyoruz.</p>
        
        <h2>İş Uyuşmazlıkları</h2>
        <p>İşe iade davaları, kıdem ve ihbar tazminatı davaları, fazla mesai ve diğer işçilik alacakları davaları konularında hukuki danışmanlık ve dava takibi hizmeti sunmaktayız.</p>
      `,
      features: [
        'İş sözleşmelerinin hazırlanması',
        'İşe iade davaları',
        'Kıdem ve ihbar tazminatı davaları',
        'Fazla mesai ve işçilik alacakları davaları',
        'İş kazası ve meslek hastalığı davaları',
        'Toplu iş hukuku danışmanlığı'
      ],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200'
    },
    'idare-hukuku': {
      title: 'İdare Hukuku',
      description: `
        <p>İdare hukuku, kamu kurumlarının işleyişini ve vatandaşlarla olan ilişkilerini düzenleyen hukuk dalıdır. Taş Hukuk Bürosu olarak, idare hukuku alanında kapsamlı hizmet sunmaktayız.</p>
        
        <h2>İdare Hukuku Hizmetlerimiz</h2>
        <p>İdari işlemlere karşı iptal davalarından tam yargı davalarına, vergi uyuşmazlıklarından kamu ihale uyuşmazlıklarına kadar tüm idare hukuku alanlarında uzman kadromuzla yanınızdayız.</p>
        
        <h2>İdari Davalar</h2>
        <p>İdari işlemlere karşı iptal davaları, idari eylemlerden kaynaklanan tam yargı davaları ve yürütmeyi durdurma talepleri konularında hukuki danışmanlık ve dava takibi hizmeti sunmaktayız.</p>
        
        <h2>Vergi Hukuku</h2>
        <p>Vergi uyuşmazlıkları, vergi cezalarına itiraz, vergi incelemesi süreçlerinde danışmanlık ve uzlaşma görüşmeleri konularında destek sağlıyoruz.</p>
      `,
      features: [
        'İdari işlemlere karşı iptal davaları',
        'Tam yargı davaları',
        'Vergi uyuşmazlıkları',
        'Kamu ihale uyuşmazlıkları',
        'Kamulaştırma davaları',
        'İmar uyuşmazlıkları'
      ],
      image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?auto=format&fit=crop&w=1200'
    }
  };
  
  const service = services[serviceId];
  
  if (!service) {
    return (
      <ServiceDetailContainer>
        <Container>
          <h1>Hizmet bulunamadı</h1>
          <BackButton to="/hizmetler">
            <ArrowBackIcon /> Hizmetler sayfasına dön
          </BackButton>
        </Container>
      </ServiceDetailContainer>
    );
  }
  
  return (
    <ServiceDetailContainer>
      <Helmet>
        <title>{service.title} | Taş Hukuk Bürosu</title>
        <meta name="description" content={`Taş Hukuk Bürosu olarak ${service.title.toLowerCase()} alanında profesyonel hukuki danışmanlık ve temsil hizmetleri sunuyoruz.`} />
      </Helmet>
      
      <HeroSection bgImage={service.image}>
        <HeroTitle>{service.title}</HeroTitle>
      </HeroSection>
      
      <Container>
        <BackButton to="/hizmetler">
          <ArrowBackIcon /> Tüm hizmetlere dön
        </BackButton>
        
        <ContentSection>
          <ServiceImage src={service.image} alt={service.title} />
          <ServiceContent>
            <ServiceDescription dangerouslySetInnerHTML={{ __html: service.description }} />
            
            <ServiceFeatures>
              <FeatureTitle>Sunduğumuz Hizmetler</FeatureTitle>
              <FeatureList>
                {service.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
            </ServiceFeatures>
            
            <ContactSection>
              <ContactButton to="/iletisim">
                Hizmet Almak İçin İletişime Geçin
              </ContactButton>
            </ContactSection>
          </ServiceContent>
        </ContentSection>
      </Container>
    </ServiceDetailContainer>
  );
};

export default ServiceDetail; 