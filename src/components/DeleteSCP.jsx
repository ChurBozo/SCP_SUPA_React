import { supabase } from '../supabase';

function DeleteSCP({ scp, onClose, onDeleted }) {
  const handleDelete = async () => {
    const { error } = await supabase.from('scp_subjects').delete().eq('id', scp.id);
    if (error) {
      console.error('Delete failed:', error.message);
    } else {
      showToast(`${scp.name} deleted successfully!`);
      if (onDeleted) onDeleted();
      if (onClose) onClose();
    }
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
    <div className="info-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete <strong>{scp.name}</strong>?</p>
      <div className="centered-buttons">
        <button className="styled-btn" onClick={handleDelete}>Delete</button>
        <button className="styled-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteSCP;