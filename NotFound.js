import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="ms-container ms-section" style={{textAlign:'center'}}>
      <h1 className="ms-grad-text" style={{fontSize:'6rem', margin:0}}>404</h1>
      <h2>Page not found</h2>
      <p style={{color:'var(--ms-text-dim)'}}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="ms-btn ms-btn-primary">Go Home</Link>
    </div>
  );
}
