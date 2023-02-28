import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Search } from './Search';

export default {
  title: 'Collection/Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  placeholder: "Search for a planet"
};