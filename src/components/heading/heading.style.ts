import styled from 'styled-components';

export const Heading1 = styled.h1<{ color: string; }>`
  color: ${p => p.color};
  font-size: 4rem;
  font-weight: 700;
  margin: -10px -4px;
`;

export const Heading2 = styled.h2<{ color: string; }>`
  color: ${p => p.color};
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

export const Heading3 = styled.h3<{ color: string; }>`
  color: ${p => p.color};
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;