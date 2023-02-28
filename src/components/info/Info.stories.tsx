import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Info } from './Info';

export default {
  title: 'Collection/Info',
  component: Info,
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  color: "#fff",
  title: "227,939,200 km",
  subtitles: ["Distance from the Sun"],
};

export const Moon = Template.bind({});
Moon.args = {
  color: "#fff",
  title: "Phobos",
  subtitles: ["Distance from Mars : 9,378 km", "Radius : 11.1 km"],
};