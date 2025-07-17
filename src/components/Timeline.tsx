import { format, isToday, isTomorrow, isYesterday, isPast } from 'date-fns';
import { Project } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface TimelineProps {
  projects: Project[];
}

export const Timeline = ({ projects }: TimelineProps) => {
  const projectsWithDates = projects.filter(p => p.expectedDay).sort((a, b) => 
    new Date(a.expectedDay!).getTime() - new Date(b.expectedDay!).getTime()
  );
  
  const backlogProjects = projects.filter(p => !p.expectedDay);

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  const getDateBadgeVariant = (date: Date) => {
    if (isToday(date)) return 'default';
    if (isPast(date)) return 'destructive';
    return 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {projectsWithDates.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No projects with dates yet</p>
          ) : (
            <div className="space-y-3">
              {projectsWithDates.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `hsl(${(project.id.charCodeAt(0) * 137.508) % 360}, 70%, 60%)` }}
                    />
                    <span className="font-medium text-foreground">{project.title}</span>
                  </div>
                  <Badge variant={getDateBadgeVariant(project.expectedDay!)}>
                    {getDateLabel(project.expectedDay!)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backlog */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Backlog
          </CardTitle>
        </CardHeader>
        <CardContent>
          {backlogProjects.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No backlog projects</p>
          ) : (
            <div className="space-y-3">
              {backlogProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-colors">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `hsl(${(project.id.charCodeAt(0) * 137.508) % 360}, 70%, 60%)` }}
                  />
                  <span className="font-medium text-foreground">{project.title}</span>
                  <Badge variant="outline" className="ml-auto">
                    No date
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};