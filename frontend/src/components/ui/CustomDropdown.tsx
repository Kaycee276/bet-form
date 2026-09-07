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
    <div className="relative w-full sm:w-44 z-30" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between glass-input px-4 py-2.5 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-colors shadow-lg"
      >
        <div className="flex flex-col">
          {label && <span className="text-[10px] text-emerald-400 uppercase font-black tracking-wider">{label}</span>}
          <span className="text-white font-heading font-extrabold text-sm leading-tight">{value}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-full glass-panel backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden z-50 shadow-2xl"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 text-xs font-heading font-extrabold cursor-pointer transition-colors
                  ${value === option ? 'text-emerald-400 bg-emerald-500/15 border-l-4 border-emerald-400' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
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
