import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label?: string;
}

export const CustomDropdown = ({ value, options, onChange, label }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-40 z-30" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 cursor-pointer hover:border-white/20 transition-colors"
      >
        <div className="flex flex-col">
          {label && <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{label}</span>}
          <span className="text-white font-bold text-sm leading-tight">{value}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-full bg-[#121212] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 text-sm font-bold cursor-pointer transition-colors
                  ${value === option ? 'text-primary bg-primary/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
