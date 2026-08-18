// Seed script for Sanity Studio
// Usage: set SANITY_STUDIO_WRITE_TOKEN in env and run `node ./seed.js` inside the studio/ folder

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || 'production',
  token: process.env.SANITY_STUDIO_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const demo = {
  _type: 'post',
  title: 'Hello from Techbits (Demo post)',
  slug: { _type: 'slug', current: 'hello-techbits-demo' },
  publishedAt: new Date().toISOString(),
  excerpt: 'This is a seeded demo post for the Techbits starter.',
  body: [
    {
      _type: 'block',
      children: [
        { _type: 'span', text: 'Welcome to Techbits — this demo post was created by a seed script. Replace this content using the Sanity Studio.' }
      ]
    }
  ]
}

async function run() {
  try {
    const id = `post.${demo.slug.current}`
    const created = await client.createIfNotExists({ _id: id, ...demo })
    console.log('Created or found demo post:', created._id)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
