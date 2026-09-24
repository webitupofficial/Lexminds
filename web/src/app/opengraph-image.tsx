import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lex Minds | Legal Education, Research, Writing & Media';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0c0d12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'serif',
          color: '#ffffff',
          border: '16px solid #1a1c23',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#c9933e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            L
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '-1px' }}>
              Lex Minds
            </span>
            <span style={{ fontSize: '14px', color: '#9ca3af', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Legal Education &bull; Research &bull; Media
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <h1
            style={{
              fontSize: '54px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Empowering Students Through Legal Learning &amp; Practical Skills
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#d1d5db',
              lineHeight: 1.4,
              margin: 0,
              fontFamily: 'sans-serif',
            }}
          >
            Student-Led Legal Internships, Peer-Reviewed Publications &amp; Editorial Fellowship.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '24px',
            borderTop: '2px solid #27272a',
            fontSize: '18px',
            color: '#9ca3af',
            fontFamily: 'monospace',
          }}
        >
          <span>https://lexminds.in</span>
          <span>Learn &bull; Research &bull; Write &bull; Create</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
