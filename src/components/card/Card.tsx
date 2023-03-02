import { FC } from 'react';
import { ArrowRight } from 'react-feather';
import { Heading, Text } from '../index';
import * as sc from './card.style';

interface CardProps {
  id: string,
  name: string,
  description?: string,
  planetColor: string,
}

export const Card: FC<CardProps> = ({ id, name, description, planetColor }) => {
  return (
    <sc.Wrapper href={`/planets/${id}`}>
      <sc.Header>
        <Heading type="h2" color="#fff">{name}</Heading>
        <sc.PlanetIcon color={planetColor} />
      </sc.Header>
      <sc.Spacer size=".5rem" />
      <Text color="#fff" ellipsis={true} bold={false}>{description!}</Text>
      <sc.Spacer size="1rem" />
      <sc.SeeMore>
        See more
        <ArrowRight />
      </sc.SeeMore>
      <sc.Spacer size="1rem" />
      <sc.Divider color="#fff" />
    </sc.Wrapper>
  );
};