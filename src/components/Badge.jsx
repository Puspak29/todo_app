const Badge = ({ type }) => {
  const colors = {
    Work: 'bg-blue-100 text-blue-700',
    Personal: 'bg-green-100 text-green-700',
    Urgent: 'bg-red-100 text-red-700'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${colors[type] || 'bg-gray-100'}`}>
      {type}
    </span>
  );
};

export default Badge;