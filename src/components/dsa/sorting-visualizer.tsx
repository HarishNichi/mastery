"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VisualizerContainer } from "@/components/visualizer-container";

export function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]); // Indices being compared
  const [sorted, setSorted] = useState<number[]>([]); // Indices that are sorted

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 50) + 10);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
    setIsPlaying(false);
  };

  const bubbleSort = async () => {
    setIsPlaying(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        if (!isPlaying) {
             // Basic check to stop if user paused (in a real implementation we'd need a ref to be robust)
             // But for this simplified version, we rely on the loop execution
        }
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for swap animation
        }
      }
      setSorted((prev) => [...prev, n - i - 1]);
    }
    setComparing([]);
    // Ensure all marked sorted
    setSorted(arr.map((_, i) => i));
    setIsPlaying(false);
  };

  return (
    <VisualizerContainer 
      title="Bubble Sort Visualization" 
      onReset={resetArray}
      onPlay={() => {
        if (sorted.length === array.length) resetArray();
        bubbleSort();
      }}
      isPlaying={isPlaying}
    >
      <div className="flex items-end gap-2 h-[200px]">
        <AnimatePresence>
          {array.map((value, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                height: `${(value / 60) * 100}%`,
                backgroundColor: comparing.includes(idx) 
                  ? "#F59E0B" // Amber for comparing
                  : sorted.includes(idx)
                    ? "#10B981" // Emerald for sorted
                    : "#6366F1" // Indigo for default
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-4 md:w-6 rounded-t-md"
            >
              {/* Optional: Show value on hover or always */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </VisualizerContainer>
  );
}
