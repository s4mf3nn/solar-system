import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Close } from './Close';

export default {
  title: 'Collection/Close',
  component: Close,
} as ComponentMeta<typeof Close>;

const Template: ComponentStory<typeof Close> = (args) => <Close {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  color: '#fff',
};