import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Close } from './Close';

export default {
  title: 'Collection/Close',
  component: Close,
} as ComponentMeta<typeof Close>;

const Template: ComponentStory<typeof Close> = () => <Close />;

export const Overview = Template.bind({});