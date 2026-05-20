import React from 'react';
import Configurator from './Configurator';

export default function Overlay() {
  return (
    <div id="promo-scroll-container" className="relative z-10 w-full h-[300vh]">

      {/* Screen 1: Hero */}
      <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-none px-6">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight font-serif text-center mb-4 text-white drop-shadow-lg">
          MYOBLAKO
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-sans tracking-wide text-center max-w-md">
          Premium bedding collection. Experience ultimate comfort and cinematic design.
        </p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 text-sm tracking-widest uppercase">
          Scroll to explore
        </div>
      </section>

      {/* Screen 2: Features */}
      <section className="h-screen w-full flex flex-col items-start justify-center pointer-events-none px-10 md:px-24">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-white drop-shadow-md">
            Unparalleled Softness
          </h2>
          <p className="text-lg text-gray-300 font-sans leading-relaxed">
            Crafted from the finest materials, our pillows and blankets offer a cloud-like sleep experience. Notice the detailed textures and soft folds that invite you to rest.
          </p>
        </div>
      </section>

      {/* Screen 3: Configurator */}
      <section className="h-screen w-full flex items-center justify-end pointer-events-none px-10 md:px-24">
        <Configurator />
      </section>

    </div>
  );
}
