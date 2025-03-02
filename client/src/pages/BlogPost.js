import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import blogData from '../data/blogData';
import ReactMarkdown from 'react-markdown';

const BlogPostSection = styled.section`
  padding: 8rem 5% 5rem;
  background-color: ${props => props.theme.colors.lightBg};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.primary};
  line-height: 1.3;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  
  svg {
    font-size: 1.1rem;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Content = styled(motion.article)`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    font-family: ${props => props.theme.fonts.primary};
  }
  
  h3 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    font-family: ${props => props.theme.fonts.primary};
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const BlogPost = () => {
  const { slug } = useParams();
  const currentPost = blogData.find(post => post.slug === slug) || {
    title: 'Sayfa Bulunamadı',
    excerpt: 'Bu blog yazısı mevcut değil.',
    content: 'İstediğiniz blog yazısına ulaşılamadı.',
    author: '',
    date: '',
    image: '/images/placeholder/blog1.jpg'
  };

  return (
    <BlogPostSection>
      <Helmet>
        <title>{currentPost.title} | Taş Hukuk Bürosu</title>
        <meta name="description" content={currentPost.excerpt} />
        <meta property="og:title" content={currentPost.title} />
        <meta property="og:description" content={currentPost.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={currentPost.image} />
        <meta property="article:published_time" content={currentPost.date} />
        <meta property="article:author" content={currentPost.author} />
        {currentPost.tags?.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>
      
      <Container>
        <Header>
          <Title>{currentPost.title}</Title>
          <Meta>
            <MetaItem>
              <CalendarTodayIcon />
              {currentPost.date}
            </MetaItem>
            <MetaItem>
              <PersonIcon />
              {currentPost.author}
            </MetaItem>
          </Meta>
        </Header>

        <FeaturedImage src={currentPost.image} alt={currentPost.title} />
        
        <Content
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ReactMarkdown>{currentPost.content}</ReactMarkdown>
        </Content>

        <BackLink to="/blog">Blog Listesine Geri Dön</BackLink>
      </Container>
    </BlogPostSection>
  );
};

export default BlogPost;