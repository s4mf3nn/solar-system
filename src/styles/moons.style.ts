import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 30px 15px 30px;
  
  @media (min-width: 768px) and (max-width:  992px) {
    padding: 50px 120px 0;
  }

  @media (min-width: 992px) and (max-width: 1300px) {
    padding: 50px 180px 0;
  }

  @media (min-width: 1300px) {
    padding: 50px 240px 0;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  width: 100%;
  
  @media (min-width: 768px) and (max-width: 1200px) {
    width: calc((100% / 2) - (4rem / 2));
    margin-right: 4rem;
    margin-bottom: 4rem;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1200px) {
    width: calc((100% / 3) - (8rem / 3));
    margin-right: 4rem;
    margin-bottom: 4rem;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

export const Spacer = styled.div<{ size: string; }>`
  height: ${p => p.size};
`;