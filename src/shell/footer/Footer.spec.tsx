// @vitest-environment jsdom
// SPDX-License-Identifier: LicenseRef-Blockscout

import React from 'react';

import { expect, it } from 'vitest';
import withEnvs from 'vitest/utils/mockEnvs';

const COMMIT = 'a9daf05f';
const TAG = 'v1.0.0';
const VIA_REPOSITORY_URL = 'https://github.com/vianetwork/blockscout-frontend';

it.each([
  {
    name: 'links commits to upstream by default',
    repository: '', tag: '', label: COMMIT,
    url: 'https://github.com/blockscout/frontend/commit/a9daf05f',
  },
  {
    name: 'links tags to upstream by default',
    repository: '', tag: TAG, label: TAG,
    url: 'https://github.com/blockscout/frontend/tree/v1.0.0',
  },
  {
    name: 'links Via commits to the fork',
    repository: VIA_REPOSITORY_URL, tag: '', label: COMMIT,
    url: 'https://github.com/vianetwork/blockscout-frontend/commit/a9daf05f',
  },
  {
    name: 'prefers the tag when a Via build also has a commit',
    repository: VIA_REPOSITORY_URL, tag: TAG, label: TAG,
    url: 'https://github.com/vianetwork/blockscout-frontend/tree/v1.0.0',
  },
  {
    name: 'accepts a trailing slash in the repository URL',
    repository: `${ VIA_REPOSITORY_URL }/`, tag: '', label: COMMIT,
    url: 'https://github.com/vianetwork/blockscout-frontend/commit/a9daf05f',
  },
])('$name', async({ repository, tag, label, url }) => {
  await withEnvs([
    [ 'NEXT_PUBLIC_GIT_REPOSITORY_URL', repository ],
    [ 'NEXT_PUBLIC_GIT_COMMIT_SHA', COMMIT ],
    [ 'NEXT_PUBLIC_GIT_TAG', tag ],
  ], async() => {
    const { render, screen, cleanup } = await import('vitest/lib');
    const { 'default': Footer } = await import('./Footer');

    try {
      render(<Footer/>);
      expect(screen.getByRole('link', { name: label }).getAttribute('href')).toBe(url);
    } finally {
      cleanup();
    }
  });
});
