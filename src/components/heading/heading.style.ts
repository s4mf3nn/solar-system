import styled from 'styled-components';

export const Heading1 = styled.h1<{ color: string; capitalize?: boolean; }>`
  color: ${p => p.color};
  font-family: 'Poppins';
  font-size: 4rem;
  font-weight: 700;
  margin: -10px -4px;
  text-transform: ${p => p.capitalize ? 'capitalize' : 'none'};
`;

export const Heading2 = styled.h2<{ color: string; capitalize?: boolean; }>`
  color: ${p => p.color};
  font-family: 'Poppins';
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-transform: ${p => p.capitalize ? 'capitalize' : 'none'};
`;

export const Heading3 = styled.h3<{ color: string; capitalize?: boolean; }>`
  color: ${p => p.color};
  font-family: 'Poppins';
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-transform: ${p => p.capitalize ? 'capitalize' : 'none'};
`;