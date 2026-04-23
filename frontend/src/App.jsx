import { useState, useEffect } from 'react';
import { problemService, userService } from './services/api';
import ProblemForm from './components/ProblemForm';
import UserForm from './components/UserForm';

function App() {
  const [page, setPage] = useState('problems');
  const [problems, setProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (page === 'problems') {
        const p = await problemService.getAll(filter);
        setProblems(p);
      } else {
        const u = await userService.getAll();
        setUsers(u);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [page, filter]);

  const handleDeleteProblem = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este problema?')) return;
    await problemService.delete(id);
    loadData();
  };

  const handleEditProblem = (problem) => {
    setEditingProblem(problem);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    await userService.delete(id);
    loadData();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const totalProblems = problems.length;
  const easyCount = problems.filter(p => p.difficulty === 'easy').length;
  const mediumCount = problems.filter(p => p.difficulty === 'medium').length;
  const hardCount = problems.filter(p => p.difficulty === 'hard').length;
  const categories = [...new Set(problems.map(p => p.category))];

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} transition-colors`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${dark ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b`}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">📐</span> Plataforma de Lógica e Matemática
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={() => {
              if (page === 'problems') {
                setEditingProblem(null);
                setShowForm(!showForm);
              } else {
                setEditingUser(null);
                setShowUserForm(!showUserForm);
              }
            }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
              {page === 'problems'
                ? (showForm ? 'Fechar' : editingProblem ? 'Editar' : '+ Novo Problema')
                : (showUserForm ? 'Fechar' : editingUser ? 'Editar' : '+ Novo Usuário')}
            </button>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          <button onClick={() => { setPage('problems'); setFilter(''); }}
            className={`px-4 py-3 text-sm font-medium transition-all ${page === 'problems' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}>
            📐 Problemas
          </button>
          <button onClick={() => { setPage('users'); }}
            className={`px-4 py-3 text-sm font-medium transition-all ${page === 'users' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}>
            👥 Usuários
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Problems Page */}
        {page === 'problems' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Problemas', value: totalProblems, color: 'text-indigo-400' },
                { label: 'Fácil', value: easyCount, color: 'text-emerald-400' },
                { label: 'Médio', value: mediumCount, color: 'text-amber-400' },
                { label: 'Difícil', value: hardCount, color: 'text-red-400' },
                { label: 'Categorias', value: categories.length, color: 'text-purple-400' },
              ].map(s => (
                <div key={s.label} className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl p-4 border text-center`}>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {['', 'easy', 'medium', 'hard'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-indigo-600 text-white'
                      : `${dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`
                  }`}>
                  {f === '' ? 'Todos' : f === 'easy' ? 'Fácil' : f === 'medium' ? 'Médio' : 'Difícil'}
                </button>
              ))}
            </div>

            {/* Form */}
            {showForm && <ProblemForm editingProblem={editingProblem} onDone={() => { setShowForm(false); setEditingProblem(null); loadData(); }} dark={dark} />}

            {/* Problems Grid */}
            {loading ? (
              <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : problems.length === 0 ? (
              <div className="text-center py-20"><p className="text-gray-500 text-lg">Nenhum problema encontrado</p></div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {problems.map(p => (
                  <div key={p._id} className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl p-5 border hover:border-indigo-500/30 transition-all group`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        p.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        p.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {p.difficulty === 'easy' ? 'Fácil' : p.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEditProblem(p)} className="text-amber-400 hover:text-amber-300 text-xs">Editar</button>
                        <button onClick={() => handleDeleteProblem(p._id)} className="text-red-400 hover:text-red-300 text-xs">Excluir</button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 leading-relaxed">{p.question}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
                      <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">{p.category}</span>
                      <CheckAnswer problemId={p._id} dark={dark} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Users Page */}
        {page === 'users' && (
          <>
            {showUserForm && <UserForm editingUser={editingUser} onDone={() => { setShowUserForm(false); setEditingUser(null); loadData(); }} dark={dark} />}
            
            {loading ? (
              <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : users.length === 0 ? (
              <div className="text-center py-20"><p className="text-gray-500 text-lg">Nenhum usuário encontrado</p></div>
            ) : (
              <div className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl overflow-hidden border`}>
                <table className="w-full text-sm">
                  <thead className={`${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <tr>
                      <th className="px-6 py-3 text-right font-medium text-gray-500">Nome</th>
                      <th className="px-6 py-3 text-right font-medium text-gray-500">Email</th>
                      <th className="px-6 py-3 text-right font-medium text-gray-500">Nível</th>
                      <th className="px-6 py-3 text-right font-medium text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className={`border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
                        <td className="px-6 py-3 font-medium">{u.name}</td>
                        <td className="px-6 py-3 text-gray-500">{u.email}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            u.level === 'beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                            u.level === 'intermediate' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {u.level === 'beginner' ? 'Iniciante' : u.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditUser(u)} className="text-amber-400 hover:text-amber-300 text-xs">Editar</button>
                            <button onClick={() => handleDeleteUser(u._id)} className="text-red-400 hover:text-red-300 text-xs">Excluir</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function CheckAnswer({ problemId, dark }) {
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const check = async () => {
    setChecking(true);
    try {
      const r = await fetch(`/api/problems/${problemId}/check`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer: answer })
      }).then(res => res.json());
      setResult(r);
    } catch { setResult({ correct: false, message: 'Erro ao verificar' }); }
    setChecking(false);
  };

  if (!show) return <button onClick={() => setShow(true)} className="text-xs text-gray-500 hover:text-white transition-colors">Verificar</button>;

  return (
    <div className="flex gap-2 items-center">
      <input value={answer} onChange={e => setAnswer(e.target.value)}
        className={`w-20 px-2 py-1 rounded border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} text-xs`}
        placeholder="Resposta" />
      <button onClick={check} disabled={checking} className="text-xs bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded">
        {checking ? '...' : '✓'}
      </button>
      {result && (
        <span className={`text-xs font-bold ${result.correct ? 'text-emerald-400' : 'text-red-400'}`}>
          {result.message}
        </span>
      )}
    </div>
  );
}

export default App;
