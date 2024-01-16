import type { Meta, StoryObj } from '@storybook/react';

import DropdonwComponent from '.';

const meta = {
  title: 'UI/Dropdown',
  component: DropdonwComponent,
} satisfies Meta<typeof DropdonwComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
