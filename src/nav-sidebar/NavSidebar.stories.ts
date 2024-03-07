import type { Meta, StoryObj } from '@storybook/react';

import NavSidebarExample from './example';

const meta = {
  title: 'UI/NavSidebar',
  component: NavSidebarExample,
} satisfies Meta<typeof NavSidebarExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
