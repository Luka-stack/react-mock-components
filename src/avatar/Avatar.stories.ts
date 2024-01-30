import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './exmaple';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
