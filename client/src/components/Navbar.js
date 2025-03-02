import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  z-index: 1000;
  background: ${props => props.isScrolled ? 'white' : 'rgba(255, 255, 255, 0.98)'};
  box-shadow: ${props => props.isScrolled 
    ? '0 4px 15px rgba(0, 0, 0, 0.08)' 
    : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Logo = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.primary};
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease-in-out;
  letter-spacing: -0.5px;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 100%;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 70px; /* Align with navbar height */
    right: 0;
    height: calc(100vh - 70px);
    width: 280px;
    background: white;
    padding: 2rem;
    box-shadow: -2px 4px 15px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
    gap: 1.5rem;
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0 0.5rem;
  height: 70px;
  display: flex;
  align-items: center;
  position: relative;
  transition: color 0.3s ease;
  margin: 0 0.8rem;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: ${props => props.theme.colors.accent};
    transition: all 0.3s ease;
  }

  &:hover::after {
    height: 3px;
  }

  &.active {
    color: ${props => props.theme.colors.accent};
    font-weight: 600;

    &::after {
      height: 4px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: 0;
    height: auto;
    padding: 0.8rem 0;
    width: 100%;
    
    &::after {
      bottom: -5px;
      width: 40px;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease-in-out, transform 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: scale(1.05);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.isOpen ? 1 : 0};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized above tablet breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Nav isScrolled={isScrolled}>
      <Container>
        <Logo to="/">
          Taş Hukuk Bürosu
        </Logo>
        <MenuButton 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink 
            to="/"
            className={isActive('/') ? 'active' : ''}
          >
            Ana Sayfa
          </NavLink>
          <NavLink 
            to="/hakkimizda" 
            className={isActive('/hakkimizda') ? 'active' : ''}
          >
            Hakkımızda
          </NavLink>
          <NavLink 
            to="/hizmetler"
            className={location.pathname.includes('/hizmetler') ? 'active' : ''}
          >
            Hizmetler
          </NavLink>
          <NavLink 
            to="/blog" 
            className={isActive('/blog') ? 'active' : ''}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/kariyer" 
            className={isActive('/kariyer') ? 'active' : ''}
          >
            Kariyer
          </NavLink>
          <NavLink 
            to="/iletisim" 
            className={isActive('/iletisim') ? 'active' : ''}
          >
            İletişim
          </NavLink>
        </NavLinks>
        <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      </Container>
    </Nav>
  );
};

export default Navbar;