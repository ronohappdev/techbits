## Preview mode

This starter includes a simple Preview flow to view draft content from Sanity in Next.js.

How it works
- A preview URL is exposed at: `/api/preview?secret=PREVIEW_SECRET&slug=/posts/your-post-slug`
- The preview route validates the `secret` query value against `SANITY_PREVIEW_SECRET` and sets a short-lived preview cookie.
- The site server code detects the preview cookie and uses the server-side Sanity client with `SANITY_READ_TOKEN` to fetch draft content.

Setup (Vercel)
1. Create a read token in your Sanity project: Project settings → API → Add token ("Read drafts").
2. In Vercel, set the following Environment Variables for the web project:

- NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
- NEXT_PUBLIC_SANITY_DATASET = production
- NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
- SANITY_READ_TOKEN = <Sanity read token> (Environment: Production, Secret)
- SANITY_PREVIEW_SECRET = <random-string> (Environment: Production, Secret)

3. In the Sanity Studio, add a "Open Preview" button or configure a production preview URL that points to your deployed Next site:
   https://your-site.vercel.app/api/preview?secret=SANITY_PREVIEW_SECRET&slug=/posts/hello-techbits-demo

Local preview
- Locally you can set `SANITY_READ_TOKEN` and `SANITY_PREVIEW_SECRET` in `web/.env.local` (don't commit tokens).
- Start the web app and the studio, then visit the preview URL to enable preview and redirect to the post.

## Seeding the Studio (demo post)

A seed script is included to create a demo post in your Sanity dataset.

Usage:
1. In Sanity project settings create a token with writing permissions ("Editor" or equivalent).
2. Set the token as an env var for the studio (locally):

SANITY_STUDIO_WRITE_TOKEN=your_write_token
SANITY_STUDIO_API_PROJECT_ID=your_project_id
SANITY_STUDIO_API_DATASET=production

3. Run the seed script:

cd studio
npm install
node ./seed.js

This will create a demo post with slug `hello-techbits-demo`.

## Vercel environment variables quick reference

For the web project (production):
- NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
- NEXT_PUBLIC_SANITY_DATASET = production
- NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
- SANITY_READ_TOKEN = <read-token> (Secret)
- SANITY_PREVIEW_SECRET = <random-secret> (Secret)

For the studio (if deploying):
- SANITY_STUDIO_API_PROJECT_ID = your_project_id
- SANITY_STUDIO_API_DATASET = production
- SANITY_STUDIO_WRITE_TOKEN = <write-token> (Secret) — only if you need a CI/deployment step that writes to the dataset

