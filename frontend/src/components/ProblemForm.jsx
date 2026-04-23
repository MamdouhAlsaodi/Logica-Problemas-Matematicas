import { useState } from 'react';

export default function ProblemForm({ onDone, dark }) {
  const [form, setForm] = useState({ question: '', answer: '', difficulty: 'easy', category: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/problems', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      onDone();
    } catch (err) { alert('خطأ في الإضافة'); }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className={`${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl p-5 border space-y-4 mb-6`}>
      <h3 className="font-bold text-lg">إضافة مسألة جديدة</h3>
      <input required placeholder="السؤال" value={form.question} onChange={e => setForm({...form, question: e.target.value})}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
      <input required placeholder="الإجابة" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
      <div className="grid grid-cols-2 gap-3">
        <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
          className="px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
          <option value="easy" className="bg-gray-900">سهل</option>
          <option value="medium" className="bg-gray-900">متوسط</option>
          <option value="hard" className="bg-gray-900">صعب</option>
        </select>
        <input required placeholder="التصنيف (مثل: جبر، هندسة...)" value={form.category} onChange={e => setForm({...form, category: e.target.value})}
          className="px-4 py-2.5 rounded-lg border border-gray-300 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50">
          {loading ? 'جارٍ الإضافة...' : 'إضافة المسألة'}
        </button>
        <button type="button" onClick={onDone} className={`px-6 py-2.5 rounded-lg text-sm ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}>إلغاء</button>
      </div>
    </form>
  );
}
