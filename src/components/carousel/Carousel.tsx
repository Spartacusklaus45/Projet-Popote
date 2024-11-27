import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

interface CarouselProps {
  items: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function Carousel({
  items,
  itemWidth = 300,
  gap = 20,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const totalItems = items.length;
  const maxIndex = totalItems - 1;

  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [autoPlay, currentIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, interval);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    stopAutoPlay();
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (autoPlay) {
      startAutoPlay();
    }

    const threshold = itemWidth / 4;
    const offset = info.offset.x;

    if (Math.abs(offset) > threshold) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    if (autoPlay) startAutoPlay();
  };

  const handlePrev = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    if (autoPlay) startAutoPlay();
  };

  const handleDotClick = (index: number) => {
    stopAutoPlay();
    setCurrentIndex(index);
    if (autoPlay) startAutoPlay();
  };

  return (
    <div className="carousel-container" ref={containerRef}>
      <motion.div
        className={`carousel ${isDragging ? 'dragging' : ''}`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
          gap: `${gap}px`
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="carousel-item"
            style={{ width: itemWidth }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: currentIndex === index ? 1 : 0.9,
              opacity: currentIndex === index ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>

      {showArrows && (
        <div className="carousel-controls">
          <motion.button
            className="carousel-button"
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </motion.button>
          <motion.button
            className="carousel-button"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </motion.button>
        </div>
      )}

      {showDots && (
        <div className="carousel-dots">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}