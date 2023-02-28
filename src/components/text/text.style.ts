import styled from 'styled-components';

export const Text = styled.text<{ color: string; ellipsis: boolean; bold: boolean; }>`
  color: ${p => p.color};
  font-family: 'Poppins', sans-serif;
  font-size: .8rem;
  font-weight: ${p => p.bold ? '700' : '400'};
  opacity: .85;
  overflow: ${p => p.ellipsis ? 'hidden' : 'none'};
  text-overflow: ${p => p.ellipsis ? 'ellipsis' : 'none'};
  display: ${p => p.ellipsis ? '-webkit-box' : ''};
  -webkit-line-clamp:${p => p.ellipsis ? '2' : 'none'};
  -webkit-box-orient: ${p => p.ellipsis ? 'vertical' : 'none'};
`;