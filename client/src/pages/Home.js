import Hero from '../components/Hero';
import Services from '../components/Services';
import Trust from '../components/Trust';
import Blog from '../components/Blog';
import styled from 'styled-components';

const MainContent = styled.main`
  scroll-behavior: smooth;
  overflow-x: hidden;
`;

const Home = () => {
  return (
    <MainContent role="main">
      <Hero />
      <Services />
      <Trust />
      <Blog />
    </MainContent>
  );
};

export default Home;