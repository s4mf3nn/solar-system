import styled from 'styled-components';

export const Btn = styled.button<{ color: string; }>`
  background-color: transparent;
  border: 1px solid ${p => p.color};
  border-radius: 50px;
  color: ${p => p.color};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 48px;
`;