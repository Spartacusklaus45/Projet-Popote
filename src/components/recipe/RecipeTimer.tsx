import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Bell, Pause, Play, RotateCcw } from 'lucide-react';
import { useTimer } from 'use-timer';
import toast from 'react-hot-toast';

interface RecipeTimerProps {
  duration: number; // in minutes
  stepName: string;
}

export default function RecipeTimer({ duration, stepName }: RecipeTimerProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: duration * 60,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      setIsComplete(true);
      toast.success(`${stepName} est terminé !`);
      // Play notification sound
      const audio = new Audio('/sounds/timer-complete.mp3');
      audio.play().catch(() => {
        // Handle error silently - browser might block autoplay
      });
    }
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - time) / (duration * 60)) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Timer className="h-6 w-6 text-orange-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{stepName}</h3>
        </div>
        <Bell className={`h-6 w-6 ${
          isComplete ? 'text-green-500' : 'text-gray-400'
        }`} />
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-orange-500 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {formatTime(time)}
        </span>
      </div>

      <div className="flex justify-center space-x-4">
        {status === 'RUNNING' ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={pause}
            className="p-3 bg-orange-100 text-orange-500 rounded-full"
          >
            <Pause className="h-6 w-6" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={start}
            className="p-3 bg-orange-100 text-orange-500 rounded-full"
          >
            <Play className="h-6 w-6" />
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            reset();
            setIsComplete(false);
          }}
          className="p-3 bg-gray-100 text-gray-500 rounded-full"
        >
          <RotateCcw className="h-6 w-6" />
        </motion.button>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-center"
        >
          {stepName} est terminé !
        </motion.div>
      )}
    </div>
  );
}