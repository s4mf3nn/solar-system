import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 150px 15px 30px 15px;
  
  @media (min-width: 768px) and (max-width:  992px) {
    padding: 200px 240px 0 120px;
  }

  @media (min-width: 992px) and (max-width: 1300px) {
    padding: 200px 360px 0 180px;
  }

  @media (min-width: 1300px) {
    padding: 200px 480px 0 240px;
  }
`;

export const Spacer = styled.div<{ size: string; }>`
  height: ${p => p.size};
`;