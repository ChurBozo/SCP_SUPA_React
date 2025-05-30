import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import './App.css';
import CreateSCP from './components/CreateSCP';
import UpdateSCP from './components/UpdateSCP';
import DeleteSCP from './components/DeleteSCP';

function App() {
  const [scps, setScps] = useState([]);
  const [selectedSCP, setSelectedSCP] = useState(null);
  const [visibleForm, setVisibleForm] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fallbackImage = 'https://raw.githubusercontent.com/ChurBozo/30003409_SCP/refs/heads/main/images/Folder%20single.webp';
  const errorImage = 'https://raw.githubusercontent.com/ChurBozo/30003409_SCP/refs/heads/main/images/Folder2.webp';

  const getImage = (url) => {
    return url && /\.(jpg|jpeg|png|webp)$/i.test(url) ? url : fallbackImage;
  };

  const fetchSCPs = async () => {
    const { data, error } = await supabase.from('scp_subjects').select('*');
    if (error) console.error('Error fetching SCPs:', error.message);
    else setScps(data);
  };

  useEffect(() => {
    fetchSCPs();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleTileClick = (scp) => {
    setSelectedSCP(scp);
    setVisibleForm(null);
  };

  const handleDeleteConfirm = () => {
    setVisibleForm('delete');
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.className = 'toast';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <header className="centered-header full-header">
        <h1 style={{ color: darkMode ? '#fff' : '#000' }}>SCP Foundation Catalog</h1>
        <div className="centered-buttons">
          <button className="styled-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className="styled-btn" onClick={() => setVisibleForm('create')}>Add New SCP</button>
        </div>
      </header>

      <main>
        {!selectedSCP ? (
          <div className="tile-grid">
            {scps.map((scp) => (
              <div key={scp.id} className="tile-card" onClick={() => handleTileClick(scp)}>
                <img
                  src={getImage(scp.image)}
                  alt={scp.name}
                  className="tile-image"
                  onError={(e) => (e.target.src = errorImage)}
                />
                <div className="tile-info">
                  <p>{scp.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="info-card enhanced-card">
            <h2 className="scp-title">{selectedSCP.name}</h2>
            <p className="scp-class"><strong>Object Class:</strong> {selectedSCP.class}</p>

            <img
              src={getImage(selectedSCP.image)}
              alt={selectedSCP.name}
              className="scp-image"
              onError={(e) => (e.target.src = errorImage)}
            />

            <section className="scp-section">
              <h3>Description</h3>
              <p>{selectedSCP.description}</p>
            </section>

            <section className="scp-section">
              <h3>Special Containment Procedures</h3>
              <p>{selectedSCP.containment}</p>
            </section>

            <section className="scp-section">
              <h3>Reference Code</h3>
              <p>{selectedSCP.reference}</p>
            </section>

            <div className="centered-buttons">
              <button className="styled-btn" onClick={() => setVisibleForm('update')}>Update</button>
              <button className="styled-btn" onClick={handleDeleteConfirm}>Delete</button>
              <button className="styled-btn" onClick={() => setSelectedSCP(null)}>Back</button>
            </div>
          </div>
        )}

        {visibleForm === 'create' && (
          <div className="modal">
            <div className="modal-content">
              <CreateSCP onClose={() => setVisibleForm(null)} />
            </div>
          </div>
        )}

        {visibleForm === 'update' && selectedSCP && (
          <div className="modal">
            <div className="modal-content">
              <UpdateSCP
                scp={selectedSCP}
                onClose={() => {
                  setVisibleForm(null);
                  setSelectedSCP(null);
                }}
                onUpdated={fetchSCPs}
              />
            </div>
          </div>
        )}

        {visibleForm === 'delete' && selectedSCP && (
          <div className="modal">
            <div className="modal-content">
              <DeleteSCP
                scp={selectedSCP}
                onClose={() => {
                  setVisibleForm(null);
                  setSelectedSCP(null);
                }}
                onDeleted={() => {
                  showToast(`${selectedSCP.name} was deleted.`);
                  fetchSCPs();
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
