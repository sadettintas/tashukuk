import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getAllBlogs, formatBlogData } from '../services/blogService';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BlogSection = styled.section`
  padding: 9rem 5%;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 40%;
    height: 40%;
    background: radial-gradient(circle, rgba(30, 58, 138, 0.05) 0%, rgba(30, 58, 138, 0) 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15%;
    left: -15%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(30, 58, 138, 0.07) 0%, rgba(30, 58, 138, 0) 60%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionTitle = styled(motion.h2)`
  color: ${props => props.theme.colors.primary};
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  position: relative;
  display: inline-block;
  letter-spacing: -0.5px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    border-radius: 4px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.8rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  line-height: 1.9;
  margin-top: 2.5rem;
`;

const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 900px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    max-width: 450px;
  }
`;

const BlogCard = styled(motion.article)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    
    .blog-image {
      transform: scale(1.08);
    }
    
    .read-more {
      color: ${props => props.theme.colors.primary};
      
      svg {
        transform: translateX(6px);
      }
    }
  }
`;

const BlogImageContainer = styled.div`
  height: 240px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 220px;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  class: blog-image;
`;

const BlogCategory = styled.span`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
`;

const BlogContent = styled.div`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BlogDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.lightText};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  svg {
    color: ${props => props.theme.colors.accent};
    font-size: 1rem;
  }
`;

const BlogTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem;
  font-size: 1.4rem;
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
  height: 3.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.7;
  flex-grow: 1;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.8rem;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  text-decoration: none;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  class: read-more;
  font-size: 0.95rem;
  
  svg {
    transition: transform 0.3s ease;
  }
`;

const MoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  padding: 1.3rem 3.5rem;
  border-radius: 50px;
  margin-top: 4rem;
  font-weight: 600;
  font-size: 1.15rem;
  transition: all 0.3s ease;
  box-shadow: 0 12px 30px rgba(30, 58, 138, 0.2);
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-4px);
    box-shadow: 0 18px 35px rgba(37, 99, 235, 0.25);
  }
  
  svg {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
  }
  
  &:hover svg {
    transform: translateX(6px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid ${props => props.theme.colors.accent};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e53e3e;
  padding: 2rem;
  background-color: #fff5f5;
  border-radius: 8px;
  margin: 2rem 0;
  font-weight: 500;
`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        const formattedData = formatBlogData(data);
        setBlogs(formattedData);
        setError(null);
      } catch (error) {
        console.error('Blog verileri yüklenirken hata oluştu:', error);
        setError('Blog yazıları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <BlogSection id="blog" role="region" aria-label="Hukuki Blog Yazıları">
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Hukuki Blog
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hukuk dünyasındaki son gelişmeleri takip edin, güncel bilgiler edinin ve hukuki konularda bilgi sahibi olun. 
            Uzman avukatlarımızın kaleme aldığı makaleler ile hukuki sorularınıza yanıt bulun.
          </SectionSubtitle>
        </Header>
        
        {loading ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <BlogGrid
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {blogs.slice(0, 4).map((post, index) => (
              <BlogCard
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogImageContainer>
                  <BlogImage src={post.image} alt={post.title} className="blog-image" />
                  <BlogCategory>{post.category}</BlogCategory>
                </BlogImageContainer>
                <BlogContent>
                  <BlogDate>
                    <FaCalendarAlt />
                    {post.date}
                  </BlogDate>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <ReadMoreLink to={`/blog/${post.slug}`} className="read-more">
                    Devamını Oku
                    <FaArrowRight />
                  </ReadMoreLink>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        )}
        
        <div style={{ textAlign: 'center' }}>
          <MoreButton 
            to="/blog"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Tüm Yazıları Görüntüle
            <FaArrowRight />
          </MoreButton>
        </div>
      </Container>
    </BlogSection>
  );
};

export default Blog;