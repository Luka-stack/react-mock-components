import type { Meta, StoryObj } from '@storybook/react';

import HeadlessModalExample from './example';

const meta = {
  title: 'UI/HeadlessModal',
  component: HeadlessModalExample,
} satisfies Meta<typeof HeadlessModalExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
