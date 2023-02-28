import { FC } from 'react';
import { Heading, Text } from '../index';
import * as sc from './info.style';

interface InfoProps {
  color: string;
  title: string;
  subtitles: string[];
}

export const Info: FC<InfoProps> = ({ color, title, subtitles }) => {
  return (
    <sc.Wrapper>
      <Heading type="h3" color={color}>{title}</Heading>
      {subtitles.map((item, i) =>
        <Text
          key={i}
          color={color}
          ellipsis={true}
          bold={false}>
          {item}
        </Text>)
      }
      <sc.Spacer size="1rem" />
      <sc.Divider color={color} />
    </sc.Wrapper>
  );
};