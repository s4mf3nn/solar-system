import { FC } from 'react';
import { Heading, Link, Text } from '../index';
import * as sc from './card.style';

interface CardProps { }
export const Card: FC<CardProps> = () => {
  return (
    <sc.Wrapper>
      <sc.Header>
        <Heading type="h2" color="#fff">Mars</Heading>
        <sc.PlanetIcon color="#db273c" />
      </sc.Header>
      <sc.Spacer size=".5rem" />
      <Text color="#fff" ellipsis={true} bold={false}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum.</Text>
      <sc.Spacer size="1rem" />
      <Link to="/planets/mars" label="See more" />
      <sc.Spacer size="1rem" />
      <sc.Divider />
    </sc.Wrapper>
  );
};