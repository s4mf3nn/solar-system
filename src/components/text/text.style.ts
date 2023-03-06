import styled from 'styled-components';

export const Text = styled.p<{ color: string; ellipsis?: boolean; bold: boolean; paragraph?: boolean; }>`
  color: ${p => p.color};
  font-family: 'Poppins';
  display: ${p => p.ellipsis ? '-webkit-box' : ''};
  font-size: .8rem;
  font-weight: ${p => p.bold ? '700' : '400'};
  line-height:${p => p.paragraph ? '25px' : ''};
  opacity: .8;
  overflow: ${p => p.ellipsis ? 'hidden' : 'none'};
  margin: 0;
  text-overflow: ${p => p.ellipsis ? 'ellipsis' : 'none'};
  -webkit-line-clamp:${p => p.ellipsis ? '2' : 'none'};
  -webkit-box-orient: ${p => p.ellipsis ? 'vertical' : 'none'};
`;