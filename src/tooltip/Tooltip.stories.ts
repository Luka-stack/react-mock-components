import type { Meta, StoryObj } from '@storybook/react';

import TooltipExample from './example';

const meta = {
  title: 'UI/Tooltip',
  component: TooltipExample,
} satisfies Meta<typeof TooltipExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
