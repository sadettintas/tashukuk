import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; // Account for fixed header
  }

  body {
    font-family: ${props => props.theme.fonts.secondary};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.primary};
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Accessibility improvements */
  :focus {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Remove tap highlight on iOS */
  -webkit-tap-highlight-color: transparent;

  /* Better text rendering */
  text-rendering: optimizeLegibility;

  /* Smooth scrolling - only if user hasn't requested reduced motion */
  @media screen and (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }
`;