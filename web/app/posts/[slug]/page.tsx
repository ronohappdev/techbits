import { client, urlFor } from '../../lib/sanity'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(`*[_type == "post" && defined(publishedAt)].slug.current`)
  return slugs.map(slug => ({ slug }))
}

export default async function PostPage({ params }: { params: { slug: string }}) {
  const { slug } = params
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title, publishedAt, mainImage, body
    }`, { slug }
  )
  if (!post) return notFound()

  return (
    <article style={{padding: 24, maxWidth: 800}}>
      <h1>{post.title}</h1>
      <div style={{color: '#666'}}>{new Date(post.publishedAt).toDateString()}</div>
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(1200).url()}
          alt={post.title}
          width={1200}
          height={700}
          style={{width: '100%', height: 'auto'}}
        />
      )}
      <div style={{marginTop: 20}}>
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
