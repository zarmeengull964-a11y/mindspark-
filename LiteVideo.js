import { useState } from 'react';

export default function LiteVideo({ id, title, searchQuery }) {
  const ids = Array.isArray(id) ? id.filter(Boolean) : [id].filter(Boolean);
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);

  const current = ids[idx];
  const thumb = current
    ? `https://i.ytimg.com/vi/${current}/hqdefault.jpg`
    : null;

  function handleThumbError(e) {
    // Try mqdefault if hqdefault fails
    if (e.target.src.includes('hqdefault')) {
      e.target.src = `https://i.ytimg.com/vi/${current}/mqdefault.jpg`;
    } else if (idx < ids.length - 1) {
      setIdx(idx + 1);
    }
  }

  function play() { setPlaying(true); }

  if (!current) {
    const q = encodeURIComponent(searchQuery || title || 'tutorial');
    return (
      <div className="ms-litevideo">
        <a
          href={`https://www.youtube.com/results?search_query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-litevideo-poster"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 10, textDecoration: 'none',
            background: 'linear-gradient(135deg,#1a1a1a,#2c2c2c)',
            color: '#fff', minHeight: 180, padding: 16, textAlign: 'center'
          }}
        >
          <span className="ms-litevideo-play" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
          <strong style={{ fontSize: 14 }}>Search on YouTube</strong>
          <small style={{ opacity: 0.8, fontSize: 12 }}>{title || 'Open tutorial'}</small>
        </a>
      </div>
    );
  }

  return (
    <div className="ms-litevideo">
      {playing ? (
        <iframe
          key={current}
          src={`https://www.youtube-nocookie.com/embed/${current}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title || 'Video lesson'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="ms-litevideo-poster"
          onClick={play}
          aria-label={`Play: ${title || 'video lesson'}`}
          style={{ backgroundImage: `url(${thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <img
            src={thumb}
            alt=""
            onError={handleThumbError}
            style={{ display: 'none' }}
          />
          <span className="ms-litevideo-play" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
          <span className="ms-litevideo-badge" aria-hidden="true">
            ▶ Click to play
          </span>
        </button>
      )}
    </div>
  );
}
