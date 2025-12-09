"use client";

import { motion } from "framer-motion";
import { RefreshCcw, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisualizerContainerProps {
  title: string;
  onReset?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  isPlaying?: boolean;
  children: React.ReactNode;
}

export function VisualizerContainer({
  title,
  onReset,
  onPlay,
  onPause,
  isPlaying,
  children,
}: VisualizerContainerProps) {
  return (
    <div className="w-full my-6 rounded-xl overflow-hidden glass border border-white/10 shadow-2xl">
      <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
        <h3 className="font-headline font-semibold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="flex gap-2">
          {onReset && (
            <Button size="icon" variant="ghost" onClick={onReset} className="h-8 w-8 hover:bg-white/10">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          )}
          {(onPlay || onPause) && (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={isPlaying ? onPause : onPlay}
              className="h-8 w-8 hover:bg-white/10"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      <div className="p-6 bg-black/20 min-h-[300px] flex items-center justify-center relative">
        {children}
      </div>
    </div>
  );
}
