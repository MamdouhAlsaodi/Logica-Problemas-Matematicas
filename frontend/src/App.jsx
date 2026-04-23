import { useState, useEffect } from 'react';
import { problemService, userService } from './services/api';
import ProblemForm from './components/ProblemForm';
import Dashboard from './components/Dashboard';

function App() {
  const [problems, setProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, u] = await Promise.all([problemService.getAll(filter), userService.getAll()]);
      setProblems(p);
      setUsers(u);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [filter]);

  const handleDelete = async (id) => {
    if (!confirm('هل تريد حذف هذه المسألة؟')) return;
    await problemService.delete(id);
    loadData();
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
            <span className="text-2xl">📐</span> منصة المنطق والرياضيات
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
              {showForm ? 'إغلاق' : '+ مسألة جديدة'}
            </button>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'المسائل', value: totalProblems, color: 'text-indigo-400' },
            { label: 'سهل', value: easyCount, color: 'text-emerald-400' },
            { label: 'متوسط', value: mediumCount, color: 'text-amber-400' },
            { label: 'صعب', value: hardCount, color: 'text-red-400' },
            { label: 'التصنيفات', value: categories.length, color: 'text-purple-400' },
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
              {f === '' ? 'الكل' : f === 'easy' ? 'سهل' : f === 'medium' ? 'متوسط' : 'صعب'}
            </button>
          ))}
        </div>

        {/* Add Form */}
        {showForm && <ProblemForm onDone={() => { setShowForm(false); loadData(); }} dark={dark} />}

        {/* Problems Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : problems.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-500 text-lg">لا توجد مسائل</p></div>
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
                    {p.difficulty === 'easy' ? 'سهل' : p.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                  </span>
                  <button onClick={() => handleDelete(p._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-xs transition-all">حذف</button>
                </div>
                <h3 className="font-semibold text-sm mb-2 leading-relaxed">{p.question}</h3>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
                  <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">{p.category}</span>
                  <details className="text-xs">
                    <summary className="cursor-pointer text-gray-500 hover:text-white transition-colors">الإجابة</summary>
                    <p className="mt-1 text-emerald-400 font-medium">{p.answer}</p>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
