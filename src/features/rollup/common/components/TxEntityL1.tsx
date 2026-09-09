// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import * as TxEntity from 'src/slices/tx/components/entity/TxEntity';

import config from 'src/config';

const rollupFeature = config.features.rollup;

const TxEntityL1 = (props: TxEntity.EntityProps) => {
  if (!rollupFeature.isEnabled) {
    return null;
  }

  const isVia = rollupFeature.type === 'via';
  const parentHash = isVia ? props.hash.replace(/^0x/i, '') : props.hash;
  // Via exposes zero / repeated-0x11 execution markers, not Bitcoin transactions.
  const isExecutionMarker = isVia && /^(?:0{64}|1{64})$/.test(parentHash);

  const defaultHref = rollupFeature.parentChain.baseUrl + route({
    pathname: '/tx/[hash]',
    query: { hash: parentHash },
  });

  return (
    <TxEntity.default
      { ...props }
      href={ props.href ?? defaultHref }
      noLink={ props.noLink || isExecutionMarker }
      link={{ external: true }}
    />
  );
};

export default chakra(TxEntityL1);
