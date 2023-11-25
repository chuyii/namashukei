const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx}': ['prettier --write'],
  '*.{ts,tsx}': [
    () => 'tsc --incremental false --noEmit',
    buildEslintCommand,
    'prettier --write',
  ],
  '*.{html,css,json}': ['prettier --write'],
};
