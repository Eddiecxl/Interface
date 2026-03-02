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

  const handleResetDatabase = async () => {
    const confirmReset = window.confirm(
      "⚠️ This will DELETE ALL DATA and reset ID to 1.\n\nAre you absolutely sure?"
    );
    if (!confirmReset) return;
  
    const finalConfirm = window.confirm(
      "This action CANNOT be undone.\n\nPress OK again to confirm."
    );
    if (!finalConfirm) return;
  
    try {
      await axios.delete(`${API}/reset`);
      fetchData();
    } catch (error) {
      console.error("Reset failed:", error);
      alert("Failed to reset database.");
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div class="container">
        <div className="card-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0, border: 'none', padding: 0 }}>📋 Records <span style={{ color: '#6366f1' }}>({entries.length})</span></h2>
            <button onClick={fetchData} className="btn-secondary">🔄 Refresh</button>
            <button
                onClick={handleResetDatabase}
                className="btn-danger"
                style={{ marginLeft: "0.5rem" }}
                >
                🧨 Reset DB
            </button>
        </div>
    
        {entries.length === 0 ? (
            <div className="empty-state">
            <span>📭</span>
            No entries yet. Submit some data first!
            </div>
        ) : (
            <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    {['ID', 'Name', 'Email', 'Message', 'Date', 'Action'].map(h => (
                    <th key={h}>{h}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {entries.map((e) => (
                    <tr key={e.id}>
                    <td><strong>#{e.id}</strong></td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>
                    <div className="message-cell">
                        {e.message}
                    </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', color: '#64748b', fontSize: '0.82rem' }}>
                        {new Date(e.createdAt).toLocaleString('en-MY')}
                    </td>
                    <td>
                        <button onClick={() => handleDelete(e.id)} className="btn-danger">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    </div>
  );
}

const td = { padding: '0.75rem 1rem', fontSize: '0.9rem' };