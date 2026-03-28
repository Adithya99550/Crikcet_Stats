import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search players...' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className={`relative flex items-center transition-all duration-300 ${
          isFocused ? 'ring-2 ring-primary-500/50' : ''
        }`}
      >
        <div className="absolute left-4 pointer-events-none">
          <Search
            className={`w-5 h-5 transition-colors ${
              isFocused ? 'text-primary-400' : 'text-gray-400'
            }`}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full glass-card py-3 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
