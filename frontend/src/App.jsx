import { useState, useEffect } from 'react';
import ShortenForm from './components/ShortenForm';
import AnalyticsTable from './components/AnalyticsTable';
import { shortenUrl, getAllUrls } from './services/api';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUrls = async () => {
      try {
        const response = await getAllUrls();
        setUrls(response.data);
      } catch (error) {
        console.error('Failed to load URLs:', error);
      }
    };
    loadUrls();
  }, []);

  const handleShorten = async (longUrl) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await shortenUrl(longUrl);
      setUrls((prevUrls) => [response.data, ...prevUrls]);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>URL Shortener</h1>
      <p className="subtitle">Shorten a link and track every click in real time.</p>

      <ShortenForm onShorten={handleShorten} isLoading={isLoading} />

      {error && <p className="error-message">{error}</p>}

      <h2>Analytics Dashboard</h2>
      <AnalyticsTable urls={urls} />
    </div>
  );
}

export default App;