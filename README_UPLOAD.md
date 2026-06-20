Hosting upload instructions
---------------------------

1) Build and export static site locally

```bash
pnpm install
pnpm run export
# result: `out/` directory
```

2) Prepare files for Hostinger (Shared hosting)
- Upload contents of `out/` (NOT the `out` folder itself) into `public_html`.
- Also upload the `.htaccess` file from repository root to `public_html`.

3) Verify
- Open your domain; check console/network for missing assets and fix paths if needed.

Notes:
- API routes and server-side features will not work after static export.
- If you need server features, use a Node-capable host (VPS, Hostinger Node plan, or Vercel).
