import { useState, useEffect } from 'react';

export default function ProblemForm({ editingProblem, onDone, dark }) {
  const [form, setForm] = useState({ question: '', answer: '', difficulty: 'easy', category: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProblem) {
      setForm(editingProblem);
    }
  }, [editingProblem]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(`/api/problems${editingProblem ? `/${editingProblem._id}` : ''}`, {
        method: editingProblem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const errMap = {};
          data.errors.forEach(e => errMap[e.path] = e.msg);
          setErrors(errMap);
        }
        throw new Error(data.message || 'Erro');
      }
      onDone();
    } catch (err) { alert(err.message || 'Erro ao salvar'); }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl p-5 border space-y-4 mb-6`}>
      <h3 className="font-bold text-lg">{editingProblem ? 'Editar Problema' : 'Novo Problema'}</h3>
      
      <div>
        <label className="text-xs text-gray-500 block mb-1">Pergunta *</label>
        <input required value={form.question} onChange={e => setForm({...form, question: e.target.value})}
          className={`w-full px-4 py-2.5 rounded-lg border ${errors.question ? 'border-red-500' : 'border-gray-300'} bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm`} />
        {errors.question && <span className="text-red-400 text-xs">{errors.question}</span>}
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Resposta *</label>
        <input required value={form.answer} onChange={e => setForm({...form, answer: e.target.value})}
          className={`w-full px-4 py-2.5 rounded-lg border ${errors.answer ? 'border-red-500' : 'border-gray-300'} bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm`} />
        {errors.answer && <span className="text-red-400 text-xs">{errors.answer}</span>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Dificuldade *</label>
          <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.difficulty ? 'border-red-500' : 'border-gray-300'} bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm`}>
            <option value="easy" className="bg-gray-900">Fácil</option>
            <option value="medium" className="bg-gray-900">Médio</option>
            <option value="hard" className="bg-gray-900">Difícil</option>
          </select>
          {errors.difficulty && <span className="text-red-400 text-xs">{errors.difficulty}</span>}
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Categoria *</label>
          <input required value={form.category} onChange={e => setForm({...form, category: e.target.value})}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-300'} bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm`} />
          {errors.category && <span className="text-red-400 text-xs">{errors.category}</span>}
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50">
          {loading ? 'Salvando...' : editingProblem ? 'Atualizar' : 'Adicionar'}
        </button>
        <button type="button" onClick={onDone} className={`px-6 py-2.5 rounded-lg text-sm ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}>Cancelar</button>
      </div>
    </form>
  );
}
