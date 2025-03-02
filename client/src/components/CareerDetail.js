import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaBriefcase, FaUserGraduate, FaUserTie, FaFileUpload, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const DetailSection = styled.section`
  padding: 6rem 5% 8rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: translateX(-5px);
    
    svg {
      transform: translateX(-3px);
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
`;

const DetailCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

const DetailHeader = styled.div`
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  padding: 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const JobTitle = styled.h1`
  font-size: 2.2rem;
  margin: 0 0 0.5rem;
  font-family: ${props => props.theme.fonts.primary};
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
    
    svg {
      font-size: 1.1rem;
    }
  }
`;

const DetailContent = styled.div`
  padding: 3rem;
`;

const DetailImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin-bottom: 2rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    border-radius: 3px;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const RequirementsList = styled.ul`
  margin: 1.5rem 0;
  padding-left: 1rem;
`;

const RequirementItem = styled.li`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }
  
  svg {
    color: ${props => props.theme.colors.accent};
    margin-top: 0.3rem;
    flex-shrink: 0;
    transition: color 0.3s ease;
  }
`;

const ApplyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 2rem;
  cursor: pointer;
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
    background: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
    
    &::before {
      transform: translateX(100%);
    }
    
    svg {
      transform: translateY(-2px);
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
`;

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const NotFoundTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CareerDetail = () => {
  const { positionSlug } = useParams();
  const navigate = useNavigate();
  
  // Job position data
  const jobPositions = {
    'stajyer-avukat': {
      title: 'Stajyer Avukat',
      icon: <FaUserGraduate />,
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı',
      image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Hukuk fakültesi mezunu, staj döneminde olan ve kariyerine dinamik bir hukuk bürosunda başlamak isteyen adaylar için ideal bir pozisyon.',
      longDescription: 'Taş Hukuk Bürosu olarak, kariyerinin başındaki yetenekli hukukçulara kapılarımızı açıyoruz. Stajyer avukat pozisyonumuz, hukuk fakültesi mezunu ve staj döneminde olan adaylar için tasarlanmıştır. Bu pozisyon, çeşitli hukuk alanlarında deneyim kazanma, gerçek dava ve işlemlerde yer alma ve deneyimli avukatlardan mentorluk alma fırsatı sunmaktadır.',
      requirements: [
        'Hukuk fakültesi mezunu olmak',
        'Staj döneminde olmak veya staja başlamaya hak kazanmış olmak',
        'Araştırma ve analitik düşünme becerisine sahip olmak',
        'İyi derecede İngilizce bilgisine sahip olmak',
        'MS Office programlarını etkin kullanabilmek',
        'Takım çalışmasına yatkın olmak'
      ],
      responsibilities: [
        'Dava dosyalarının hazırlanması ve takibi',
        'Hukuki araştırmalar yapılması',
        'Dilekçe ve sözleşmelerin hazırlanması',
        'Duruşmalara katılım',
        'Müvekkil görüşmelerine katılım',
        'Büro içi eğitim programlarına katılım'
      ]
    },
    'kidemli-avukat': {
      title: 'Kıdemli Avukat',
      icon: <FaUserTie />,
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı',
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'En az 5 yıl deneyimli, özellikle ticaret hukuku ve şirketler hukuku alanında uzmanlaşmış, müvekkil ilişkilerini yönetebilecek ve ekibe liderlik edebilecek avukat arıyoruz.',
      longDescription: 'Taş Hukuk Bürosu olarak, ticaret hukuku ve şirketler hukuku alanında uzmanlaşmış, deneyimli bir avukat arıyoruz. Bu pozisyon, karmaşık hukuki meseleleri ele alma, müvekkil ilişkilerini yönetme ve ekibe liderlik etme sorumluluklarını içermektedir. İdeal aday, hukuki uzmanlığını stratejik düşünce ve iş anlayışıyla birleştirebilen bir profesyonel olmalıdır.',
      requirements: [
        'Hukuk fakültesi mezunu ve en az 5 yıl mesleki deneyime sahip olmak',
        'Ticaret hukuku ve şirketler hukuku alanında uzmanlaşmış olmak',
        'Müvekkil ilişkilerini yönetme deneyimine sahip olmak',
        'İleri düzeyde İngilizce bilgisine sahip olmak',
        'Analitik düşünme ve problem çözme becerisine sahip olmak',
        'Liderlik ve iletişim becerilerine sahip olmak'
      ],
      responsibilities: [
        'Ticari sözleşmelerin hazırlanması ve müzakere edilmesi',
        'Şirket birleşme ve devralma süreçlerinin yönetilmesi',
        'Şirket yapılandırma ve yeniden yapılandırma süreçlerinde danışmanlık',
        'Müvekkillere hukuki danışmanlık sağlanması',
        'Dava stratejilerinin geliştirilmesi ve davaların yönetilmesi',
        'Ekip üyelerine mentorluk yapılması ve gelişimlerine katkı sağlanması'
      ]
    },
    'hukuk-asistani': {
      title: 'Hukuk Asistanı',
      icon: <FaBriefcase />,
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı / Yarı Zamanlı',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Avukatlara idari ve hukuki süreçlerde destek olacak, dosya takibi yapabilecek, organizasyon yeteneği yüksek ve detaylara önem veren bir asistan arıyoruz.',
      longDescription: 'Taş Hukuk Bürosu olarak, avukatlarımıza idari ve hukuki süreçlerde destek olacak, organizasyon yeteneği yüksek bir hukuk asistanı arıyoruz. Bu pozisyon, büro içi operasyonların düzenli yürütülmesi, dosya takibi ve avukatlara destek olunması görevlerini içermektedir. İdeal aday, detaylara önem veren, iletişim becerileri güçlü ve çoklu görevleri yönetebilen bir profesyonel olmalıdır.',
      requirements: [
        'En az lise mezunu olmak (Hukuk sekreterliği veya ilgili alanlarda eğitim almış olmak tercih sebebidir)',
        'MS Office programlarını etkin kullanabilmek',
        'Organizasyon ve planlama becerisine sahip olmak',
        'İyi derecede iletişim becerilerine sahip olmak',
        'Detaylara önem vermek ve düzenli çalışmak',
        'Tercihen hukuk bürosu deneyimine sahip olmak'
      ],
      responsibilities: [
        'Telefon ve e-posta trafiğinin yönetilmesi',
        'Randevu ve toplantıların organize edilmesi',
        'Dava dosyalarının fiziksel ve dijital olarak düzenlenmesi',
        'Mahkeme ve resmi kurumlardaki evrak işlemlerinin takibi',
        'Avukatlara idari konularda destek olunması',
        'Ofis malzemelerinin takibi ve temini'
      ]
    }
  };
  
  const position = jobPositions[positionSlug];
  
  if (!position) {
    return (
      <DetailSection>
        <Container>
          <BackButton to="/kariyer">
            <FaArrowLeft /> Kariyer Sayfasına Dön
          </BackButton>
          <NotFoundMessage>
            <NotFoundTitle>Pozisyon Bulunamadı</NotFoundTitle>
            <NotFoundText>Aradığınız pozisyon mevcut değil veya kaldırılmış olabilir.</NotFoundText>
            <ApplyButton to="/kariyer">Tüm Pozisyonları Görüntüle</ApplyButton>
          </NotFoundMessage>
        </Container>
      </DetailSection>
    );
  }
  
  const handleApply = () => {
    // Store the selected position in localStorage
    localStorage.setItem('selectedPosition', position.title);
    navigate('/kariyer#basvuru-formu');
  };
  
  return (
    <DetailSection>
      <Helmet>
        <title>{position.title} | Taş Hukuk Bürosu Kariyer</title>
        <meta name="description" content={`Taş Hukuk Bürosu ${position.title} pozisyonu için başvuru yapın. ${position.description}`} />
        <meta property="og:title" content={`${position.title} | Taş Hukuk Bürosu Kariyer`} />
        <meta property="og:description" content={position.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tashukuk.com/kariyer/${positionSlug}`} />
        <meta property="og:image" content={position.image} />
      </Helmet>
      
      <Container>
        <BackButton to="/kariyer">
          <FaArrowLeft /> Kariyer Sayfasına Dön
        </BackButton>
        
        <DetailCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DetailHeader>
            <IconWrapper>
              {position.icon}
            </IconWrapper>
            <HeaderContent>
              <JobTitle>{position.title}</JobTitle>
              <JobMeta>
                <span><FaMapMarkerAlt /> {position.location}</span>
                <span><FaClock /> {position.type}</span>
              </JobMeta>
            </HeaderContent>
          </DetailHeader>
          
          <DetailContent>
            <DetailImage src={position.image} />
            
            <Description>{position.longDescription}</Description>
            
            <SectionTitle>Gereksinimler</SectionTitle>
            <RequirementsList>
              {position.requirements.map((req, index) => (
                <RequirementItem key={index}>
                  <FaCheckCircle />
                  <span>{req}</span>
                </RequirementItem>
              ))}
            </RequirementsList>
            
            <SectionTitle>Sorumluluklar</SectionTitle>
            <RequirementsList>
              {position.responsibilities.map((resp, index) => (
                <RequirementItem key={index}>
                  <FaCheckCircle />
                  <span>{resp}</span>
                </RequirementItem>
              ))}
            </RequirementsList>
            
            <ButtonGroup>
              <BackButton to="/kariyer">
                <FaArrowLeft /> Geri Dön
              </BackButton>
              
              <ApplyButton onClick={handleApply}>
                <FaFileUpload /> Bu Pozisyona Başvur
              </ApplyButton>
            </ButtonGroup>
          </DetailContent>
        </DetailCard>
      </Container>
    </DetailSection>
  );
};

export default CareerDetail; 