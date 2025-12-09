"use client";

import { motion } from "framer-motion";
import { PathCard } from "@/components/path-card";
import { learningPaths } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.main 
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8 relative z-10"
      >
        <motion.div variants={item} className="mb-16 text-center space-y-6 max-w-4xl mx-auto pt-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent pb-2">
            Master the Craft.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Your interactive path to engineering excellence. From fundamentals to system design mastery.
          </p>
        </motion.div>

        <motion.div 
          variants={item}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {learningPaths.map((path) => (
            <motion.div key={path.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <PathCard path={path} />
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
