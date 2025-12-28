import { BarChart3 } from "lucide-react";
import { calculateDuration } from "../handler/formatter";

const GanttChart = ({ tasks }) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      dayName: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
      dateLabel: d.toLocaleDateString(undefined, { day: 'numeric' }),
      isoDate: d.toISOString().split('T')[0]
    };
  });

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-600" size={20} />
        <h2 className="text-lg font-black text-slate-800">Weekly Schedule Timeline</h2>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-175">
          <div className="grid grid-cols-9 border-b border-slate-100 pb-2 mb-4">
            <div className="col-span-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</div>
            {days.map((day, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] font-black text-slate-300 uppercase">{day.dayName}</div>
                <div className="text-xs font-bold text-slate-500">{day.dateLabel}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 8).map((task) => {
              const duration = calculateDuration(task.startTime, task.endTime);
              const taskDate = task.date;
              const dayIndex = days.findIndex(d => d.isoDate === taskDate);
              
              return (
                <div key={task.id} className="grid grid-cols-9 items-center group">
                  <div className="col-span-2 text-sm font-bold text-slate-700 truncate pr-4">{task.text}</div>
                  <div className="col-span-7 h-6 relative bg-slate-50 rounded-full overflow-hidden">
                    {dayIndex !== -1 && (
                      <div 
                        className={`absolute h-full rounded-full transition-all duration-500 flex items-center px-2 text-[9px] text-white font-black whitespace-nowrap shadow-sm ${
                          task.completed ? 'bg-green-400' : 'bg-blue-500'
                        }`}
                        style={{ 
                          left: `${(dayIndex / 7) * 100}%`, 
                          width: `${(1 / 7) * 100}%` 
                        }}
                      >
                        {task.startTime}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;