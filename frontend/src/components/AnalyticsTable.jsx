function AnalyticsTable({ urls }) {
  if (urls.length === 0) {
    return <p className="empty-state">No links yet. Shorten your first URL above!</p>;
  }

  return (
    <table className="analytics-table">
      <thead>
        <tr>
          <th>Short Link</th>
          <th>Original URL</th>
          <th>Clicks</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url) => (
          <tr key={url.shortCode}>
            <td>
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                {url.shortUrl}
              </a>
            </td>
            <td className="long-url-cell" title={url.longUrl}>
              {url.longUrl}
            </td>
            <td className="clicks-cell">{url.clicks}</td>
            <td>{new Date(url.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AnalyticsTable;