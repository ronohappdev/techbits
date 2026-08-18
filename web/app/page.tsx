import Link from 'next/link'
import { client } from '../lib/sanity'

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc){
    title, "slug": slug.current, excerpt, publishedAt, mainImage
  }`)

  return (
    <main style={{padding: 24}}>
      <h1>Techbits</h1>
      <ul style={{listStyle: 'none', padding: 0}}>
        {posts.map((p: any) => (
          <li key={p.slug} style={{marginBottom: 18}}>
            <Link href={`/posts/${p.slug}`}>
              <a style={{fontSize: 18}}>{p.title}</a>
            </Link>
            <div style={{fontSize: 12, color: '#666'}}>{new Date(p.publishedAt).toDateString()}</div>
            <p>{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
