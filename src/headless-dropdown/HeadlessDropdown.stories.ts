import type { Meta, StoryObj } from '@storybook/react';

import HeadlessDropdownExample from './example';

const meta = {
  title: 'UI/HeadlessDropdown',
  component: HeadlessDropdownExample,
} satisfies Meta<typeof HeadlessDropdownExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
