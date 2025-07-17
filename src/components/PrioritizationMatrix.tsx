import { Project } from '@/types/project';

interface PrioritizationMatrixProps {
  projects: Project[];
}

const getProjectColor = (index: number) => {
  const colorIndex = (index % 10) + 1;
  return `project-${colorIndex}` as const;
};

const getBallSize = (effort: number, benefit: number) => {
  const totalScore = effort + benefit;
  const baseSize = 24; // Base size in pixels
  const maxSize = 48; // Maximum size (double the base)
  const size = baseSize + (totalScore / 20) * (maxSize - baseSize);
  return Math.min(size, maxSize);
};

export const PrioritizationMatrix = ({ projects }: PrioritizationMatrixProps) => {
  return (
    <div className="bg-gradient-matrix rounded-xl p-6 shadow-matrix border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Priority Matrix</h2>
      
      <div className="relative h-96 bg-background/5 rounded-lg border border-border/50">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="border border-muted-foreground/20" />
          ))}
        </div>
        
        {/* Axis labels */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground font-medium">
          Effort →
        </div>
        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-muted-foreground font-medium">
          Benefit →
        </div>
        
        {/* Quadrant labels */}
        <div className="absolute top-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Low Effort, High Benefit
        </div>
        <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          High Effort, High Benefit
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Low Effort, Low Benefit
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          High Effort, Low Benefit
        </div>
        
        {/* Project balls */}
        {projects.map((project, index) => {
          const x = (project.effort / 10) * 100;
          const y = 100 - ((project.benefit / 10) * 100); // Invert Y axis
          const size = getBallSize(project.effort, project.benefit);
          const color = getProjectColor(index);
          
          return (
            <div
              key={project.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-${color} shadow-glow flex items-center justify-center font-bold text-white text-xs transition-all duration-300 hover:scale-110 cursor-pointer`}
              style={{
                left: `${Math.max(5, Math.min(95, x))}%`,
                top: `${Math.max(5, Math.min(95, y))}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              title={`${project.title} (E:${project.effort}, B:${project.benefit})`}
            >
              {project.title.substring(0, 2).toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};