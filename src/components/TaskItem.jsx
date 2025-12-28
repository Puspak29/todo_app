import { Calendar, CheckCircle2, Circle, Clock, Edit3, Trash2 } from "lucide-react";
import Badge from "./Badge";
import { calculateDuration, formatDate } from "../handler/formatter"

const TaskItem = ({ task, onToggle, onDelete, onEdit, onToggleSubtask }) => {
  const isToday = task.date === new Date().toISOString().split('T')[0];
  
  return (
    <div className={`group bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
      task.completed ? 'border-slate-100 opacity-75' : 'border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5'
    }`}>
      <div className="p-4 md:p-6 flex items-start gap-4">
        <button onClick={() => onToggle(task.id)} className={`mt-1 shrink-0 transition-transform active:scale-90 ${task.completed ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'}`}>
          {task.completed ? <CheckCircle2 size={26} /> : <Circle size={26} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className={`font-black text-base md:text-lg truncate transition-all ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {task.text}
              </span>
              <Badge type={task.category} />
              {isToday && <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">Today</span>}
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100 flex items-center gap-1.5 whitespace-nowrap">
                <Calendar size={12} className="text-slate-400" />
                {formatDate(task.date)}
                <span className="mx-1 text-slate-300">|</span>
                <Clock size={12} className="text-slate-400" />
                {task.startTime} - {task.endTime}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => onEdit(task)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => onDelete(task.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-4 space-y-2 pl-2 border-l-2 border-slate-100 ml-1">
              {task.subtasks.map((sub) => (
                <div 
                  key={sub.id} 
                  onClick={() => onToggleSubtask(task.id, sub.id)}
                  className="flex items-center gap-2 group/sub cursor-pointer"
                >
                  <div className={`transition-colors ${sub.completed ? 'text-green-400' : 'text-slate-300 group-hover/sub:text-blue-400'}`}>
                    {sub.completed ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  </div>
                  <span className={`text-xs font-semibold ${sub.completed ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                    {sub.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;