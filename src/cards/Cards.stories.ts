import type { Meta, StoryObj } from '@storybook/react';

import Cards from './example';

const meta = {
  title: 'UI/Cards',
  component: Cards,
} satisfies Meta<typeof Cards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
