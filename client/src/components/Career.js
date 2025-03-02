import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUserGraduate, FaUserTie, FaFileUpload, FaEnvelope, FaPhone, FaUser, FaBuilding, FaArrowRight, FaHandshake, FaCheckCircle, FaSpinner, FaMapMarkerAlt, FaClock, FaExclamationCircle, FaFilePdf, FaFileWord, FaTimesCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const CareerSection = styled.section`
  padding: 6rem 5% 10rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  animation: fadeIn 1s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  display: inline-block;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  max-width: 700px;
  margin: 2rem auto 0;
  line-height: 1.7;
  font-size: 1.2rem;
  font-weight: 400;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const JobCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    
    .job-image::after {
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
    }
    
    .detail-button {
      background: ${props => props.theme.colors.accent};
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
    }
  }
`;

const JobImage = styled.div`
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
    transition: background 0.3s ease;
  }
`;

const JobHeader = styled.div`
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  padding: 1.8rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;
  margin-top: -60px;
  z-index: 1;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const JobIcon = styled.div`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const JobTitle = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
`;

const JobContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0 1.5rem;
`;

const JobMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.lightText};
  font-size: 0.9rem;
  
  svg {
    color: ${props => props.theme.colors.accent};
  }
`;

const JobDescription = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.7;
  margin-bottom: 2rem;
  flex-grow: 1;
  font-size: 1.05rem;
`;

const DetailButton = styled(Link)`
  background: transparent;
  color: ${props => props.theme.colors.accent};
  border: 2px solid ${props => props.theme.colors.accent};
  padding: 0.9rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 3.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  margin-bottom: 5rem;
  position: relative;
  animation: slideUp 0.8s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2.5rem 1.5rem;
  }
`;

const FormTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
`;

const FormSubtitle = styled.p`
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.8rem;
  font-weight: 500;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.accent};
  }
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1.05rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  height: 55px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`;

const Select = styled.select`
  padding: 1rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1.05rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  height: 55px;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 1rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1.05rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    font-size: 1.3rem;
  }
`;

const FileInput = styled.input`
  position: absolute;
  left: -9999px;
`;

const FileName = styled.span`
  display: block;
  margin-top: 0.8rem;
  color: ${props => props.theme.colors.lightText};
  font-size: 0.95rem;
  
  &.error {
    color: #ef4444;
  }
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
  
  svg {
    font-size: 2rem;
    color: ${props => props.theme.colors.accent};
  }
`;

const FileInfo = styled.div`
  flex: 1;
`;

const FileName2 = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const FileSize = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.lightText};
`;

const RemoveFileButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  grid-column: 1 / -1;
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CultureSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 3.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
`;

const CultureTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    border-radius: 3px;
  }
`;

