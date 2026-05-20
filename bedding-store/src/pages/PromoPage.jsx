import React from 'react';
import Scene from '../components/promo/Scene';
import Overlay from '../components/promo/Overlay';
import Preloader from '../components/promo/Preloader';

export default function PromoPage() {
  return (
    <div className="w-full text-white bg-[#050505] selection:bg-white selection:text-black overflow-x-hidden">
      <Preloader />
      <Scene />
      <Overlay />
    </div>
  );
}
