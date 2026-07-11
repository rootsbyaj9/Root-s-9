import { ImageResponse } from 'next/og';
import { client } from '@/sanity/client';
import { getPostBySlugQuery } from '@/sanity/lib/queries';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await client?.fetch(getPostBySlugQuery, { slug }).catch(() => null);

  const title = post?.title || "Root's Salon Blog";
  const category = post?.category || "Editorial";

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#161616', // obsidian
          color: '#F4F1ED', // parchment
        }}
      >
        <div style={{ fontSize: 32, color: '#C67141', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {category}
        </div>
        
        <div style={{ fontSize: 72, fontWeight: 'bold', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '900px' }}>
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 32, fontWeight: 'bold' }}>Root's</div>
            <div style={{ fontSize: 24, color: '#A09D98' }}>The Family Salon</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
