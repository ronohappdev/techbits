import sanityClient from '@sanity/client'

export const serverClient = (preview = false) => sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: !preview,
  token: preview ? process.env.SANITY_READ_TOKEN : undefined,
})
