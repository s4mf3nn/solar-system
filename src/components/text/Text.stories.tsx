import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from './Text';

export default {
  title: 'Collection/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  color: '#fff',
  bold: false,
  ellipsis: true,
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis amet...',
};

export const Bold = Template.bind({});
Bold.args = {
  color: '#fff',
  bold: true,
  ellipsis: false,
  children: 'Solar System',
};