const CultureText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const CultureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CultureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    
    .culture-icon {
      transform: scale(1.1);
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const CultureIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
`;

const CultureItemTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const CultureItemText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  svg {
    font-size: 0.9rem;
  }
`;

const Career = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null
  });
  
  const [fileName, setFileName] = useState('Dosya seçilmedi');
  const [fileSize, setFileSize] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if there's a selected position in localStorage
    const selectedPosition = localStorage.getItem('selectedPosition');
    if (selectedPosition) {
      setFormData(prev => ({ ...prev, position: selectedPosition }));
      localStorage.removeItem('selectedPosition');
      
      // Scroll to form
      const formElement = document.getElementById('basvuru-formu');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  
  const jobs = [
    {
      icon: <FaUserGraduate />,
      title: 'Stajyer Avukat',
      slug: 'stajyer-avukat',
      image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Hukuk fakültesi mezunu, staj döneminde olan ve kariyerine dinamik bir hukuk bürosunda başlamak isteyen adaylar için ideal bir pozisyon. Çeşitli hukuk alanlarında deneyim kazanma fırsatı sunuyoruz.',
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı'
    },
    {
      icon: <FaUserTie />,
      title: 'Kıdemli Avukat',
      slug: 'kidemli-avukat',
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'En az 5 yıl deneyimli, özellikle ticaret hukuku ve şirketler hukuku alanında uzmanlaşmış, müvekkil ilişkilerini yönetebilecek ve ekibe liderlik edebilecek avukat arıyoruz.',
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı'
    },
    {
      icon: <FaBriefcase />,
      title: 'Hukuk Asistanı',
      slug: 'hukuk-asistani',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Avukatlara idari ve hukuki süreçlerde destek olacak, dosya takibi yapabilecek, organizasyon yeteneği yüksek ve detaylara önem veren bir asistan arıyoruz.',
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı / Yarı Zamanlı'
    }
  ];
  
  const cultureValues = [
    {
      icon: <FaBuilding />,
      title: 'Profesyonel Gelişim',
      text: 'Sürekli eğitim ve gelişim fırsatları ile kariyerinizde ilerlemenizi destekliyoruz.'
    },
    {
      icon: <FaUserTie />,
      title: 'Mentorluk',
      text: 'Deneyimli avukatlarımız tarafından sağlanan mentorluk programları ile mesleki gelişiminize katkı sağlıyoruz.'
    },
    {
      icon: <FaHandshake />,
      title: 'İş Birliği',
      text: 'Takım çalışmasını destekleyen, iş birliğine dayalı bir çalışma ortamı sunuyoruz.'
    }
  ];
  
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Ad Soyad alanı zorunludur';
        else if (value.trim().length < 3) error = 'Ad Soyad en az 3 karakter olmalıdır';
        break;
      case 'email':
        if (!value.trim()) error = 'E-posta alanı zorunludur';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Geçerli bir e-posta adresi giriniz';
        break;
      case 'phone':
        if (value.trim() && !/^[0-9\s\+\-\(\)]{10,15}$/.test(value)) error = 'Geçerli bir telefon numarası giriniz';
        break;
      default:
        break;
    }
    
    return error;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate on change
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate on blur
    const error = validateField(name, formData[name]);
    setErrors({
      ...errors,
      [name]: error
    });
  };
  
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
      setFormData({
        ...formData,
        cv: file
      });
      
      // Clear any error for CV
      setErrors({
        ...errors,
        cv: ''
      });
    }
  };
  
  const handleRemoveFile = () => {
    setFileName('Dosya seçilmedi');
    setFileSize(null);
    setFormData({
      ...formData,
      cv: null
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      if (key === 'name' || key === 'email') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        }
      }
    });
    
    if (!formData.cv) {
      newErrors.cv = 'CV yüklemeniz gerekmektedir';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      // Mark all fields as touched to show errors
      const allTouched = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      return;
    }
    
    setIsSubmitting(true);
    
    console.log('Form data submitted:', formData);
    
    // Form verilerini backend'e gönderme işlemi burada yapılacak
    // Örnek: E-posta bildirimi gönderme
    // sendEmailNotification(formData);
    
    // Örnek: Veritabanına kaydetme
    // saveApplicationToDatabase(formData);
    
    // Simüle edilmiş bir API çağrısı
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/basvuru-basarili');
    }, 1500);
  };
  
  return (
    <CareerSection id="kariyer" role="region" aria-label="Kariyer Fırsatları">
      <Helmet>
        <title>Kariyer Fırsatları | Taş Hukuk Bürosu</title>
        <meta name="description" content="Taş Hukuk Bürosu'nda kariyer fırsatları. Stajyer Avukat, Kıdemli Avukat ve Hukuk Asistanı pozisyonları için başvurabilirsiniz." />
        <meta property="og:title" content="Kariyer Fırsatları | Taş Hukuk Bürosu" />
        <meta property="og:description" content="Taş Hukuk Bürosu'nda kariyer fırsatları. Açık pozisyonlarımıza başvurarak ekibimize katılabilirsiniz." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tashukuk.com/kariyer" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
      </Helmet>
      
      <Container>
        <Header>
          <Title>Kariyer Fırsatları</Title>
          <Subtitle>
            Ekibimize katılmak ister misiniz? Aşağıdaki açık pozisyonlara başvurabilirsiniz.
          </Subtitle>
        </Header>
        
        <JobsGrid>
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <JobImage src={job.image} className="job-image" />
              <JobHeader>
                <JobIcon>{job.icon}</JobIcon>
                <JobTitle>{job.title}</JobTitle>
              </JobHeader>
              <JobContent>
                <JobMeta>
                  <JobMetaItem>
                    <FaMapMarkerAlt /> {job.location}
                  </JobMetaItem>
                  <JobMetaItem>
                    <FaClock /> {job.type}
                  </JobMetaItem>
                </JobMeta>
                <JobDescription>{job.description}</JobDescription>
                <DetailButton to={`/kariyer/${job.slug}`} className="detail-button">
                  Detaylı Bilgi
                  <FaArrowRight />
                </DetailButton>
              </JobContent>
            </JobCard>
          ))}
        </JobsGrid>
        
        <FormSection id="basvuru-formu">
          <FormTitle>Başvuru Formu</FormTitle>
          <FormSubtitle>Aşağıdaki formu doldurarak açık pozisyonlarımıza başvurabilirsiniz.</FormSubtitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">
                <FaUser /> Ad Soyad *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.name && errors.name ? 'error' : ''}
                required
              />
              {touched.name && errors.name && (
                <ErrorMessage>
                  <FaExclamationCircle /> {errors.name}
                </ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">
                <FaEnvelope /> E-posta *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? 'error' : ''}
                required
              />
              {touched.email && errors.email && (
                <ErrorMessage>
                  <FaExclamationCircle /> {errors.email}
                </ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">
                <FaPhone /> Telefon
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.phone && errors.phone ? 'error' : ''}
                placeholder="0(5XX) XXX XX XX"
              />
              {touched.phone && errors.phone && (
                <ErrorMessage>
                  <FaExclamationCircle /> {errors.phone}
                </ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="position">
                <FaBriefcase /> Başvurulan Pozisyon
              </Label>
              <Select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
              >
                <option value="">Pozisyon Seçiniz</option>
                <option value="Stajyer Avukat">Stajyer Avukat</option>
                <option value="Kıdemli Avukat">Kıdemli Avukat</option>
                <option value="Hukuk Asistanı">Hukuk Asistanı</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="cv">
                <FaFileUpload /> CV Yükleme *
              </Label>
              <FileInputWrapper>
                <FileInputLabel htmlFor="cv">
                  <FaFileUpload /> CV Dosyası Seç
                </FileInputLabel>
                <FileInput
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
                {!formData.cv ? (
                  <FileName className={touched.cv && errors.cv ? 'error' : ''}>
                    {fileName}
                  </FileName>
                ) : (
                  <FilePreview>
                    {fileName.endsWith('.pdf') ? (
                      <FaFilePdf />
                    ) : (
                      <FaFileWord />
                    )}
                    <FileInfo>
                      <FileName2>{fileName}</FileName2>
                      <FileSize>{fileSize}</FileSize>
                    </FileInfo>
                    <RemoveFileButton type="button" onClick={handleRemoveFile}>
                      <FaTimesCircle />
                    </RemoveFileButton>
                  </FilePreview>
                )}
                {touched.cv && errors.cv && (
                  <ErrorMessage>
                    <FaExclamationCircle /> {errors.cv}
                  </ErrorMessage>
                )}
              </FileInputWrapper>
            </FormGroup>
            
            <FormGroup className="full-width">
              <Label htmlFor="message">Açıklama</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Kariyer hedeflerinizden kısaca bahsedebilirsiniz..."
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" /> Gönderiliyor...
                </>
              ) : (
                <>
                  <FaCheckCircle /> Başvur
                </>
              )}
            </SubmitButton>
          </Form>
        </FormSection>
        
        <CultureSection>
          <CultureTitle>Biz Kimiz?</CultureTitle>
          <CultureText>
            Taş Hukuk Bürosu olarak, hukuki mükemmelliği ve müvekkil memnuniyetini ön planda tutuyoruz. Ekibimiz, farklı hukuk alanlarında uzmanlaşmış, dinamik ve yenilikçi profesyonellerden oluşmaktadır.
          </CultureText>
          <CultureText>
            Çalışanlarımıza sürekli gelişim fırsatları, mentorluk programları ve destekleyici bir çalışma ortamı sunuyoruz. Bizimle çalışarak, kariyerinizde ilerlerken değerli deneyimler kazanacak ve profesyonel ağınızı genişleteceksiniz.
          </CultureText>
          
          <CultureGrid>
            {cultureValues.map((value, index) => (
              <CultureItem key={index}>
                <CultureIcon className="culture-icon">{value.icon}</CultureIcon>
                <CultureItemTitle>{value.title}</CultureItemTitle>
                <CultureItemText>{value.text}</CultureItemText>
              </CultureItem>
            ))}
          </CultureGrid>
        </CultureSection>
      </Container>
    </CareerSection>
  );
};

export default Career; 