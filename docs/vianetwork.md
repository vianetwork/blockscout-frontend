# Via Network fork notes

This fork contains Via Network-specific frontend support on top of the upstream Blockscout frontend.

Current fork-specific additions include:
- `via` rollup type support in the frontend
- Via batch routes and homepage latest-batch integration
- Via-specific API resource wiring for batch pages
- Via-specific local environment preset at `configs/envs/.env.via_sepolia`
- local script fallback for repositories without Git tags (`NEXT_PUBLIC_GIT_TAG=dev`)

## Local development

The easiest way to run this fork locally against the Via Sepolia backend is:

```sh
cp configs/envs/.env.via_sepolia .env.local
```

After copying, `.env.local` should already keep the local app settings as:

```env
NEXT_PUBLIC_APP_PROTOCOL=http
NEXT_PUBLIC_APP_HOST=localhost
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_APP_ENV=development
```

The Via Sepolia backend settings should remain pointed at the hosted explorer API:

```env
NEXT_PUBLIC_API_PROTOCOL=https
NEXT_PUBLIC_API_HOST=testnet.blockscout.onvia.org
NEXT_PUBLIC_API_BASE_PATH=/
NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL=wss
NEXT_PUBLIC_NETWORK_NAME=Via Sepolia
NEXT_PUBLIC_NETWORK_RPC_URL=https://via.testnet.viablockchain.dev
NEXT_PUBLIC_ROLLUP_TYPE=via
```

Then run:

```sh
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000
```

If port 3000 is already in use, change `NEXT_PUBLIC_APP_PORT` in `.env.local` and rerun `pnpm dev`.

## Useful validation commands

```sh
pnpm lint:tsc
pnpm build
```

## Notes

- Upstream documentation still applies for the general Blockscout frontend architecture and Docker-based distribution model.
- This document only describes fork-specific Via Network behavior and local development notes.
