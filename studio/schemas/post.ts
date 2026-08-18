export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'mainImage', title: 'Main image', type: 'image' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'body', title: 'Body', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true } },
      { type: 'code' }
    ] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
  ]
}
