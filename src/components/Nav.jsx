import { useState } from 'react';

function Nav({ scps, onSCPSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        Select SCP
      </button>
      {isOpen && (
        <ul className="dropdown-content show">
          {scps.map((scp) => (
            <li key={scp.id} onClick={() => { onSCPSelect(scp); setIsOpen(false); }}>
            {scp.name}
            </li>
          ))}
          <li onClick={() => { onSCPSelect(null); setIsOpen(false); }}>Clear Selection</li>
        </ul>
      )}
    </div>
  );
}

export default Nav;