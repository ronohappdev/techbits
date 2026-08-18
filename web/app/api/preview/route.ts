import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')
  const slug = url.searchParams.get('slug') || '/'

  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 })
  }

  const res = NextResponse.redirect(slug.startsWith('/') ? slug : `/${slug}`)
  // set a short-lived preview cookie — server will use SANITY_READ_TOKEN to fetch drafts
  res.cookies.set('sanity_preview', '1', { httpOnly: true, path: '/', sameSite: 'lax', maxAge: 60 * 60 })
  return res
}
