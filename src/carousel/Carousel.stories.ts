import type { Meta, StoryObj } from '@storybook/react';

import CarouselExample from './example';

const meta = {
  title: 'UI/Carousel',
  component: CarouselExample,
} satisfies Meta<typeof CarouselExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
