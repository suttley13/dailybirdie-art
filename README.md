Generated daily course art for Daily Birdie.

## Asset CDN

The `daily-birdie-assets` Vercel project also deploys this repository's `main`
branch. `scripts/build-assets.mjs` copies runtime JSON/JPEG files into
`public-assets/`; generation runs, audit material and build source are excluded.
Content-addressed files cache for a year. Mutable manifests, pair indexes,
replacement registries and numbered art revalidate with a five-second CDN TTL.
GitHub Pages remains available for installed app versions and fallback delivery.
