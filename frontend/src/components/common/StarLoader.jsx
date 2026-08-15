import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function StarLoader({ size = 24 }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilled((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={`transition-all duration-300 ${
            i <= filled ? 'fill-accent text-accent scale-110' : 'fill-transparent text-panelText/30'
          }`}
        />
      ))}
    </div>
  );
}