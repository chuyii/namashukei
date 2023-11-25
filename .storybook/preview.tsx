import React from 'react';

import type { Preview } from '@storybook/react';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/lib/query';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    ),
  ],
};

export default preview;
