import styled from 'styled-components';

export const Heading1 = styled.h1<{ color: string; }>`
  color: ${p => p.color};
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
`;

export const Heading2 = styled.h2<{ color: string; }>`
  color: ${p => p.color};
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;