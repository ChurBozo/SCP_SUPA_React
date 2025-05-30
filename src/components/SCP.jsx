import { useState } from 'react';

function SCP({ scp }) {
  const [activeTab, setActiveTab] = useState('procedures');

  return (
    <div className="info-card">
      <h2>{scp.reference}: {scp.name}</h2>
      <p><strong>Class:</strong> {scp.class}</p>
      <div className="centered-buttons">
        <button className="styled-btn" onClick={() => setActiveTab('procedures')}>Procedures</button>
        <button className="styled-btn" onClick={() => setActiveTab('description')}>Description</button>
        <button className="styled-btn" onClick={() => setActiveTab('reference')}>Reference</button>
      </div>
      <div className="scp-text-wrapper">
        {activeTab === 'procedures' && <p>{scp.containment}</p>}
        {activeTab === 'description' && <p>{scp.description}</p>}
        {activeTab === 'reference' && <p>{scp.reference}</p>}
      </div>
      {scp.image && (
        <img className="scp-image" src={scp.image} alt={scp.name} />
      )}
    </div>
  );
}

export default SCP;
