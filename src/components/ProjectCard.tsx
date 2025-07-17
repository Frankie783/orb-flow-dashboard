import { useState } from 'react';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3, Eye, EyeOff } from 'lucide-react';
import { ProjectForm } from './ProjectForm';

interface ProjectCardProps {
  project: Project;
  projectIndex: number;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

const getProjectColor = (index: number) => {
  const colorIndex = (index % 10) + 1;
  return `project-${colorIndex}` as const;
};

export const ProjectCard = ({ project, projectIndex, onUpdate, onDelete }: ProjectCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const color = getProjectColor(projectIndex);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (data: any) => {
    onUpdate(project.id, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="bg-gradient-card shadow-card border-border">
        <CardContent className="p-6">
          <ProjectForm
            initialData={project}
            onSave={handleSave}
            onCancel={handleCancel}
            isEditing={true}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-card border-border hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className={`text-lg font-bold text-${color} leading-tight`}>
            {project.title}
          </h3>
          <div className="flex gap-2 flex-shrink-0 ml-4">
            <Badge variant="secondary" className="text-xs">
              E: {project.effort}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              B: {project.benefit}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {isExpanded && (
            <>
              {project.discoveryAndScope && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Discovery & Scope</h4>
                  <p className="text-sm text-foreground">{project.discoveryAndScope}</p>
                </div>
              )}
              
              {project.complexityFactors && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Complexity Factors</h4>
                  <p className="text-sm text-foreground">{project.complexityFactors}</p>
                </div>
              )}
              
              {project.blockers && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Blockers</h4>
                  <p className="text-sm text-foreground">{project.blockers}</p>
                </div>
              )}
              
              {project.needsAndDependencies && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Needs & Dependencies</h4>
                  <p className="text-sm text-foreground">{project.needsAndDependencies}</p>
                </div>
              )}
              
              {project.nextSteps && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Next Steps</h4>
                  <p className="text-sm text-foreground">{project.nextSteps}</p>
                </div>
              )}
              
              {project.researchFocus && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Research Focus</h4>
                  <p className="text-sm text-foreground">{project.researchFocus}</p>
                </div>
              )}
              
              {project.images && project.images.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Images</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {project.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-20 object-cover rounded border border-border"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {project.attachments && project.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Attachments</h4>
                  <div className="space-y-1">
                    {project.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline block"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(project.id)}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};