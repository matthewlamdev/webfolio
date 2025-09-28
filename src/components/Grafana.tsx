import React from 'react';

const GrafanaDashboard = () => {
  const grafanaUrl = "http://localhost:3001/public-dashboards/9c9ca50b26404902bc8a65c527ecb398?refresh=5s";
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        src={grafanaUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Grafana Dashboard"
      ></iframe>
    </div>
  );
}; 

export default GrafanaDashboard;