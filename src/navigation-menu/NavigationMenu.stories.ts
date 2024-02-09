import type { Meta, StoryObj } from '@storybook/react';

import NavigationMenuExample from './example';

const meta = {
  title: 'UI/NavigationMenu',
  component: NavigationMenuExample,
} satisfies Meta<typeof NavigationMenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
