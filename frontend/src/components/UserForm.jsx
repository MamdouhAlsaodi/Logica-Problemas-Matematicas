import { useState, useEffect } from 'react';

export default function UserForm({ editingUser, onDone, dark }) {
  const [form, setForm] = useState({ name: '', email: '', level: 'beginner' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    }
  }, [editingUser]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(`/api/users${editingUser ? `/${editingUser._id}` : ''}`, {
        method: editingUser ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || data.error || 'Erro ao salvar usuário');
      }
      onDone();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl p-5 border space-y-4 mb-6`}>
      <h3 className="font-bold text-lg">{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h3>
      
      <div>
        <label className="text-xs text-gray-500 block mb-1">Nome *</label>
        <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Email *</label>
        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Nível</label>
        <select value={form.level} onChange={e => setForm({...form, level: e.target.value})}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
          <option value="beginner" className="bg-gray-900">Iniciante</option>
          <option value="intermediate" className="bg-gray-900">Intermediário</option>
          <option value="advanced" className="bg-gray-900">Avançado</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50">
          {loading ? 'Salvando...' : editingUser ? 'Atualizar' : 'Adicionar'}
        </button>
        <button type="button" onClick={onDone} className={`px-6 py-2.5 rounded-lg text-sm ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}>Cancelar</button>
      </div>
    </form>
  );
}
