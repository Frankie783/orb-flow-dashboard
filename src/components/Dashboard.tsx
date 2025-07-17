import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { PrioritizationMatrix } from './PrioritizationMatrix';
import { Timeline } from './Timeline';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';
import { TopBar } from './TopBar';
import html2canvas from 'html2canvas';

export const Dashboard = () => {
  const { projects, addProject, updateProject, deleteProject, saveAllData } = useProjects();
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const handleSave = () => {
    saveAllData();
  };

  const handleDownloadScreenshot = async () => {
    try {
      const element = document.getElementById('dashboard-content');
      if (element) {
        const canvas = await html2canvas(element, {
          backgroundColor: '#1a1a2e',
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = `dashboard-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error generating screenshot:', error);
    }
  };

  const handleAddProject = (projectData: any) => {
    addProject(projectData);
    setShowNewProjectForm(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar onSave={handleSave} onDownloadScreenshot={handleDownloadScreenshot} />
      
      <div id="dashboard-content" className="container mx-auto px-4 py-6">
        {/* Prioritization Matrix */}
        <div className="mb-8">
          <PrioritizationMatrix projects={projects} />
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <Timeline projects={projects} />
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Projects</h2>
            <Button 
              onClick={() => setShowNewProjectForm(true)}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Add New Project
            </Button>
          </div>

          {/* New Project Form */}
          {showNewProjectForm && (
            <div className="mb-6">
              <ProjectForm
                onSave={handleAddProject}
                onCancel={() => setShowNewProjectForm(false)}
              />
            </div>
          )}

          {/* Project Cards Grid */}
          {projects.length === 0 && !showNewProjectForm ? (
            <div className="text-center py-12">
              <div className="bg-gradient-card rounded-xl p-8 shadow-card border border-border max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Projects Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first project to start organizing your work with the priority matrix.
                </p>
                <Button 
                  onClick={() => setShowNewProjectForm(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create First Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  projectIndex={index}
                  onUpdate={updateProject}
                  onDelete={deleteProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};