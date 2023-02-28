import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from './Link';

export default {
  title: 'Collection/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  to: '/planets/earth',
  label: 'See more',
};