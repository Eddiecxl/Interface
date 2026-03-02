import { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/data';

export default function InputForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(API, form);
      setStatus({ type: 'success', msg: '✅ Submitted successfully!' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: '❌ Failed. Is the backend running?' });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Submit New Entry</h2>
      {status && (
        <div style={{
          padding: '0.75rem', marginBottom: '1rem', borderRadius: 6,
          background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: status.type === 'success' ? '#166534' : '#991b1b'
        }}>
          {status.msg}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <button type="submit" disabled={loading}
          style={{ padding: '0.75rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, fontSize: '1rem', cursor: 'pointer', fontWeight: 600 }}>
          {loading ? 'Submitting...' : 'Submit Entry'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.6rem 0.8rem',
  border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '1rem'
};