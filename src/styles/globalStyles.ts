import { createGlobalStyle } from 'styled-components';

// Generate global style for the whole app
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }
`;

export default GlobalStyle;