import type { Meta, StoryObj } from '@storybook/react';

import CountdownCircle from '.';

const meta: Meta<typeof CountdownCircle> = {
  title: 'CountdownCircle',
  component: CountdownCircle,
};

export default meta;
type Story = StoryObj<typeof CountdownCircle>;

export const Normal: Story = {
  args: { timeLeft: 0 },
};
