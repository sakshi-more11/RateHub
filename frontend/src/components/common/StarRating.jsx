import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value = 0, onChange, readOnly = false, size = 18 }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          onClick={() => !readOnly && onChange?.(i)}
          onMouseEnter={() => !readOnly && setHover(i)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`transition-transform ${i <= display ? 'fill-accent text-accent' : 'fill-transparent text-textSecondary/40'} ${!readOnly ? 'cursor-pointer hover:scale-125' : ''}`}
        />
      ))}
    </div>
  );
}