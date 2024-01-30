import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';

const meta = {
  title: 'UI/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Badge',
    size: 'default',
  },
};
