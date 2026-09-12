import { useState } from 'react';

function ShortenForm({ onShorten, isLoading }) {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    onShorten(longUrl.trim());
    setLongUrl(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="shorten-form">
      <input
        type="text"
        placeholder="Paste a long URL here (e.g. https://example.com/very/long/path)"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="url-input"
        required
      />
      <button type="submit" disabled={isLoading} className="shorten-button">
        {isLoading ? 'Shortening...' : 'Shorten'}
      </button>
    </form>
  );
}

export default ShortenForm;