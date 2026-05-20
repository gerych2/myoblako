import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function Preloader() {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const failsafe = setTimeout(() => {
      setVisible(false);
    }, 2000);

    if (progress === 100) {
      clearTimeout(failsafe);
      const timeout = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timeout);
    }

    return () => clearTimeout(failsafe);
  }, [progress]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-4xl font-light mb-4 tracking-widest font-serif">MYOBLAKO</div>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-400 font-sans">{Math.round(progress)}%</div>
    </div>
  );
}
