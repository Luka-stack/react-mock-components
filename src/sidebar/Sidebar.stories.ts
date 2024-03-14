import type { Meta, StoryObj } from '@storybook/react';

import SidebarExample from './example';

const meta = {
  title: 'UI/Sidebar',
  component: SidebarExample,
} satisfies Meta<typeof SidebarExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
