import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    const posts = await getCollection('posts');
    
    const postsData = posts.map(post => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author
    }));

    return new Response(JSON.stringify(postsData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};



