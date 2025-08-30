export default function DefaultIcon({ name, width, height }) {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';
  
  const getRandomColor = (letter) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-teal-500',
      'bg-orange-500', 'bg-cyan-500', 'bg-amber-500', 'bg-lime-500'
    ];
    
    const charCode = letter.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const bgColor = getRandomColor(firstLetter);
  const textColor = 'text-white';

  return (
    <div className={`${bgColor} ${textColor} w-${width} h-${height} rounded-full flex items-center justify-center font-semibold text-sm`}>
      {firstLetter}
    </div>
  );
}