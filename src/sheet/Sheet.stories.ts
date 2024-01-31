import { Meta, StoryObj } from '@storybook/react';
import SheetExample from './example';

const meta = {
  title: 'UI/Sheet',
  component: SheetExample,
} satisfies Meta<typeof SheetExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
