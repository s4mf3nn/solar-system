import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Heading } from './Heading';

export default {
  title: 'Collection/Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  type: 'h1',
  color: '#fff',
  children: 'Explore',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  type: 'h2',
  color: '#fff',
  children: 'Jupiter',
};