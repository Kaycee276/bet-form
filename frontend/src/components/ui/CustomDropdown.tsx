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
        className="flex items-center justify-between px-4 py-2 rounded-full cursor-pointer hover:border-white/20 transition-all border border-white/[0.09] bg-[#10131c] shadow-inner"
      >
        <div className="flex flex-col">
          {label && <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">{label}</span>}
          <span className="text-white font-mono font-bold text-xs leading-tight">{value}</span>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00e599]' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-full bg-[#10131c] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-1"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold cursor-pointer transition-colors
                  ${value === option ? 'text-black bg-[#00e599] font-bold' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'}`}
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
