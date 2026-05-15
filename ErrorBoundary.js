import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) {
    
    console.error('App crashed:', error, info);
  }
  reset = () => this.setState({ error: null });
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, maxWidth: 560, margin: '40px auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ color: 'var(--ms-text-dim)', marginBottom: 18 }}>
            The app hit an unexpected error. You can recover without reloading.
          </p>
          <button className="ms-btn ms-btn-primary" onClick={() => { this.reset(); }}>
            Try again
          </button>
          <button className="ms-btn ms-btn-ghost" style={{ marginLeft: 8 }} onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
