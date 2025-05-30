import { useState } from 'react';
import { supabase } from '../supabase';

function CreateSCP({ onClose }) {
  const [form, setForm] = useState({
    reference: '',
    name: '',
    class: 'Safe',
    description: '',
    containment: '',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      ...form,
      image: form.image.trim() !== '' ? form.image : 'https://raw.githubusercontent.com/ChurBozo/30003409_SCP/refs/heads/main/images/Folder%20single.webp'
    };
    const { error } = await supabase.from('scp_subjects').insert([newForm]);
    if (error) {
      console.error('Insert failed:', error.message);
    } else {
      showToast('SCP created successfully!');
      setForm({ reference: '', name: '', class: 'Safe', description: '', containment: '', image: '' });
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="info-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create SCP</h2>

      {Object.entries(form).map(([key, value]) => {
        if (key === 'class') {
          return (
            <label key={key} style={{ display: 'block', marginBottom: '1rem' }}>
              Class:
              <select
                name="class"
                value={value}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem'
                }}
                required
              >
                <option value="Safe">Safe</option>
                <option value="Euclid">Euclid</option>
                <option value="Keter">Keter</option>
              </select>
            </label>
          );
        }

        return (
          <label key={key} style={{ display: 'block', marginBottom: '1rem' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <textarea
              name={key}
              value={value}
              onChange={handleChange}
              style={{
                width: '100%',
                minHeight: key === 'description' || key === 'containment' ? '100px' : '40px',
                padding: '0.5rem',
                marginTop: '0.5rem'
              }}
              required
            />
          </label>
        );
      })}

      <div className="centered-buttons">
        <button className="styled-btn" type="submit">Create</button>
        <button className="styled-btn" type="button" onClick={onClose}>Close</button>
      </div>
    </form>
  );
}

export default CreateSCP;
