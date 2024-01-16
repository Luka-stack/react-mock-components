import type { Meta, StoryObj } from '@storybook/react';

import DropdownMenuExample from './example';

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenuExample,
} satisfies Meta<typeof DropdownMenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
