import { cookies } from 'next/headers'
import { serverClient } from '@/lib/sanity.server'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export async function generateStaticParams() {
  const slugs: string[] = await serverClient().fetch(`*[_type == "post" && defined(publishedAt)].slug.current`)
  return slugs.map((slug) => ({ slug }))
}

export default async function PostPage({ params }: { params: { slug: string }}) {
  const preview = cookies().get('sanity_preview')?.value === '1'
  const client = serverClient(preview)

  const { slug } = params
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title, publishedAt, mainImage, body
    }`,
    { slug }
  )

  if (!post) return notFound()

  return (
    <article style={{ padding: 24, maxWidth: 800 }}>
      <h1>{post.title}</h1>
      <div style={{ color: '#666' }}>{new Date(post.publishedAt).toDateString()}</div>
      {post.mainImage && (
        <Image
          src={post.mainImage ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${post.mainImage.asset._ref}.jpg` : ''}
          alt={post.title}
          width={1200}
          height={700}
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      <div style={{ marginTop: 20 }}>
        <PortableText value={post.body} />
      </div>
      {preview && (
        <div style={{ marginTop: 20, padding: 12, border: '1px solid #ddd', background: '#fffbf0' }}>
          <strong>Preview mode</strong> — showing draft content from Sanity
        </div>
      )}
    </article>
  )
}
