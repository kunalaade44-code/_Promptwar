import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CAROUSEL_SLIDES } from '../data/landingData';

const AUTOPLAY_INTERVAL = 5000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to slide 2 to match screenshot
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const autoPlayRef = useRef(null);

  // Autoplay timer with pause-on-hover
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const swipeThreshold = 40;
    if (touchEndXRef.current > 0 && Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  return (
    <div
      className="relative w-full max-w-xl mx-auto lg:max-w-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="GuruDev core principles"
    >
      {/* Outer Card with dark obsidian frame matching screenshot */}
      <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-[#0a1020] border border-[#1b2a4a] shadow-2xl shadow-black/80">
        
        {/* Aspect ratio frame */}
        <div className="relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-slate-800/80">
          
          {/* Slides Container */}
          {CAROUSEL_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
                  loading={index === 1 ? 'eager' : 'lazy'}
                  fetchPriority={index === 1 ? 'high' : 'auto'}
                />

                {/* Dark Vignette & Gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/50 to-transparent pointer-events-none" />

                {/* Top Slide Meta Tag */}
                <div className="absolute top-3.5 left-4 sm:top-5 sm:left-6 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#0b1224]/85 text-blue-300 border border-blue-500/30 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    {slide.tag}
                  </span>
                </div>

                {/* Slide Counter Indicator */}
                <div className="absolute top-3.5 right-4 sm:top-5 sm:right-6 z-20">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium text-slate-300 bg-[#0b1224]/85 backdrop-blur-md border border-slate-700/60">
                    0{index + 1} / 0{CAROUSEL_SLIDES.length}
                  </span>
                </div>

                {/* Text Content Overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-20 flex flex-col justify-end text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-30 pointer-events-none">
            <button
              onClick={handlePrev}
              type="button"
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/10 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/10 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="mt-3 px-3 flex items-center justify-between">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-1.5">
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                    active
                      ? 'w-7 sm:w-8 h-2 bg-blue-500'
                      : 'w-2 h-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  aria-current={active ? 'true' : 'false'}
                />
              );
            })}
          </div>

          {/* Autoplay status text */}
          <div className="text-[11px] sm:text-xs text-slate-400 font-mono">
            {isHovered ? (
              <span className="text-amber-400">Paused</span>
            ) : (
              <span>Auto-advances every 5s</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
