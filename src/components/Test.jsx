import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle, Search, Trash2 } from 'lucide-react';
import AuthModal from './AuthModal';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import GanttChart from './GaantChart';
import { calculateDuration } from '../handler/formatter';

const DUMMY_TASKS = [
  { 
    id: 1, 
    text: 'Finalize UI Components', 
    completed: false, 
    category: 'Work', 
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '12:00',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: 's1', text: 'Define border radius', completed: true },
      { id: 's2', text: 'Shadow consistency', completed: false }
    ]
  }
]

const Test = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [category, setCategory] = useState('Personal');
  const [filter, setFilter] = useState('all'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesFilter = filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed;
      const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => new Date(b.date + 'T' + b.startTime) - new Date(a.date + 'T' + a.startTime));
  }, [tasks, filter, searchQuery]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const totalDuration = tasks.reduce((acc, task) => acc + parseFloat(calculateDuration(task.startTime, task.endTime)), 0);
    return { total, completed, pending: total - completed, percent, totalDuration };
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data) => {
    setTasks([{ 
      id: Date.now(), 
      ...data, 
      completed: false, 
      category, 
      createdAt: new Date().toISOString() 
    }, ...tasks]);
  };

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  
  const toggleSubtask = (taskId, subId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedSubtasks = t.subtasks.map(s => s.id === subId ? { ...s, completed: !s.completed } : s);
        return { ...t, subtasks: updatedSubtasks };
      }
      return t;
    }));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setUser({ email: 'user@example.com', name: 'John Doe' });
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-10">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode} 
        setMode={setAuthMode} 
        onSubmit={handleAuthSubmit}
      />

      <div className="mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
              <CheckCircle size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-800">TaskFlow</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency Engine</span>
                <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                <span className="text-[10px] font-bold text-blue-500 uppercase">{new Date().toLocaleDateString(undefined, { weekday: 'long' })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-200 ${
                    filter === f ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <button onClick={() => setUser(null)} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600">Logout</button>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black border-2 border-white shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                    className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                    className="px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-all shadow-md active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 flex flex-col justify-between h-32">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Completion Rate</p>
            <h3 className="text-4xl font-black">{stats.percent}%</h3>
          </div>
          {[
            { label: 'Upcoming Tasks', value: stats.pending },
            { label: 'Total Scheduled', value: stats.total },
            { label: 'Planned Workload', value: stats.totalDuration.toFixed(1) + 'h' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-blue-200 transition-colors">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <h3 className="text-4xl font-black text-slate-800">{s.value}</h3>
            </div>
          ))}
        </div>

        <GanttChart tasks={tasks} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <TaskForm 
              onAdd={addTask} 
              onUpdate={updateTask}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
              category={category} 
              setCategory={setCategory} 
              isExpanded={isFormExpanded} 
              setIsExpanded={setIsFormExpanded} 
            />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Search schedules by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white rounded-3xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 shadow-sm transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                  <AlertCircle size={48} className="text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">Your schedule is clear.</p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask}
                    onEdit={setEditingTask}
                    onToggleSubtask={toggleSubtask}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test
