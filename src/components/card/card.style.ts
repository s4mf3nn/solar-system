import styled from 'styled-components';

export const Wrapper = styled.div`
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const PlanetIcon = styled.div`
  background-color: ${p => p.color};
  border-radius: 36px;
  height: 36px;
  width: 36px;
`;

export const Spacer = styled.div<{ size: string; }>`
  height: ${p => p.size};
`;

export const Divider = styled.div<{ color: string; }>`
  border-top: 1px solid ${p => p.color};
  opacity: .4;
`;