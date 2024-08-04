// In GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif; // Example: Using Poppins from Google Fonts
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  h1, h2, h3 {
    font-weight: 600;
  }

  p {
    line-height: 1.6;
  }
`;

export default GlobalStyles;