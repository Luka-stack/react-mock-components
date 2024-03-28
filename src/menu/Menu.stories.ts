import type { Meta, StoryObj } from '@storybook/react';

import MenuExample from './example';

const meta = {
  title: 'UI/Menu',
  component: MenuExample,
} satisfies Meta<typeof MenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
