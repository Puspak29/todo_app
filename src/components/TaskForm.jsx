import { CalendarDays, ChevronDown, ChevronUp, Clock, Edit3, ListTodo, Plus, Save } from "lucide-react";
import { useState, useEffect } from "react";

const TaskForm = ({ onAdd, category, setCategory, isExpanded, setIsExpanded, editingTask, onUpdate, onCancelEdit }) => {
  const today = new Date().toISOString().split('T')[0];
  const [text, setText] = useState('');
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [subtasks, setSubtasks] = useState('');

  // Effect to populate form when editing
  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setDate(editingTask.date);
      setStartTime(editingTask.startTime);
      setEndTime(editingTask.endTime);
      setCategory(editingTask.category);
      setSubtasks(editingTask.subtasks?.map(s => s.text).join(', ') || '');
      setIsExpanded(true);
      
      // Smooth scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editingTask, setCategory, setIsExpanded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const subtaskList = subtasks
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => {
        // Preserve completed state if we're editing and subtask already exists
        const existing = editingTask?.subtasks?.find(old => old.text === s);
        return { 
          id: existing?.id || Math.random().toString(36).substr(2, 9), 
          text: s, 
          completed: existing?.completed || false 
        };
      });

    const taskData = {
      text,
      date,
      startTime,
      endTime,
      category,
      subtasks: subtaskList
    };

    if (editingTask) {
      onUpdate({ ...editingTask, ...taskData });
    } else {
      onAdd(taskData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setText('');
    setSubtasks('');
    setDate(today);
    setStartTime('09:00');
    setEndTime('10:00');
    if (editingTask) onCancelEdit();
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden lg:sticky lg:top-8 transition-colors duration-500 ${editingTask ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200'}`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between p-5 text-left lg:pointer-events-none">
        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
          {editingTask ? <Edit3 size={20} className="text-blue-600" /> : <Plus size={20} className="text-blue-600" />}
          {editingTask ? 'Edit Schedule' : 'New Schedule'}
        </h2>
        <div className="lg:hidden text-slate-400">{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
      </button>
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-5 pt-0 lg:pt-5 border-t lg:border-t-0 border-slate-100`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase px-1">What are you working on?</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Design review, Coding, Gym..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase px-1 flex items-center gap-1">
              <CalendarDays size={12} /> Schedule Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase px-1 flex items-center gap-1">
                <Clock size={12} /> Start
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase px-1 flex items-center gap-1">
                <Clock size={12} /> End
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase px-1">Priority Group</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
            >
              <option>Personal</option>
              <option>Work</option>
              <option>Urgent</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase px-1 flex items-center gap-1">
              <ListTodo size={12} /> Breakdowns
            </label>
            <textarea
              value={subtasks}
              onChange={(e) => setSubtasks(e.target.value)}
              placeholder="Add milestones, separate with commas..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm h-20 resize-none"
            />
          </div>

          <div className="flex gap-3">
            {editingTask && (
              <button 
                type="button" 
                onClick={resetForm}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-all"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              disabled={!text.trim()} 
              className={`flex-2 text-white font-black py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                editingTask ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
              }`}
            >
              {editingTask ? <Save size={18} /> : <Plus size={18} />}
              {editingTask ? 'Update Task' : 'Schedule Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;