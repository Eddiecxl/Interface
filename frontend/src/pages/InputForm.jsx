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
    <div class="container">
        <div className="card">
        <h2>📝 Submit New Entry</h2>
        {status && (
            <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {status.msg}
            </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" />
            </div>
            <div>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" />
            </div>
            <div>
            <label>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Enter your message" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Submitting...' : 'Submit Entry'}
            </button>
        </form>
        </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.6rem 0.8rem',
  border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '1rem'
};