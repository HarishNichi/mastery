import { PathCard } from '@/components/path-card';
import { learningPaths } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in-50">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Mastery Tracks
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personalized guide to mastering web development.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </div>
  );
}
