import MultipleChoiceForm from './ui';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MultipleChoiceForm> = {
  title: 'MultipleChoiceForm',
  component: MultipleChoiceForm,
  decorators: [(story) => <div className="mx-auto max-w-sm">{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof MultipleChoiceForm>;

export const Normal: Story = {
  args: {
    request: {
      type: 'M',
      choices: ['A', 'B', 'C', 'D'],
    },
    onSubmit: async (_) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    answer: 0,
  },
};

export const SubmitError: Story = {
  args: {
    request: {
      type: 'M',
      choices: ['A', 'B', 'C', 'D'],
    },
    onSubmit: (_) => {
      throw new Error();
    },
  },
};
