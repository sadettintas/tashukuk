import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { getAllBlogs, formatBlogData } from '../services/blogService';

const BlogDetailContainer = styled.main`
  padding: 120px 5% 60px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 100px 5% 40px;
  }
`;

const BlogHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const BlogTitle = styled.h1`
  font-size: 2.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  line-height: 1.3;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  
  svg {
    color: ${props => props.theme.colors.accent};
  }
`;

const BlogImage = styled.img`
  width: 100%;
  max-height: 550px;
  object-fit: cover;
  margin-bottom: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const BlogContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2, h3, h4 {
    color: ${props => props.theme.colors.primary};
    margin: 2rem 0 1rem;
  }
  
  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.accent};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: ${props => props.theme.colors.lightText};
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 3rem;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(-5px);
  }
`;

const SocialShareContainer = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const SocialShareTitle = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || props.theme.colors.primary};
  color: white;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
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

const BlogDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        // API'den tüm blog yazılarını çek
        const blogs = await getAllBlogs();
        // Blog yazılarını formatla
        const formattedBlogs = formatBlogData(blogs);
        // Slug'a göre blog yazısını bul
        const post = formattedBlogs.find(post => post.slug === slug);
        
        if (post) {
          setBlogPost(post);
        } else {
          setError('Blog yazısı bulunamadı.');
        }
      } catch (err) {
        console.error('Blog yazısı yüklenirken hata oluştu:', err);
        setError('Blog yazısı yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [slug]);
  
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }
  
  if (error || !blogPost) {
    return (
      <BlogDetailContainer>
        <p>{error || 'Blog yazısı bulunamadı.'}</p>
        <BackLink to="/blog">Blog Listesine Geri Dön</BackLink>
      </BlogDetailContainer>
    );
  }
  
  // Tam URL oluştur
  const fullUrl = `${window.location.origin}${location.pathname}`;
  
  // Paylaşım URL'leri
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(fullUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(blogPost.title + ' ' + fullUrl)}`;
  
  // Schema.org yapılandırılmış veri
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blogPost.title,
    "author": {
      "@type": "Person",
      "name": blogPost.author
    },
    "datePublished": blogPost.date,
    "dateModified": blogPost.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Taş Hukuk Bürosu",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "image": blogPost.image
  };

  return (
    <>
      <Helmet>
        <title>{blogPost.title} | Taş Hukuk Bürosu</title>
        <meta name="description" content={blogPost.excerpt} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={blogPost.image} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="Taş Hukuk Bürosu" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={blogPost.image} />
        
        {/* Schema.org yapılandırılmış veri */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <BlogDetailContainer>
        <BlogHeader>
          <BlogTitle>{blogPost.title}</BlogTitle>
          <BlogMeta>
            <MetaItem>
              <FaCalendarAlt />
              {blogPost.date}
            </MetaItem>
            <MetaItem>
              <FaUser />
              {blogPost.author}
            </MetaItem>
          </BlogMeta>
          <BlogImage src={blogPost.image} alt={blogPost.title} />
        </BlogHeader>
        
        <BlogContent dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        
        <SocialShareContainer>
          <SocialShareTitle>Bu Yazıyı Paylaşın</SocialShareTitle>
          <SocialButtons>
            <SocialButton 
              href={linkedinShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              bgColor="#0077B5"
              aria-label="LinkedIn'de paylaş"
            >
              <FaLinkedin />
            </SocialButton>
            <SocialButton 
              href={twitterShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              bgColor="#1DA1F2"
              aria-label="Twitter'da paylaş"
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton 
              href={facebookShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              bgColor="#3B5998"
              aria-label="Facebook'ta paylaş"
            >
              <FaFacebook />
            </SocialButton>
            <SocialButton 
              href={whatsappShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              bgColor="#25D366"
              aria-label="WhatsApp'ta paylaş"
            >
              <FaWhatsapp />
            </SocialButton>
          </SocialButtons>
        </SocialShareContainer>
        
        <BackLink to="/blog">Blog Listesine Geri Dön</BackLink>
      </BlogDetailContainer>
    </>
  );
};

export default BlogDetail;
