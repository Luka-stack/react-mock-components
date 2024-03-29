import type { Meta, StoryObj } from '@storybook/react';

import ModalExample from './example';

const meta = {
  title: 'UI/Modal',
  component: ModalExample,
} satisfies Meta<typeof ModalExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
