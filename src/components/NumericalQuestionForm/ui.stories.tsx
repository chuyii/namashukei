import NumericalQuestionForm from './ui';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NumericalQuestionForm> = {
  title: 'NumericalQuestionForm',
  component: NumericalQuestionForm,
  decorators: [(story) => <div className="mx-auto max-w-sm">{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof NumericalQuestionForm>;

export const Normal: Story = {
  args: {
    request: {
      type: 'N',
      step: 1,
      unit: 'km',
    },
    onSubmit: async (_) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    answer: 3,
  },
};

export const SubmitError: Story = {
  args: {
    request: {
      type: 'N',
      step: 1,
      unit: 'km',
    },
    onSubmit: (_) => {
      throw new Error();
    },
  },
};
