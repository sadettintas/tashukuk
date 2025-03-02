import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaSearch, FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { getAllBlogs, formatBlogData } from '../services/blogService';

const BlogPageContainer = styled.main`
  padding-top: 60px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.9)),
              url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000') center/cover no-repeat;
  padding: 5rem 5%;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  max-width: 850px;
  margin: 0 auto 2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  border-radius: 50px;
  border: none;
  font-size: 1.1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.lightText};
`;

const BlogSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.colors.lightBg};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
  }
`;

const BlogImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogCategory = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1;
`;

const BlogContent = styled.div`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.lightText};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  
  svg {
    font-size: 1rem;
  }
`;

const BlogTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem;
  font-size: 1.4rem;
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.primary};
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  text-decoration: none;
  gap: 0.5rem;
  margin-top: auto;
  position: relative;
  padding-bottom: 0.2rem;
  align-self: flex-start;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const CategoryFilter = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const CategoryButton = styled.button`
  background-color: ${props => props.active ? props.theme.colors.accent : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.accent : '#e2e8f0'};
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.accent : '#f8fafc'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.lightText};
  font-size: 1.2rem;
  grid-column: 1 / -1;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.theme.colors.accent};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.error};
  font-size: 1.2rem;
`;

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch blogs from API
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
  
  // Extract unique categories from blog data
  const categories = ['Tümü', ...new Set(blogs.map(post => post.category))];
  
  // Filter blogs based on search term and category
  useEffect(() => {
    let filtered = [...blogs];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, blogs]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Helmet>
        <title>Hukuki Blog | Taş Hukuk Bürosu</title>
        <meta name="description" content="Hukuk dünyasındaki son gelişmeleri takip edin, güncel bilgiler edinin ve hukuki konularda bilgi sahibi olun. Uzman avukatlarımızın kaleme aldığı makaleler ile hukuki sorularınıza yanıt bulun." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hukuki Blog | Taş Hukuk Bürosu" />
        <meta property="og:description" content="Hukuk dünyasındaki son gelişmeleri takip edin, güncel bilgiler edinin ve hukuki konularda bilgi sahibi olun." />
        <meta property="og:image" content={`${window.location.origin}/images/blog-hero.jpg`} />
        <meta property="og:url" content={`${window.location.origin}/blog`} />
        <meta property="og:site_name" content="Taş Hukuk Bürosu" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hukuki Blog | Taş Hukuk Bürosu" />
        <meta name="twitter:description" content="Hukuk dünyasındaki son gelişmeleri takip edin, güncel bilgiler edinin ve hukuki konularda bilgi sahibi olun." />
        <meta name="twitter:image" content={`${window.location.origin}/images/blog-hero.jpg`} />
        
        {/* Schema.org yapılandırılmış veri */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Hukuki Blog | Taş Hukuk Bürosu",
            "description": "Hukuk dünyasındaki son gelişmeleri takip edin, güncel bilgiler edinin ve hukuki konularda bilgi sahibi olun.",
            "url": `${window.location.origin}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": "Taş Hukuk Bürosu",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo.png`
              }
            }
          })}
        </script>
      </Helmet>
      
      <BlogPageContainer>
        <HeroSection>
          <HeroTitle>Hukuki Blog</HeroTitle>
          <HeroSubtitle>
            Güncel hukuki konular, yasal düzenlemeler ve haklarınız hakkında bilgilendirici içerikler
          </HeroSubtitle>
          <SearchContainer>
            <SearchIconWrapper>
              <FaSearch />
            </SearchIconWrapper>
            <SearchInput 
              type="text" 
              placeholder="Blog yazılarında ara..." 
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Blog yazılarında ara"
            />
          </SearchContainer>
        </HeroSection>
        
        <BlogSection>
          <Container>
            <CategoryFilter>
              {categories.map((category, index) => (
                <CategoryButton 
                  key={index}
                  active={selectedCategory === category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </CategoryFilter>
            
            {loading ? (
              <LoadingContainer>
                <LoadingSpinner />
              </LoadingContainer>
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : (
              <BlogGrid>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <BlogCard
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <BlogImageContainer>
                        <BlogImage src={post.image} alt={post.title} />
                        <BlogCategory>{post.category}</BlogCategory>
                      </BlogImageContainer>
                      <BlogContent>
                        <BlogMeta>
                          <MetaItem>
                            <FaCalendarAlt />
                            {post.date}
                          </MetaItem>
                          <MetaItem>
                            <FaUser />
                            {post.author}
                          </MetaItem>
                        </BlogMeta>
                        <BlogTitle>{post.title}</BlogTitle>
                        <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                        <ReadMoreLink to={`/blog/${post.slug}`}>
                          Devamını Oku
                          <FaArrowRight />
                        </ReadMoreLink>
                      </BlogContent>
                    </BlogCard>
                  ))
                ) : (
                  <NoResults>
                    Arama kriterlerinize uygun blog yazısı bulunamadı.
                  </NoResults>
                )}
              </BlogGrid>
            )}
          </Container>
        </BlogSection>
      </BlogPageContainer>
    </>
  );
};

export default BlogPage;