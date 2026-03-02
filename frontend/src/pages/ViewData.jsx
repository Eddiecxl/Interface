import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/data';

export default function ViewData() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(API);
    setEntries(res.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await axios.delete(`${API}/${id}`);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Database Records ({entries.length})</h2>
        <button onClick={fetchData}
          style={{ padding: '0.4rem 1rem', borderRadius: 6, border: '1px solid #cbd5e1', cursor: 'pointer' }}>
          🔄 Refresh
        </button>
      </div>
      {entries.length === 0
        ? <p style={{ color: '#94a3b8' }}>No entries yet. Submit some data first!</p>
        : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <thead style={{ background: '#1e293b', color: '#fff' }}>
              <tr>
                {['ID', 'Name', 'Email', 'Message', 'Date', 'Action'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.id} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderTop: '1px solid #e2e8f0' }}>
                  <td style={td}>{e.id}</td>
                  <td style={td}>{e.name}</td>
                  <td style={td}>{e.email}</td>
                  <td style={td}>{e.message}</td>
                  <td style={td}>{new Date(e.createdAt).toLocaleString()}</td>
                  <td style={td}>
                    <button onClick={() => handleDelete(e.id)}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

const td = { padding: '0.75rem 1rem', fontSize: '0.9rem' };