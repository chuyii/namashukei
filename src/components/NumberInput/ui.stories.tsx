import type { Meta, StoryObj } from '@storybook/react';

import NumberInput from '.';

const meta: Meta<typeof NumberInput> = {
  title: 'NumberInput',
  component: NumberInput,
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Normal: Story = {
  args: { className: 'w-full', unit: 'km', disabled: false, isInvalid: false },
};
