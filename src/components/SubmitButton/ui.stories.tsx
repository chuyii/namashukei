import type { Meta, StoryObj } from '@storybook/react';

import SubmitButton from '.';

const meta: Meta<typeof SubmitButton> = {
  title: 'SubmitButton',
  component: SubmitButton,
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Normal: Story = {
  args: { children: '送信', className: 'w-full', isLoading: false },
};
