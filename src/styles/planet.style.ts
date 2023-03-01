import styled from 'styled-components';

export const Wrapper = styled.div`
  color: #fff;
  padding: 30px 15px 30px;

  @media (min-width: 768px) and (max-width:  992px) {
    padding: 50px 120px 0;
  }

  @media (min-width: 992px) and (max-width: 1300px) {
    padding: 50px 180px 0;
  }

  @media (min-width: 1300px) {
    padding: 50px 240px 0;
    width: 45%;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Divider = styled.div<{ color: string; }>`
  border-top: 1px solid ${p => p.color};
`;

export const Spacer = styled.div<{ size: string; }>`
  height: ${p => p.size};
`;

export const InfoContainer = styled.div`
  @media (min-width: 1300px) {
    width: 45%;
  }
`;

export const MoonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
export const Moon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: ${p => p.color};
`;