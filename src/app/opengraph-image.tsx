import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Root's The Family Salon";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#161616',
          color: '#F4F1ED',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 120, fontWeight: 'bold', letterSpacing: '-0.02em', marginBottom: 20 }}>
            Root's
          </div>
          <div style={{ fontSize: 40, color: '#C67141', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            The Family Salon
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
